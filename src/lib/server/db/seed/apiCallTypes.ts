// lib/server/db/seed/apiCallTypes.ts
import { db } from '$lib/server/db';
import { apiCallTypes } from '$lib/server/db/schema';
import { API_CALL_TYPES } from '../constants';

export async function seedApiCallTypes() {
    await Promise.all(
        API_CALL_TYPES.map(({ type, description }) =>
            db.insert(apiCallTypes).values({ type, description }).onConflictDoNothing().execute()
        )
    );
}
export async function getApiCallTypes() {
    const rows = await db.select().from(apiCallTypes);
    return rows.map(row => ({
        type: row.type,
        description: row.description
    }));
}