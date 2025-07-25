
import { db, schema } from '$lib/server/db';
import { inArray } from 'drizzle-orm';

import { json } from '@sveltejs/kit';

export async function GET() {
    const rows = await db
        .select()
        .from(schema.apiCalls)
        .where(inArray(schema.apiCalls.type, ['states', 'capitals', 'lga', 'pu', 'ward']));

    // Map results to key-value pairs
    const results: Record<string, number> = {};
    for (const row of rows) {
        if (row.type && row.count !== undefined) {
            results[row.type] = row.count ?? 0;
        }
    }

    console.log('API Call Stats:', results);

    return json({
        stateCalls: results['states'] ?? 0,
        lgaCalls: results['lga'] ?? 0,
        puCalls: results['pu'] ?? 0,
        wardCalls: results['ward'] ?? 0
    });

}
export const prerender = true;
export const trailingSlash = 'always';
