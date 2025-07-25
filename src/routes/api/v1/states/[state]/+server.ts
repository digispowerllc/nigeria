// +server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { states } from '$lib/data/v1/nigeria';
import { lga, capitals } from '$lib/data/v1/nigeria';

export const GET: RequestHandler = ({ params }) => {
    const raw = params.state?.trim().toLowerCase();

    if (!raw) {
        const body = { error: 'No state, LGA, or capital provided.' };
        return new Response(JSON.stringify(body, null, 2), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const matchState = states.find((s) => s.toLowerCase() === raw);
    if (matchState) {
        const body = {
            type: 'state',
            state: matchState,
            capital: capitals[matchState],
            lgas: lga[matchState]?.sort() || []
        };
        return new Response(JSON.stringify(body, null, 2), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const matchCapital = Object.entries(capitals).find(([, capital]) => capital.toLowerCase() === raw);
    if (matchCapital) {
        const [state] = matchCapital;
        const body = {
            type: 'capital',
            capital: capitals[state],
            state,
            message: `${capitals[state]} is the capital of ${state} State.`,
            lgas: lga[state]?.sort() || []
        };
        return new Response(JSON.stringify(body, null, 2), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    for (const [state, lgaList] of Object.entries(lga)) {
        if (lgaList.some((lga) => lga.toLowerCase() === raw)) {
            const body = {
                "Type": 'Local Government Area',
                "State": state,
                "LGA": lgaList.find((lga) => lga.toLowerCase() === raw),
                "Message": `${raw} is a Local Government Area in ${state} State.`
            };
            return new Response(JSON.stringify(body, null, 2), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    const body = { error: `${raw} is not a recognized Nigerian state, capital or LGA.` };
    return new Response(JSON.stringify(body, null, 2), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });
};
