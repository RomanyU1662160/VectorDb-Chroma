import { Response, Request, Router } from 'express';

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default apiRouter;
