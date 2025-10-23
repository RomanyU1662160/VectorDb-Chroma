# Embeddings API Server

A TypeScript-based Node.js application for generating, storing, and querying text embeddings using OpenAI's embedding models and ChromaDB for vector storage.

## 🚀 Features

- **Text Embedding Generation**: Generate embeddings using OpenAI's `text-embedding-3-small` model
- **Vector Similarity Search**: Calculate cosine similarity between embeddings
- **ChromaDB Integration**: Store and query embeddings using ChromaDB vector database
- **RESTful API**: Express.js server with health checks and API endpoints
- **File-based Storage**: JSON file utilities for data persistence
- **TypeScript Support**: Full TypeScript implementation with strict type checking
- **Comprehensive Logging**: Winston-based logging system
- **Development Tools**: Hot reload, debugging support, and testing framework

## 📁 Project Structure

```
src/
├── clients/
│   └── chroma/          # ChromaDB client configuration
├── embedding/
│   ├── file-utils.ts    # JSON file operations
│   ├── utils.ts         # Embedding generation utilities
│   ├── process-similarity.ts
│   └── test-embedding.ts # Example implementation
├── middleware/          # Express middleware
├── routes/              # API route definitions
├── utils/
│   └── logger.ts        # Winston logging configuration
├── server.ts            # Express server setup
└── index.ts             # Application entry point
```

## 🛠️ Prerequisites

- **Node.js**: Version 18+ 
- **Docker**: For running ChromaDB
- **OpenAI API Key**: For embedding generation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd embeddings
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NODE_ENV=development
   PORT=3000
   LOG_LEVEL=debug
   ```

4. **Start ChromaDB (required for vector storage)**
   ```bash
   docker run -d --name chroma-db -v chroma-data:/chroma/chroma -p 8000:8000 chromadb/chroma
   ```

## 🚀 Quick Start

### Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`

### Run Embedding Test
```bash
npm run dev:test
```
This runs the example embedding similarity search implementation.

### Production Build
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Health Check
```http
GET /health
```
Returns server health status.

### API Base
```http
GET /api
```
Returns API information and timestamp.

## 🔧 Usage Examples

### Basic Embedding Generation
```typescript
import { generateEmbedding } from './src/embedding/utils';

const embeddings = await generateEmbedding(['Hello world', 'How are you?']);
console.log(embeddings);
```

### Similarity Search
```typescript
import { cosineSimilarity } from './src/embedding/utils';

const similarity = cosineSimilarity(embedding1, embedding2);
console.log(`Similarity: ${similarity}`);
```

### File Operations
```typescript
import { loadJsonFile, saveJsonFile } from './src/embedding/file-utils';

// Save data
saveJsonFile('data.json', {message: 'Hello world'});

// Load data
const data = loadJsonFile<{message: string}>('data.json');
```

### ChromaDB Integration
```typescript
import client from './src/clients/chroma/client';

// Create a collection
const collection = await client.createCollection({
  name: "my_collection"
});

// Add embeddings
await collection.add({
  ids: ["id1", "id2"],
  embeddings: [embedding1, embedding2],
  documents: ["Hello world", "How are you?"]
});
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## 🐳 Docker Setup

The project integrates with ChromaDB running in Docker:

```bash
# Start ChromaDB
docker run -d --name chroma-db \
  -v chroma-data:/chroma/chroma \
  -p 8000:8000 \
  chromadb/chroma

# Check if it's running
docker ps | grep chroma

# View logs
docker logs chroma-db
```

## 🔧 Development

### Path Aliases
The project uses TypeScript path aliases for clean imports:
```typescript
import logger from '@/utils/logger';  // instead of '../utils/logger'
```

### Debugging
VS Code debugging is configured with two options:
- **Current file**: Debug any TypeScript file
- **Debug Server**: Debug the main application

Press `F5` or use the Run & Debug panel.

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run dev:test` - Run embedding test script
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run clean` - Clean build artifacts

## 📊 Logging

The application uses Winston for structured logging:
- **Levels**: error, warn, info, http, debug
- **Outputs**: Console and file (`logs/` directory)
- **Configuration**: Set `LOG_LEVEL` in `.env`

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `LOG_LEVEL` | Logging level | `debug` |
| `OPENAI_API_KEY` | OpenAI API key | *required* |
| `CHROMA_HOST` | ChromaDB host | `localhost` |

## 📈 Use Cases

- **Semantic Search**: Find similar documents or content
- **Recommendation Systems**: Suggest related items based on embeddings
- **Content Classification**: Categorize text based on similarity
- **Question Answering**: Find relevant context for user queries
- **Data Analysis**: Analyze text relationships and patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request


## 🔗 Related Technologies

- [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)
- [ChromaDB](https://docs.trychroma.com/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.com/)
- [Winston Logger](https://github.com/winstonjs/winston)