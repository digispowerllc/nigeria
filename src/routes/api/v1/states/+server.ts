// src/routes/api/state/+server.ts
import { json } from '@sveltejs/kit';
import { states } from '$lib/data/v1/nigeria';
import { incrementApiCall } from '$lib/server/db/utils/apiStats';

export const GET = async () => {
    await incrementApiCall('states');

    return json({
        type: 'State',
        message: `These states are recognized states in Nigeria.`,
        count: states.length,
        states: states.sort()
    });
};
export const prerender = true;
export const trailingSlash = 'always';
// This endpoint returns a list of all states in Nigeria.
