import { json } from '@sveltejs/kit';

export async function GET() {
    return json({
        stateCalls: 999,
        lgaCalls: 4785,
        puCalls: 120000,
        wardCalls: 570000
    });
}
