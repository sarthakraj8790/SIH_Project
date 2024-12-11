import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
      >
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span className="text-white text-sm">{user?.name?.[0]?.toUpperCase()}</span>
          )}
        </div>
        <span className="font-medium">{user?.name}</span>
        <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-20"
            >
              <button
                onClick={() => {
                  navigate('/dashboard/profile');
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                <User size={16} className="mr-2" />
                Profile
              </button>
              <button
                onClick={() => {
                  navigate('/dashboard/settings');
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                <Settings size={16} className="mr-2" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}