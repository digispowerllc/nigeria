// src/routes/api/state/+server.ts
import { json } from '@sveltejs/kit';
import { states } from '$lib/data/v1/nigeria';

export const GET = async () => {
  return json({
    type: 'State',
    message: `These states are recognized states in Nigeria.`,
    count: states.length,
    states: states.sort()
  });
};

// This endpoint returns a list of all states in Nigeria.
