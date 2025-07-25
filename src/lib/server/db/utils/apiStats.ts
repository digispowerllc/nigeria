import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { apiCalls } from '$lib/server/db/schema';

export async function incrementApiCall(type: 'states' | 'lga' | 'pu' | 'ward') {
	try {
		await db.insert(apiCalls).values({
			type,
			count: 1,
			updatedAt: new Date()
		}).onConflictDoUpdate({
			target: [apiCalls.type],
			set: {
				count: sql`${apiCalls.count} + 1`,
				updatedAt: new Date()
			}
		});

		console.log(`✅ Incremented API call count for '${type}'`);
	} catch (err) {
		console.error(`❌ Failed to increment API call count for '${type}':`, err);
	}
}







// import { sql } from 'drizzle-orm';
// import { db } from '$lib/server/db';
// import { eq } from 'drizzle-orm';
// import { apiCalls } from '$lib/server/db/schema';

// export async function incrementApiCall(type: 'states' | 'lga' | 'pu' | 'ward') {
//     try {
//         // Try to update first
//         const updated = await db
//             .update(apiCalls)
//             .set({
//                 count: sql`${apiCalls.count} + 1`,
//                 updatedAt: new Date()
//             })
//             .where(eq(apiCalls.type, type));

//         // If no rows were updated (i.e., type doesn't exist), insert new
//         if (updated.rowCount === 0) {
//             await db.insert(apiCalls).values({
//                 type,
//                 count: 1
//             });
//         }
//         console.log(`✅ Incremented API call count for '${type}'`);
//     } catch (err) {
//         console.error(`❌ Failed to increment API call count for '${type}':`, err);
//     }
// }


