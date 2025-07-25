import { lga, capitals } from '$lib/data/v1/nigeria';

export const GET = ({ url }: { url: URL }) => {
    const query = url.searchParams.get('state');

    if (!query) {
        return new Response(
            JSON.stringify({ error: 'Missing `state` query parameter' }, null, 2),
            { status: 400, headers: corsHeaders() }
        );
    }

    const input = query.trim().toLowerCase();

    // 1️⃣ Check if input matches a state
    const matchedState = Object.keys(lga).find(
        state => state.toLowerCase() === input
    );

    if (matchedState) {
        const sortedLgas = [...lga[matchedState]].sort((a, b) =>
            a.localeCompare(b)
        );
        return new Response(
            JSON.stringify(
                {
                    type: 'state',
                    message: `${matchedState} is a recognized State in Nigeria.`,
                    state: matchedState,
                    count: sortedLgas.length,
                    lgas: sortedLgas
                },
                null,
                2
            ),
            { status: 200, headers: corsHeaders() }
        );
    }

    // 2️⃣ Check if input matches a capital
    for (const [stateName, capitalCity] of Object.entries(capitals)) {
        if (capitalCity.toLowerCase() === input) {
            return new Response(
                JSON.stringify(
                    {
                        type: 'capital',
                        query: input,
                        message: `Nice one! "${capitalCity}" is actually the capital city of ${stateName} State.`
                    },
                    null,
                    2
                ),
                { status: 200, headers: corsHeaders() }
            );
        }
    }


    // 3️⃣ Check if input matches any LGA
    for (const [stateName, lgasInState] of Object.entries(lga)) {
        const matchedLga = lgasInState.find(
            lgaItem => lgaItem.toLowerCase() === input
        );

        if (matchedLga) {
            const sortedLgas = [...lgasInState].sort((a, b) =>
                a.localeCompare(b)
            );
            return new Response(
                JSON.stringify(
                    {
                        type: 'lga',
                        message: `${matchedLga} is an LGA in ${stateName} State.`,
                        state: stateName,
                        lga: matchedLga,
                        lgas: sortedLgas
                    },
                    null,
                    2
                ),
                { status: 200, headers: corsHeaders() }
            );
        }
    }

    // 4️⃣ Unknown input
    return new Response(
        JSON.stringify(
            {
                type: 'unknown',
                query: query,
                message: `Hmm... we couldn't recognize "${query}" as a state, LGA, or capital in Nigeria. Maybe check for typos or try a different name? We're happy to help!`
            },
            null,
            2
        ),
        { status: 404, headers: corsHeaders() }
    );

};

// Handle CORS preflight
export const OPTIONS = () =>
    new Response(null, {
        status: 204,
        headers: corsHeaders()
    });

// 🛡️ CORS headers
function corsHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*'
    };
}
