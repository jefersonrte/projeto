import axios from 'axios';
import { config } from '../../config/env';
import type { Ticket } from '../../types';

const glpiClient = axios.create({
  baseURL: config.glpi.apiUrl,
  headers: {
    'Authorization': `Bearer ${config.glpi.apiToken}`,
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