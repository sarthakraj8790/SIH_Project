import React from 'react';
import { User } from 'lucide-react';

interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex space-x-2 flex-row-reverse">
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
        <User size={16} className="text-white" />
      </div>
      <div className="flex-1 bg-blue-500 rounded-lg p-3">
        <p className="text-white text-sm">{content}</p>
      </div>
    </div>
  );
}