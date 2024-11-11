// src/services/ollamaService.js
import fetch from 'node-fetch';

export async function generateEmbedding(code) {
    const response = await fetch(`${process.env.OLLAMA_API_URL}/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'codellama',
            prompt: code
        })
    });
    const data = await response.json();
    return data.embedding;
}

export async function analyzeCode(code) {
    const response = await fetch(`${process.env.OLLAMA_API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'codellama',
            prompt: `Analyze this code and provide suggestions for improvements and best practices:\n\n${code}`,
            temperature: 0.7
        })
    });
    const data = await response.json();
    return data.response;
}