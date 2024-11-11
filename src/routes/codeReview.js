// src/routes/codeReview.js
import express from 'express';
import embeddingService from '../services/embeddingService.js';
import { analyzeCode } from '../services/ollamaService.js';
import { saveCodeSnippet } from '../models/codeSnippet.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
    try {
        const { code, language } = req.body;

        // Generate optimized embedding
        const embedding = await embeddingService.createEmbedding(code);

        // Parallel processing of various analyses
        const [analysis, similarSnippets, patterns, documentation] = await Promise.all([
            analyzeCode(code),
            embeddingService.findSimilarCode(embedding),
            embeddingService.analyzeCodePatterns(code, language),
            embeddingService.generateDocumentation(code, language)
        ]);

        // Save to database
        await saveCodeSnippet(code, embedding, language, analysis);

        res.json({
            analysis,
            similarSnippets,
            patterns,
            documentation,
            suggestions: patterns.suggestions
        });
    } catch (error) {
        console.error('Error in code analysis:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;