import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['admin', 'agent']),
});

export type UserFormData = z.infer<typeof userSchema>;

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent';
  createdAt: string;
  updatedAt: string;
}