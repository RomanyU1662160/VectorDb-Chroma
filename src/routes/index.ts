export { default as healthRouter } from './health';
export { default as apiRouter } from './api';

/*
if we use the following syntax instead:
export * as HealthRouter from './health';
export * as ApiRouter from './api';


when we  use export * as, 
we're creating a namespace that contains all the exports from that module, 
not the default export itself.
so we need to  use it as
app.use('/api', apiRouter.default); // API routes
app.use('/', healthRouter.default); // Health check route
*/
