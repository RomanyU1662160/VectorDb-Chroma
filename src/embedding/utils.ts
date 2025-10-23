import OpenAi from 'openai';
import logger from '@/utils/logger';
import { loadJsonFile, saveJsonFile } from './file-utils';

const openai = new OpenAi();

export type DataWithEmbedding = {
  input: string;
  embedding: number[];
};

export const generateEmbedding = async (input: string | string[]) => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: input,
  });

  logger.info('Embedding generated successfully.');
  console.log('generateEmbedding response:::>>>', response);
  //   console.log('response.data:::>>>', response.data);
  return response.data;
};

export const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};

export const dotProduct = (vecA: number[], vecB: number[]): number => {
  return vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
};
