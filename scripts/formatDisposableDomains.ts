import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { resolve, dirname, basename } from 'path';

// Paths
const inputPath = resolve('src/lib/data/disposableEmail/disposable_domains.ts');
const backupPath = resolve(
  dirname(inputPath),
  `${basename(inputPath, '.ts')}.backup.${Date.now()}.ts`
);

// Step 1: Create a backup
copyFileSync(inputPath, backupPath);
console.log(`📦 Backup created at: ${backupPath}`);

// Step 2: Read original content
const rawContent = readFileSync(inputPath, 'utf-8');

// Step 3: Extract array content
const match = rawContent.match(/\[\s*([\s\S]*?)\s*\]/);
if (!match) {
  console.error('❌ Could not find domain array in the file.');
  process.exit(1);
}

const domainListRaw = match[1];

// Step 4: Parse and clean domains
const rawDomains = domainListRaw
  .split(',')
  .map(domain => domain.trim().replace(/^["']|["']$/g, '')) // remove quotes
  .filter(domain => domain.length > 0);

// Step 5: Sort and deduplicate
const seen = new Set<string>();
const cleanedDomains: string[] = [];

for (const domain of rawDomains.sort((a, b) => a.localeCompare(b))) {
  if (!seen.has(domain)) {
    seen.add(domain);
    cleanedDomains.push(domain);
  }
}

// Step 6: Format output
const formattedOutput = `export const disposableDomains = new Set([\n  ${cleanedDomains.map(d => `"${d}"`).join(',\n  ')}\n]);\n`;

// Step 7: Overwrite original file
writeFileSync(inputPath, formattedOutput, 'utf-8');
console.log(`✅ Original file cleaned and overwritten: ${inputPath}`);
