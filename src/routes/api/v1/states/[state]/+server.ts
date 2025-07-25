import type { RequestHandler } from '@sveltejs/kit';
import { states, lga, capitals } from '$lib/data/v1/nigeria';

export const GET: RequestHandler = async ({ params }) => {
    const raw = params.state?.trim().toLowerCase();



    if (!raw) {
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
        return new Response(
            JSON.stringify(
                {
                    type: 'state',
                    state: matchState,
                    capital: capitals[matchState],
                    message: `${matchState} is a recognized State in Nigeria.`,
                    count: lga[matchState]?.length || 0,
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
    return new Response(
        JSON.stringify({ error: `${raw} is not a recognized Nigerian state, capital or LGA.` }, null, 2),
        {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        }
    );
};

export const prerender = true;
export const trailingSlash = 'always';
