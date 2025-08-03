// src/lib/utils/disposableDomains.ts
import { disposableDomains } from '$lib/data/disposableEmail/disposable_domains';

let domainSet: Set<string> | null = null;

export function getDisposableDomainSet(): Set<string> {
  if (domainSet) return domainSet;
  domainSet = new Set(disposableDomains.map(d => d.trim().toLowerCase()));
  return domainSet;
}
