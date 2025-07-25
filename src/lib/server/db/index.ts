import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { apiCalls } from './schema';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

// Read the CA certificate
const caCert = fs.readFileSync(path.resolve('certs/ca.pem')).toString();

const pool = new Pool({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  database: process.env.DATABASE_NAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  ssl: {
    ca: caCert,
    rejectUnauthorized: true // ensure only trusted certs are accepted
  }
});

export const db = drizzle(pool);
export const schema = { apiCalls };
