import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart2, FileText, Wallet, Mail, 
  Settings, LogOut, AlertTriangle, FileBarChart, 
  Search, MapPin, Menu
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSidebar } from './SidebarContext';
import SidebarItem from './SidebarItem';
import Logo from '../Logo';

const menuItems = [
  { icon: BarChart2, label: 'Overview', path: '/dashboard' },
  { icon: Search, label: 'Chain Analysis', path: '/dashboard/chain-analysis' },
  { icon: AlertTriangle, label: 'Alerts', path: '/dashboard/alerts' },
  { icon: MapPin, label: 'Suspicious Transactions', path: '/dashboard/suspicious-transactions' },
  { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
  { icon: FileBarChart, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
  { icon: Mail, label: 'Mail Box', path: '/dashboard/mail' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.clearAuth);
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div 
      className={`flex flex-col bg-gray-800 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
    >
      <div className="flex items-center h-16 px-4 border-b border-gray-700">
        <Logo showText={!isCollapsed} />
        <motion.button
          onClick={toggleSidebar}
          className="ml-auto text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={20} />
        </motion.button>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            to={item.path}
          />
        ))}
      </nav>

      <div className="px-2 py-4 border-t border-gray-700">
        <SidebarItem
          icon={Settings}
          label="Settings"
          to="/dashboard/settings"
        />
        <motion.button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </motion.button>
      </div>
    </motion.div>
  );
}