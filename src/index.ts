import {
  createCollection,
  getChromaHeartbeat,
  prepareAndStoreTrainingData,
  queryCollection,
} from './clients/chroma/utils';
import OpenAI from 'openai';
import { startServer } from './server';

startServer();

const userQuery = 'How long does shipping take to deliver a product?';
// const userQuery = 'How much does the shipping cost?';

getChromaHeartbeat();
// resetDatabase();
const setupChromaDB = async () => {
  const result = await createCollection('customer_support');
  console.log('Collection created:', result);

  await prepareAndStoreTrainingData();
};

const answerUserQuery = async () => {
  // await setupChromaDB(); // Uncomment this line only for the first run to set up the DB
  const knowledgeContext = await queryCollection(
    'customer_support',
    userQuery,
    2
  );

  console.log('Chroma DB query result:', knowledgeContext);
  const openai = new OpenAI();

  const instruction = `You are a helpful customer support assistant. Use the following ${knowledgeContext} to answer the question at the end. If the context does not contain the answer, respond with "I don't know". Provide a concise and clear answer.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: instruction,
      },
      {
        role: 'user',
        content: userQuery,
      },
    ],
  });
  console.log('Final Answer:', response.choices[0].message?.content);
  console.log(
    'Usage:',
    JSON.stringify(
      {
        prompt_token: response.usage?.prompt_tokens,
        total_tokens: response.usage?.total_tokens,
        completion_token: response.usage?.completion_tokens,
      },
      null,
      2
    )
  );
};

answerUserQuery();
