// File: src/routes/test-db/+server.ts
import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        const result = await db.query('SELECT NOW()');
        const timestamp = result.rows[0]?.now;

        return {
            status: 'connected',
            timestamp: timestamp ?? 'unknown'
        };
    } catch (error: unknown) {
        console.error('❌ DB connection failed:', error);
        const message =
            error instanceof Error ? error.message : 'Unknown error occurred';

        return {
            status: 'error',
            message
        };
    }
};
