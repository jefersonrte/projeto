import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/LoginForm';
import { Chat } from './components/Chat';
import { UserManagement } from './components/admin/UserManagement';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/admin/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4 bg-blue-500 text-white">
                      <h1 className="text-xl font-bold">Support Chat</h1>
                      <p className="text-sm opacity-90">
                        Connected to GLPI Ticket System
                      </p>
                    </div>
                    <Chat />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route path="/" element={<Navigate to="/chat" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;