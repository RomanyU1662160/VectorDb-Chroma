import express, { Application } from 'express';
import { errorHandler, notFoundHandler, requestLogger } from './middleware';
import { healthRouter, apiRouter } from './routes';
import { error } from 'console';
import logger from './utils/logger';

export const createApp = () => {
  const app = express();

  app.use(express.json()); // Parse JSON request bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
  app.use(requestLogger); // Log incoming requests

  app.use('/api', apiRouter); // API routes
  app.use('/api', healthRouter); // Health check route

  app.use('*', notFoundHandler); // Handle 404 Not Found
  app.use(errorHandler); // Global error handler

  return app;
};

export const startServer = (port: number = 3000) => {
  const app = createApp();
  app.listen(port, () => {
    logger.info(`🚀 Server running on http://localhost:${port}`);
    logger.info(`📊 Health check: http://localhost:${port}/api/health`);
    logger.info(`🔗 API endpoints: http://localhost:${port}/api`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
  return app;
};

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}
