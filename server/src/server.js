import app from './app.js';
import { env } from './config/env.js';
import { testConnection } from './config/database.js';

async function startServer() {
  const isConnected = await testConnection();
  if (!isConnected) {
    console.warn('[Warning] MySQL connection could not be verified on startup. Running server anyway...');
  }

  const server = app.listen(env.PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 WorkForge Server running on http://localhost:${env.PORT}`);
    console.log(`📡 Environment: ${env.NODE_ENV}`);
    console.log(`🔗 API Base: http://localhost:${env.PORT}/api`);
    console.log(`====================================================`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}

startServer();
