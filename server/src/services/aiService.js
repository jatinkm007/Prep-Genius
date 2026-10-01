import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const SOCRATIC_SYSTEM_INSTRUCTION = `
You are the PrepGenius Socratic Tutor, an expert mentor dedicated to preparing college students for technical interviews, DSA, and core engineering topics.

Guiding Principles:
1. Never give the direct solution or complete code upfront.
2. Ask thought-provoking, guiding questions to steer the user toward the solution.
3. If the user is completely stuck, break down the problem into smaller milestones or offer an intuitive hint.
4. Encourage optimal time and space complexity considerations.
5. Keep your tone encouraging, concise, and professional.
`;

const VERIFIED_MODELS = [
  'gemini-flash-latest',
  'gemini-3.5-flash',
  'gemini-2.5-flash-lite',
];

export const generateSocraticResponse = async (history = [], currentCode = '', language = '') => {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing in server/.env');
  }

  if (!Array.isArray(history) || history.length === 0) {
    throw new Error('Chat history is required to generate a response.');
  }

  const ai = new GoogleGenAI({ apiKey });

  // Map messages and filter out invalid/empty turns
  const formattedContents = history
    .filter((msg) => msg && typeof msg.content === 'string' && msg.content.trim().length > 0)
    .map((msg) => ({
      role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content.trim() }],
    }));

  // Ensure the history starts with a 'user' turn for the Gemini API
  while (formattedContents.length > 0 && formattedContents[0].role === 'model') {
    formattedContents.shift();
  }

  if (formattedContents.length === 0) {
    throw new Error('No valid user messages found in chat history.');
  }

  // If code is provided, inject it cleanly into the latest user prompt
  if (currentCode && currentCode.trim().length > 0) {
    const lastIndex = formattedContents.length - 1;
    if (formattedContents[lastIndex].role === 'user') {
      const codeSnippet = `\n\n[User's Current Code (${language || 'plaintext'})]:\n\`\`\`${language || ''}\n${currentCode.trim()}\n\`\`\``;
      formattedContents[lastIndex].parts[0].text += codeSnippet;
    }
  }

  let lastError = null;

  for (const model of VERIFIED_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: formattedContents,
        config: {
          systemInstruction: SOCRATIC_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        console.log(`[AI Tutor] Response successfully generated with: ${model}`);
        return response.text;
      }
    } catch (err) {
      console.warn(`[AI Tutor] Attempt on ${model} failed (${err?.status || err?.message}). Switching to fallback...`);
      lastError = err;
    }
  }

  throw lastError || new Error('All model endpoints are busy. Please try again.');
};