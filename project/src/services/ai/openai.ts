import OpenAI from 'openai';
import { config } from '../../config/env';
import type { ChatMessage } from '../../types';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
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