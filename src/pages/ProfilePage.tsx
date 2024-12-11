import React from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileStats from '../components/Profile/ProfileStats';
import ProfileActivity from '../components/Profile/ProfileActivity';

export default function ProfilePage() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <ProfileHeader />
      </div>

      <ProfileStats />

      <div className="bg-gray-800 p-6 rounded-lg">
        <ProfileActivity />
      </div>
    </motion.div>
  );
}