# Code Review Assistant

## What I Built
Code Review Assistant is an AI-powered tool that helps developers improve their code quality through automated code analysis, similarity checking, and best practice recommendations. The application leverages PostgreSQL's AI capabilities and open-source models to provide intelligent code review suggestions.

### Key Features
- 🔍 Automated code analysis using CodeLlama
- 💡 Smart suggestions for code improvements
- 🔄 Similar code pattern detection
- 📝 Automatic code documentation generation
- 🗄️ Efficient vector storage and similarity search
- 🚀 Real-time analysis and feedback

## Tools Used

### PostgreSQL Extensions
1. **pgvector**
   - Used for storing and querying code embeddings
   - Implements efficient similarity search using vector operations
   - Powers the similar code pattern detection feature

2. **pgvectorscale**
   - Enhances vector search performance with IVFFlat indexing
   - Optimizes query performance for large code repositories
   - Enables efficient scaling of the vector database

3. **pgai**
   - Integrates AI capabilities directly within PostgreSQL
   - Facilitates real-time code analysis
   - Enhances vector operations performance

4. **pgai Vectorizer**
   - Generates embeddings for code snippets
   - Provides efficient vector representation of code
   - Enables semantic similarity comparison

### Other Tools
- **Node.js & Express**: Backend server implementation
- **Ollama**: Open-source model hosting and inference
- **CodeLlama**: Code analysis and suggestion generation
- **Docker**: Containerization (optional)

## Installation

### Prerequisites
1. Install Node.js (v16 or later) (from nodejs.org)
2. Install PostgreSQL (v14 or later) (from postgresql.org)
3. Install Ollama (from ollama.ai)
4. Install required PostgreSQL extensions 

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/chintan-albiorix/code-review-assistant.git
cd code-review-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up PostgreSQL database:
```bash
createdb code_review_db
psql code_review_db < sql/init.sql
```

4. Pull the CodeLlama model:
```bash
ollama pull codellama
```

5. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
DATABASE_URL=postgresql://username:password@localhost:5432/code_review_db
OLLAMA_API_URL=http://localhost:11434/api
```

6. Start the application:
```bash
npm run dev
```

## Usage

### API Endpoints

#### Analyze Code
To use the Code Review Assistant, send a POST request to 
`http://localhost:3000/api/code-review/analyze` with:
```json
{
  "code": "your code here",
  "language": "javascript"
}
```
```bash
POST /api/code-review/analyze
Content-Type: application/json

{
  "code": "function example() { return 'hello'; }",
  "language": "javascript"
}
```

#### Response Format
```json
{
  "analysis": {
    "suggestions": [...],
    "bestPractices": [...],
    "documentation": "..."
  },
  "similarSnippets": [...]
}
```

### Future Improvements
- Add support for more programming languages
- Implement batch processing for large codebases
- Add user authentication and project management
- Enhance documentation generation capabilities

## Contributing
Contributions are welcome! Please feel free to submit pull requests.

## License
MIT License