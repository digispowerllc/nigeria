import { states } from '$lib/data/v1/nigeria';

export const GET = async () => {
	const data = {
		type: 'State',
		message: `These states are recognized states in Nigeria.`,
		count: states.length,
		states: states.sort()
	};

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: corsHeaders()
	});
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