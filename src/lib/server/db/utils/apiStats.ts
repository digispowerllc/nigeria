import { sql, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { apiCalls } from '$lib/server/db/schema';
import type { ApiCallType } from '../constants';

export async function incrementApiCall(type: ApiCallType) {
    try {
        const result = await db
            .update(apiCalls)
            .set({
                count: sql`${apiCalls.count} + 1`,
                updatedAt: new Date()
            })
            .where(eq(apiCalls.type, type))
            .execute();

        type UpdateResult = { rowCount: number } | Array<{ rowCount: number }>;
        const updateResult = result as UpdateResult;
        const updated =
            Array.isArray(updateResult)
                ? updateResult[0]?.rowCount || 0
                : updateResult.rowCount;

        if (!updated) {
            await db.insert(apiCalls).values({
                type,
                count: 1,
                updatedAt: new Date()
            }).execute();
        }
        console.log(`✅ Incremented API call count for '${type}'.`);
    } catch (err) {
        console.error(`❌ Failed to increment API call count for '${type}':`, err);
    }
}
