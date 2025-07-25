import { db } from '$lib/server/db';
import { apiCalls, apiCallTypes } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export type ApiCallStat = {
	type: string;
	description: string;
	count: number;
	updatedAt: Date;
	createdAt: Date;
};

export async function getApiCallStats(): Promise<ApiCallStat[]> {
	const result = await db
		.select({
			type: apiCalls.type,
			description: apiCallTypes.description,
			count: apiCalls.count,
			updatedAt: apiCalls.updatedAt,
			createdAt: apiCalls.updatedAt
		})
		.from(apiCalls)
		.leftJoin(apiCallTypes, eq(apiCalls.type, apiCallTypes.type))
		.orderBy(desc(apiCalls.updatedAt));

	return result.map((row) => ({
		type: row.type,
		description: row.description ?? '',
		count: row.count ?? 0,
		updatedAt: row.updatedAt ?? new Date(0),
		createdAt: row.createdAt ?? new Date(0)
	}));
}
export async function getApiCallStatsByType(type: string): Promise<ApiCallStat | null> {
    const result = await db
        .select({
            type: apiCalls.type,
            description: apiCallTypes.description,
            count: apiCalls.count,
            updatedAt: apiCalls.updatedAt,
            createdAt: apiCalls.updatedAt
        })
        .from(apiCalls)
		.leftJoin(apiCallTypes, eq(apiCalls.type, apiCallTypes.type))
		.where(eq(apiCalls.type, type))
        .orderBy(desc(apiCalls.updatedAt))
        .limit(1);

	return result.length > 0
		? {
			type: result[0].type,
			description: result[0].description ?? '',
			count: result[0].count ?? 0,
			updatedAt: result[0].updatedAt ?? new Date(0),
			createdAt: result[0].createdAt ?? new Date(0)
		}
		: null;
}