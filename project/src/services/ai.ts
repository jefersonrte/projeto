import OpenAI from 'openai';
import type { ChatMessage } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const analyzeIssue = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error analyzing issue with AI:', error);
    throw new Error('Failed to analyze issue');
  }
};