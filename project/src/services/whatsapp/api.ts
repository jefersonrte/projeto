import axios from 'axios';
import { config } from '../../config/env';

const whatsappClient = axios.create({
  baseURL: config.whatsapp.apiUrl,
  headers: {
    'Authorization': `Bearer ${config.whatsapp.apiToken}`,
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (to: string, message: string): Promise<void> => {
  try {
    await whatsappClient.post('/messages', {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message },
    });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw new Error('Failed to send message');
  }
};