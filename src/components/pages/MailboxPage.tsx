import React, { useState } from 'react';
import { Mail, AlertTriangle, Bell, Trash2, Search } from 'lucide-react';

const mockMessages = [
  {
    id: 1,
    type: 'alert',
    title: 'Suspicious Activity Detected',
    content: 'Multiple high-value transactions detected from monitored wallet.',
    timestamp: new Date(),
    read: false,
  },
  {
    id: 2,
    type: 'notification',
    title: 'New Transaction Pattern Identified',
    content: 'Unusual transaction pattern detected in the network.',
    timestamp: new Date(),
    read: true,
  },
  // Add more mock messages
];

export default function MailboxPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const handleDelete = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'unread' && !msg.read) ||
      (selectedFilter === msg.type);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Mailbox</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="alert">Alerts</option>
              <option value="notification">Notifications</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors ${
              !message.read ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {message.type === 'alert' ? (
                  <AlertTriangle className="text-red-500 mt-1" size={20} />
                ) : (
                  <Bell className="text-blue-500 mt-1" size={20} />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {message.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">{message.content}</p>
                  <span className="text-sm text-gray-400">
                    {message.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!message.read && (
                  <button
                    onClick={() => handleMarkAsRead(message.id)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Mail size={20} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(message.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}