import { create } from 'zustand';
import type { ChatMessage, Ticket } from '../types';
import { createTicket, updateTicket } from '../services/glpi/api';
import { analyzeIssue } from '../services/ai/openai';
import { sendMessage } from '../services/whatsapp/api';

interface ChatStore {
  messages: ChatMessage[];
  currentTicket: Ticket | null;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  createNewTicket: (title: string) => Promise<void>;
  updateCurrentTicket: (updates: Partial<Ticket>) => Promise<void>;
  analyzeAndRespond: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  currentTicket: null,

  addMessage: (content, role) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    };
    set(state => ({ messages: [...state.messages, newMessage] }));
  },

  createNewTicket: async (title) => {
    const newTicket: Ticket = {
      title,
      description: '',
      category: 'Support',
      priority: 'medium',
      status: 'new',
    };
    
    const ticket = await createTicket(newTicket);
    set({ currentTicket: ticket });
  },

  updateCurrentTicket: async (updates) => {
    const { currentTicket } = get();
    if (!currentTicket?.id) return;

    const updatedTicket = await updateTicket(currentTicket.id, updates);
    set({ currentTicket: updatedTicket });
  },

  analyzeAndRespond: async () => {
    const { messages, currentTicket } = get();
    if (!currentTicket) return;

    const analysis = await analyzeIssue(messages);
    await updateTicket(currentTicket.id!, {
      description: analysis,
      status: 'processing',
    });

    await sendMessage(currentTicket.title, analysis);
  },
}));