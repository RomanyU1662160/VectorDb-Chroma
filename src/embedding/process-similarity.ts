import { loadEnvFile } from 'process';
import logger from '../utils/logger';
import {
  cosineSimilarity,
  DataWithEmbedding,
  generateEmbedding,
} from './utils';
import { loadJsonFile, saveJsonFile } from './file-utils';

const file = 'data/product.json';

export const processEmbeddingSimilarity = async (input: string) => {
  logger.info('Processing embedding similarity...');
  if (!input || input.trim().length === 0) {
    logger.error('Input cannot be empty');
    return;
  }
  try {
    // Generate embedding for the input query
    const inputEmbeddingResponse = await generateEmbedding([input]);
    const inputEmbedding = inputEmbeddingResponse[0].embedding;
    const dataWithEmbedding: DataWithEmbedding[] = [];
    const similarityResults: { input: string; similarity: number }[] = [];

    // load data from JSON file and generate embeddings
    const jsonData = loadJsonFile<string[]>(file) || [];
    const jsonDataEmbeddings = await generateEmbedding(jsonData);
    logger.info('Embeddings generated for data');

    for (const item of jsonDataEmbeddings) {
      dataWithEmbedding.push({
        input: jsonData[item.index],
        embedding: item.embedding,
      });
    }

    // Save embeddings to a JSON file for future use, this should  be done  in a retrieval system (vector DB such as Chroma, Pinecone, Weaviate, etc)
    saveJsonFile<DataWithEmbedding[]>(
      'data/product_with_embeddings.json',
      dataWithEmbedding
    );
    logger.info('Embeddings saved to "data/product_with_embeddings.json"');

    // Calculate similarity between input embedding and each data embedding
    dataWithEmbedding.forEach((data) => {
      const similarity = cosineSimilarity(inputEmbedding, data.embedding);
      similarityResults.push({ input: data.input, similarity });
      console.log(
        `Similarity between input and "${data.input}": ${similarity}`
      );
    });

    // Sort results by similarity in descending order and display top 3
    similarityResults.sort((a, b) => {
      return b.similarity - a.similarity;
    });
    console.log('Top 3 similar items:');
    similarityResults.slice(0, 3).forEach((data) => {
      console.log(`"${data.input}" with similarity: ${data.similarity}`);
    });
  } catch (error) {
    logger.error('Error occurred while processing:', error);
  }
};
