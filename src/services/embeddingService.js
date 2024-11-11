// src/services/embeddingService.js
import pool from '../database.js';
import { generateEmbedding } from './ollamaService.js';

class EmbeddingService {
    constructor() {
        this.pool = pool;
    }

    async createEmbedding(code) {
        try {
            // Generate embedding using Ollama
            const embedding = await generateEmbedding(code);

            // Use pgai Vectorizer to optimize the embedding
            const query = `
        SELECT pgai.optimize_embedding($1::vector) as optimized_embedding;
      `;

            const result = await this.pool.query(query, [embedding]);
            return result.rows[0].optimized_embedding;
        } catch (error) {
            console.error('Error creating embedding:', error);
            throw error;
        }
    }

    async findSimilarCode(embedding, threshold = 0.8, limit = 5) {
        try {
            // Use pgvectorscale for efficient similarity search
            const query = `
        WITH similar_snippets AS (
          SELECT 
            id,
            code,
            language,
            analysis,
            1 - (embedding <=> $1) as similarity
          FROM code_snippets
          WHERE 1 - (embedding <=> $1) > $2
        )
        SELECT *
        FROM similar_snippets
        ORDER BY similarity DESC
        LIMIT $3;
      `;

            const result = await this.pool.query(query, [embedding, threshold, limit]);
            return result.rows;
        } catch (error) {
            console.error('Error finding similar code:', error);
            throw error;
        }
    }

    async analyzeCodePatterns(code, language) {
        try {
            // Use pgai for pattern analysis
            const query = `
        SELECT 
          pgai.analyze_code_patterns($1, $2) as patterns,
          pgai.suggest_improvements($1, $2) as suggestions
      `;

            const result = await this.pool.query(query, [code, language]);
            return result.rows[0];
        } catch (error) {
            console.error('Error analyzing code patterns:', error);
            throw error;
        }
    }

    async generateDocumentation(code, language) {
        try {
            // Use pgai for documentation generation
            const query = `
        SELECT pgai.generate_documentation($1, $2) as documentation;
      `;

            const result = await this.pool.query(query, [code, language]);
            return result.rows[0].documentation;
        } catch (error) {
            console.error('Error generating documentation:', error);
            throw error;
        }
    }
}

export default new EmbeddingService();