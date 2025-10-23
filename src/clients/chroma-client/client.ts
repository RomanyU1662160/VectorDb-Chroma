import { ChromaClient } from 'chromadb';

const client = new ChromaClient({
  host: process.env.CHROMA_HOST || 'localhost',
  port: 8000,
});

export default client;
