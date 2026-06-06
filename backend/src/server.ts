import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import logger from './utils/logger';

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  logger.info(`Backend server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: any) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', { error: err.name, message: err.message });
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err: any) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', { error: err.name, message: err.message });
  process.exit(1);
});
