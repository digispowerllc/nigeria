import type { RequestHandler } from '@sveltejs/kit';
import { states, lga, capitals } from '$lib/data/v1/nigeria';
import { incrementApiCall } from '$lib/server/db/utils/apiStats';
import { getApiCallStats } from '$lib/server/db/utils/getApiCallStats';

export const GET: RequestHandler = async ({ params }) => {
    const raw = params.state?.trim().toLowerCase();


    const stats = await getApiCallStats();
    console.table(stats);

    if (!raw) {
        await incrementApiCall('invalid');
        return new Response(
            JSON.stringify({ error: 'No state, LGA, or capital provided.' }, null, 2),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    // Match a state
    const matchState = states.find((s) => s.toLowerCase() === raw);
    if (matchState) {
        await incrementApiCall('state');
        return new Response(
            JSON.stringify(
                {
                    type: 'state',
                    state: matchState,
                    capital: capitals[matchState],
                    lgas: lga[matchState]?.sort() || []
                },
                null,
                2
            ),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Match a capital
    const matchCapital = Object.entries(capitals).find(([, capital]) => capital.toLowerCase() === raw);
    if (matchCapital) {
        const [state] = matchCapital;
        await incrementApiCall('capital');
        return new Response(
            JSON.stringify(
                {
                    type: 'capital',
                    capital: capitals[state],
                    state,
                    message: `${capitals[state]} is the capital of ${state} State.`,
                    lgas: lga[state]?.sort() || []
                },
                null,
                2
            ),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Match an LGA
    for (const [state, lgaList] of Object.entries(lga)) {
        const found = lgaList.find((l) => l.toLowerCase() === raw);
        if (found) {
            await incrementApiCall('lga');
            return new Response(
                JSON.stringify(
                    {
                        type: 'lga',
                        state,
                        lga: found,
                        message: `${found} is a Local Government Area in ${state} State.`
                    },
                    null,
                    2
                ),
                { headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    // No match found
    await incrementApiCall('unknown');
    return new Response(
        JSON.stringify({ error: `${raw} is not a recognized Nigerian state, capital or LGA.` }, null, 2),
        {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        }
    );
};

export const prerender = false;
export const trailingSlash = 'always';
