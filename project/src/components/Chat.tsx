import React, { useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const Chat: React.FC = () => {
  const { messages, addMessage } = useChatStore();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {message.role === 'user' ? (
                <User className="w-5 h-5" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-lg border p-2"
            placeholder="Type your message..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const content = e.currentTarget.value;
                if (content.trim()) {
                  addMessage(content, 'user');
                  e.currentTarget.value = '';
                }
              }
            }}
          />
          <button
            className="bg-blue-500 text-white rounded-lg p-2"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};