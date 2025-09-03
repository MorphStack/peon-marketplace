import { promises as fs } from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as yaml from 'js-yaml';

/**
 * Validates peon-marketplace.json items:
 * - Name and Author must exist and be <= 65 characters
 * - Fetches peon.yaml from the repo and ensures it's parsable
 * - Fails process with non-zero code on validation errors
 *
 * Usage:
 *    npm run validate
 */

interface MarketplaceItem {
  name: string;
  author: string;
  github?: string;
  url?: string;
  type?: string;
  os?: string[];
  description?: string;
}

interface Marketplace {
  version: string;
  peons: MarketplaceItem[];
}

const DEFAULT_MAX_LEN: number = 65;
const DEFAULT_JSON_PATH: string = path.resolve(process.cwd(), 'config', 'peon-marketplace.json');

async function validatePeonMarketplace(jsonPath: string = DEFAULT_JSON_PATH): Promise<void> {
  try {
    const data = await fs.readFile(jsonPath, 'utf8');
    const marketplace: Marketplace = JSON.parse(data);

    if (!marketplace.peons || !Array.isArray(marketplace.peons)) {
      console.error('❌ Invalid marketplace format: missing or invalid "peons" array');
      process.exit(1);
    }

    for (const item of marketplace.peons) {
      if (!item.name) {
        console.error(`❌ Invalid Peon name: ${item.name}.`);
        process.exit(1);
      }
      if (item.name.length > DEFAULT_MAX_LEN) {
        console.error(`❌ Peon name is too long, max: ${DEFAULT_MAX_LEN}.`);
        process.exit(1);
      }
      if (!item.author) {
        console.error(`❌ Invalid Peon author: ${item.author}.`);
        process.exit(1);
      }
      if (item.author.length > DEFAULT_MAX_LEN) {
        console.error(`❌ Peon author is too long, max: ${DEFAULT_MAX_LEN}.`);
        process.exit(1);
      }
      if (!item.url) {
        console.error('❌ A valid GitHub Repository "url" must be provided.');
        process.exit(1);
      }

      // Validate URL contains http://github.com or https://github.com
      if (!item.url.startsWith('http://github.com') && !item.url.startsWith('https://github.com')) {
        console.error(`❌ GitHub repository URL must start with https://github.com: ${item.url}`);
        process.exit(1);
      }

      // Validate peon.yaml exists in the repo & is parsable
      if (!(await peonConfigExists(item.url))) {
        console.error(
          `❌ Could not find a valid peon.yaml in the repository: ${item.url}. Be sure it exists in the root of the repository.`
        );
        process.exit(1);
      }
    }
    console.log(`✅ All ${marketplace.peons.length} marketplace items are valid!`);
  } catch (err) {
    const error = err as Error;
    console.error(`❌ Error reading or parsing JSON: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Fetches peon.yaml and returns the parsed object.
 * Returns null if not found or not parsable.
 */
async function getPeonConfig(repoUrl: string, branch: string = 'main'): Promise<null | object> {
  try {
    const url =
      repoUrl.replace(/\/$/, '').replace('github.com', 'raw.githubusercontent.com') +
      `/refs/heads/${branch}/peon.yml`;
    console.log(`Fetching peon.yaml from: ${url}`);
    const response = await axios.get<string>(url);
    if (!response.data) {
      return null;
    }
    return yaml.load(response.data) as object;
  } catch (err) {
    const error = err as Error;
    console.error(`❌ Error parsing peon.yml: ${error.message}`);
    return null;
  }
}

async function peonConfigExists(repoUrl: string): Promise<boolean> {
  const config = await getPeonConfig(repoUrl);
  return !!config && typeof config === 'object';
}

// Main execution when run directly
if (require.main === module) {
  const jsonPath = process.argv[2] || DEFAULT_JSON_PATH;
  validatePeonMarketplace(jsonPath).catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

export { validatePeonMarketplace };
