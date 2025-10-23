import logger from '@/utils/logger';
import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/health', (req, res) => {
  logger.info('Health check endpoint called');
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
