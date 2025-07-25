import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema'; // <-- Make sure this path is correct

const {
  HOST,
  PORT,
  DATABASE_NAME,
  USER,
  PASSWORD,
  CONNECTION_LIMIT
} = env;

if (!PASSWORD || !HOST || !DATABASE_NAME || !USER) {
  throw new Error('❌ Missing required database environment variables');
}

// Load CA certificate directly
const caPath = path.resolve('certs/ca.pem');
let sslConfig;

try {
  const ca = fs.readFileSync(caPath, 'utf-8');
  sslConfig = {
    rejectUnauthorized: true,
    ca
  };
} catch (err) {
  console.warn('⚠️ SSL certificate could not be read, disabling SSL.', err);
  sslConfig = false;
}

// Native pg Pool
export const db = new Pool({
  host: HOST,
  port: Number(PORT) || 27233,
  database: DATABASE_NAME,
  user: USER,
  password: PASSWORD,
  ssl: sslConfig,
  max: Number(CONNECTION_LIMIT) || 20
});

// Drizzle ORM binding using the Pool
export const drizzleDb = drizzle(db, { schema });

export async function connect() {
  try {
    const client = await db.connect();
    console.log('✅ Database connected successfully');
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}
