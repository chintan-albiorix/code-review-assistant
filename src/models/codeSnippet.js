// src/models/codeSnippet.js
import pool from '../database.js';

export async function saveCodeSnippet(code, embedding, language, analysis) {
    const query = `
    INSERT INTO code_snippets (code, embedding, language, analysis)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;
    const result = await pool.query(query, [code, embedding, language, analysis]);
    return result.rows[0];
}

export async function findSimilarSnippets(embedding, limit = 5) {
    const query = `
    SELECT code, language, analysis, 
           (embedding <=> $1) as similarity
    FROM code_snippets
    ORDER BY similarity ASC
    LIMIT $2;
  `;
    const result = await pool.query(query, [embedding, limit]);
    return result.rows;
}