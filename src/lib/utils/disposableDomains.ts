// src/lib/utils/disposableDomains.ts
import fs from 'fs';
import path from 'path';

let domainSet: Set<string> | null = null;

export function getDisposableDomainSet(): Set<string> {
  if (domainSet) return domainSet;

  const filePath = path.resolve('src/lib/data/disposableEmail/disposable_domains.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const domains: string[] = JSON.parse(raw);

  domainSet = new Set(domains.map(d => d.toLowerCase()));
  return domainSet;
}
