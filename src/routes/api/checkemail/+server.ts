import { json } from '@sveltejs/kit';
import { disposableDomains } from '$lib/data/disposableEmail/disposable_domains';

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export async function GET({ url }: { url: URL }) {
  const email = url.searchParams.get('email');

  if (!email || !isValidEmail(email)) {
    return json({ error: 'Invalid email format' }, { status: 400 });
  }

  const domain = email.split('@')[1]?.trim().toLowerCase();

  if (!domain) {
    return json({ error: 'Email domain missing' }, { status: 400 });
  }

  const isDisposable = disposableDomains.has(domain);

  return json({
    email,
    disposable: isDisposable
  });
}
