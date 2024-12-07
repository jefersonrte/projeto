import axios from 'axios';
import { config } from '../../config/env';
import type { User, UserFormData } from '../../types/user';
import { ADMIN_USER } from '../../config/initialData';

const api = axios.create({
  baseURL: `${config.api.baseUrl}/users`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// In-memory storage for demo purposes
let users: User[] = [
  {
    id: ADMIN_USER.id,
    email: ADMIN_USER.email,
    name: ADMIN_USER.name,
    role: ADMIN_USER.role,
    createdAt: ADMIN_USER.createdAt,
    updatedAt: ADMIN_USER.updatedAt,
  },
];

export const getUsers = async (): Promise<User[]> => {
  // Return the in-memory users including the admin
  return users;
};

export const createUser = async (userData: UserFormData): Promise<User> => {
  const newUser: User = {
    ...userData,
    id: (users.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = async (id: string, userData: Partial<UserFormData>): Promise<User> => {
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) throw new Error('User not found');

  // Prevent updating admin email
  if (id === ADMIN_USER.id && userData.email && userData.email !== ADMIN_USER.email) {
    throw new Error('Cannot change admin email');
  }

  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date().toISOString(),
  };
  return users[userIndex];
};

export const deleteUser = async (id: string): Promise<void> => {
  // Prevent deleting admin user
  if (id === ADMIN_USER.id) {
    throw new Error('Cannot delete admin user');
  }
  users = users.filter(u => u.id !== id);
};

export const changePassword = async (id: string, newPassword: string): Promise<void> => {
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) throw new Error('User not found');
  // In a real app, you would hash the password here
};