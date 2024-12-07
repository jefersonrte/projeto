export interface Ticket {
  id?: number;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'processing' | 'resolved';
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface TypebotResponse {
  message: string;
  nextStep: string;
  metadata?: Record<string, any>;
}