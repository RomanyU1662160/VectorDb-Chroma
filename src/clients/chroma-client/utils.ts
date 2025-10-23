import { loadJsonFile } from '@/embedding/file-utils';
import client from './client';
import logger from '@/utils/logger';
import { OpenAIEmbeddingFunction } from '@chroma-core/openai';

export const createCollection = async (collectionName: string) => {
  return await client.createCollection({
    name: collectionName,
    embeddingFunction: new OpenAIEmbeddingFunction({
      modelName: 'text-embedding-3-small',
      apiKey: process.env.OPENAI_API_KEY || '',
    }),
  });
};

export const deleteCollection = async (collectionName: string) => {
  return await client.deleteCollection({
    name: collectionName,
  });
};

export const getChromaHeartbeat = async () => {
  try {
    const response = await client.heartbeat();
    console.log('ChromaDB Heartbeat:', response);
    return response;
  } catch (error) {
    console.error('Error fetching heartbeat:', error);
    throw error;
  }
};

export const loadDataForTraining = async (
  fileName: string
): Promise<string[]> => {
  try {
    const jsonData = loadJsonFile<string[]>(fileName);
    console.log('jsonData::::>>', jsonData);
    if (!jsonData) {
      logger.error('No data found to train ChromaDB');
      return [];
    }
    return jsonData;
  } catch (error) {
    logger.error('Error loading JSON file:', error);
    return [];
  }
};

export const addDataToCollection = async (
  collectionName: string,
  data: { ids: string[]; documents: string[] }
) => {
  try {
    const collection = await client.getCollection({ name: collectionName });

    const response = await collection.add({
      ...data,
    });
    console.log('Data added to collection:', response);
  } catch (error) {
    logger.error('Error adding data to collection:', error);
  }
};

export const prepareAndStoreTrainingData = async (
  collectionName: string,
  trainingData: string[]
) => {
  const ids = trainingData.map((_, index) => `id_${index + 1}`);
  console.log('ids::::>>', ids);
  const collectionDataPayload = {
    ids: ids,
    documents: trainingData,
  };

  await addDataToCollection(collectionName, collectionDataPayload);
};

export const queryCollection = async (
  collectionName: string,
  query: string,
  numberOfResults: number = 1
) => {
  try {
    const collection = await client.getCollection({ name: collectionName });

    const result = (
      await collection.query({
        queryTexts: [query],
        nResults: numberOfResults,
        include: ['documents', 'distances'],
      })
    ).documents[0];

    console.log(`Query results for "${query}":`, result);
    return result;
  } catch (error) {
    console.error('Error querying collection:', error);
    logger.error('Error querying collection:', error);
    throw error;
  }
};
