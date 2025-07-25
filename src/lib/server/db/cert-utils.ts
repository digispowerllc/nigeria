// src/lib/server/db/cert-utils.ts
import fs from 'fs';
import path from 'path';

export function getCaCertificate(certPathEnv: string): string | false {
    try {
        const caPath = path.resolve(process.cwd(), certPathEnv);
        return fs.readFileSync(caPath, 'utf-8');
    } catch (err) {
        console.warn('⚠️ CA certificate not found, SSL may be disabled.', err);
        return false;
    }
}
