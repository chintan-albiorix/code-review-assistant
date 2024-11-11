CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgvector;

CREATE TABLE code_snippets (
    id SERIAL PRIMARY KEY,
    code TEXT NOT NULL,
    embedding vector(4096), -- Adjust dimension based on CodeLlama model
    language VARCHAR(50),
    analysis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON code_snippets USING ivfflat (embedding vector_cosine_ops);

-- Create extensions if not already created
CREATE EXTENSION IF NOT EXISTS pgai;
CREATE EXTENSION IF NOT EXISTS pgvectorscale;

-- Create functions for code analysis
CREATE OR REPLACE FUNCTION pgai.analyze_code_patterns(
  code text,
  language text
) RETURNS jsonb AS $$
BEGIN
  -- Implementation will depend on pgai functionality
  RETURN jsonb_build_object(
    'patterns', array['pattern1', 'pattern2'],
    'complexity', 'medium'
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pgai.suggest_improvements(
  code text,
  language text
) RETURNS jsonb AS $$
BEGIN
  -- Implementation will depend on pgai functionality
  RETURN jsonb_build_object(
    'suggestions', array['suggestion1', 'suggestion2'],
    'priority', 'high'
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pgai.generate_documentation(
  code text,
  language text
) RETURNS text AS $$
BEGIN
  -- Implementation will depend on pgai functionality
  RETURN 'Generated documentation for the provided code';
END;
$$ LANGUAGE plpgsql;

-- Create index for pgvectorscale
CREATE INDEX code_snippets_embedding_idx ON code_snippets 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);