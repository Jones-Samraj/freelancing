import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function initDb() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = parseInt(process.env.DB_PORT || '3307', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';

  try {
    console.log(`Connecting to MySQL at ${host}:${port} as ${user}...`);
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true
    });
    console.log('Connected to MySQL successfully!');

    console.log('Reading database/schema.sql...');
    const schemaPath = path.join(__dirname, '../../../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing database/schema.sql...');
    await connection.query(schemaSql);
    console.log('Database and all 20 tables initialized successfully in MySQL!');

    await connection.end();
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initDb();
