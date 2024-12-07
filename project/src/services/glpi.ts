import axios from 'axios';
import type { Ticket } from '../types';

const GLPI_API_URL = import.meta.env.VITE_GLPI_API_URL;
const GLPI_API_TOKEN = import.meta.env.VITE_GLPI_API_TOKEN;

const glpiClient = axios.create({
  baseURL: GLPI_API_URL,
  headers: {
    'Authorization': `Bearer ${GLPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
  try {
    const response = await glpiClient.post('/Ticket', ticket);
    return response.data;
  } catch (error) {
    console.error('Error creating GLPI ticket:', error);
    throw new Error('Failed to create ticket');
  }
};

export const updateTicket = async (ticketId: number, updates: Partial<Ticket>): Promise<Ticket> => {
  try {
    const response = await glpiClient.put(`/Ticket/${ticketId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating GLPI ticket:', error);
    throw new Error('Failed to update ticket');
  }
};