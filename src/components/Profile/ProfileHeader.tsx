import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function ProfileHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-lg" />
      
      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="relative flex items-end -mt-16 mb-4">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
              alt={user?.name}
              className="w-32 h-32 rounded-full border-4 border-gray-800"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
              <Camera size={16} />
            </button>
          </motion.div>
          
          <div className="ml-6 pb-2">
            <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
            <div className="flex items-center space-x-4 mt-2 text-gray-300">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>New York, USA</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Joined March 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}