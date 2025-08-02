// src/routes/api/checkemail/+server.ts
import { json } from '@sveltejs/kit';
import { getDisposableDomainSet } from '$lib/utils/disposableDomains';

function isValidEmail(email: string): boolean {
  // Basic RFC 5322-compliant regex
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export async function GET({ url }) {
  const email = url.searchParams.get('email');

  if (!email || !isValidEmail(email)) {
    return json({ error: 'Invalid email format' }, { status: 400 });
  }

  const domain = email.split('@')[1].trim().toLowerCase(); // Normalize domain
  const isDisposable = getDisposableDomainSet().has(domain); // Fast lookup

  return json({
    email,
    disposable: isDisposable
  });
}
