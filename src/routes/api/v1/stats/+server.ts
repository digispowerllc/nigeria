// src/routes/api/v1/stats/+server.ts
import { json } from '@sveltejs/kit';

export async function GET() {
    // Simulated growing fake values
    const stateCalls = 5000 + Math.floor(Math.random() * 500);   // 5000–5499
    const lgaCalls = 40000 + Math.floor(Math.random() * 1500);   // 40000–41499
    const puCalls = 120000 + Math.floor(Math.random() * 10000);  // 120000–129999
    const wardCalls = 18000 + Math.floor(Math.random() * 2000);  // 18000–19999

    //     console.log(`Generated dummy stats:
    // State Calls: ${stateCalls}
    // LGA Calls: ${lgaCalls}
    // PU Calls: ${puCalls}
    // Ward Calls: ${wardCalls}`);

    return json({
        stateCalls,
        lgaCalls,
        puCalls,
        wardCalls
    });
}
