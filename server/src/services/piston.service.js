import axios from 'axios';
import { LANGUAGE_VERSIONS, normalizeLanguage } from '../config/languages.js';

const PISTON_API_URL = process.env.PISTON_API_URL || 'https://emkc.org/api/v2/execute';

export const runCodeOnPiston = async ({ language, code, stdin = '' }) => {
  const mappedKey = normalizeLanguage(language);
  if (!mappedKey) {
    throw new Error(`Unsupported language: "${language}"`);
  }

  const config = LANGUAGE_VERSIONS[mappedKey];

  const payload = {
    language: config.language,
    version: config.version,
    files: [
      {
        name: `solution.${config.extension}`,
        content: code,
      },
    ],
    stdin: stdin,
    compile_timeout: 10000,
    run_timeout: 4000,
  };

  const response = await axios.post(PISTON_API_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
  });

  return response.data;
};
