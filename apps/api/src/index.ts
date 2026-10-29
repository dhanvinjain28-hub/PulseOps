import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Main API Routes
app.use('/api/v1', router);

// Error Handling Middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`🚀 CoopServe API running at http://localhost:${config.port}/api/v1`);
    console.log(`📡 Health Check: http://localhost:${config.port}/api/v1/health`);
  });
}

export default app;
