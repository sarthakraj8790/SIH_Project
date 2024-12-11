import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useSidebar } from './SidebarContext';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
}

export default function SidebarItem({ icon: Icon, label, to }: SidebarItemProps) {
  const location = useLocation();
  const { isCollapsed } = useSidebar();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <motion.div
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700'
        }`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={20} />
        {!isCollapsed && <span className="ml-3">{label}</span>}
      </motion.div>
    </Link>
  );
}