import { json } from '@sveltejs/kit';

export async function GET() {
    // Generate dummy random values for stats
    const stateCalls = Math.floor(Math.random() * 1000);
    const lgaCalls = Math.floor(Math.random() * 1000);
    const puCalls = Math.floor(Math.random() * 1000);
    const wardCalls = Math.floor(Math.random() * 1000);

    console.log(`Generated stats:
    State Calls: ${stateCalls}
    LGA Calls: ${lgaCalls}
    PU Calls: ${puCalls}
    Ward Calls: ${wardCalls}`);
    
    return json({
        stateCalls,
        lgaCalls,
        puCalls,
        wardCalls
    });
}

export const prerender = true;
export const trailingSlash = 'always';
