#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getAllFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Paths to exclude from the content
const exclusionPrefixes = [
  'pt-br', // Exclude non-English content
  'guides',
  'solid-router',
  'solid-meta',
  'configuration'
];

async function main() {
  try {
    const routesDir = join(__dirname, '../src/routes');
    const files = await getAllFiles(routesDir);

    const filteredFiles = files.filter(file => {
      for (const prefix of exclusionPrefixes) {
        if (file.includes(prefix)) {
          return false;
        }
      }
      return true;
    });

    console.log('Processing files:');
    console.log(filteredFiles.join('\n'));
    console.log();

    let fullContent = '';
    for (const file of filteredFiles) {
      const content = await readFile(file, 'utf-8');
      fullContent += content;
      fullContent += '\n\n';
    }

    console.log(`Length (chars        ): ${fullContent.length}`);
    console.log(`Length (approx tokens): ${Math.floor(fullContent.length / 4)}`);

    // Write to llms.txt in the root directory
    const outputPath = join(__dirname, '../public/llms.txt');
    await writeFile(outputPath, fullContent);
    console.log(`\nGenerated llms.txt at ${outputPath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main(); 