import axios from 'axios';

const WHATSAPP_API_URL = import.meta.env.VITE_WHATSAPP_API_URL;
const WHATSAPP_API_TOKEN = import.meta.env.VITE_WHATSAPP_API_TOKEN;

const whatsappClient = axios.create({
  baseURL: WHATSAPP_API_URL,
  headers: {
    'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
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