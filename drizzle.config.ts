import { defineConfig } from 'drizzle-kit';
import fs from 'fs';
import path from 'path';

const {
	HOST,
	PORT,
	DATABASE_NAME,
	USER,
	PASSWORD,
	CA_CERTIFICATE
} = process.env;

if (!HOST || !PORT || !DATABASE_NAME || !USER || !PASSWORD) {
	throw new Error('❌ Missing required database environment variables for manual connection');
}
if (!CA_CERTIFICATE) {
	throw new Error('❌ CA_CERTIFICATE path is not set');
}

// Load CA certificate
const caPath = path.resolve(process.cwd(), CA_CERTIFICATE);
const caCert = fs.readFileSync(caPath, 'utf-8');

// Optional: Disable verification if needed (dev only)
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		host: HOST,
		port: Number(PORT),
		database: DATABASE_NAME,
		user: USER,
		password: PASSWORD,
		ssl: {
			rejectUnauthorized: true,
			ca: caCert
		}
	},
	strict: true,
	verbose: true
});
