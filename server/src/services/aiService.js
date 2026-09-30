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

// Direct matches from your verified model availability list
const VERIFIED_MODELS = [
  'gemini-flash-latest',
  'gemini-3.5-flash',
  'gemini-2.5-flash-lite',
];

export const generateSocraticResponse = async (history) => {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing in server/.env');
  }

  const ai = new GoogleGenAI({ apiKey });

  const formattedContents = history.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

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