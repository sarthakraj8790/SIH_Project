import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, BarChart2, FileText, Wallet, Mail, 
  Settings, LogOut, AlertTriangle, FileBarChart, 
  Search, MapPin 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div 
      className="flex flex-col w-64 bg-gray-800"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center h-16 px-4 border-b border-gray-700">
        <img
          src="https://www.vhv.rs/dpng/d/495-4956236_national-emblem-of-india-png-transparent-png.png"
          alt="National Emblem of India"
          className="h-12 w-auto"
        />
        <span className="ml-2 text-white text-xl font-bold">CryptoGuard</span>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <BarChart2 className="mr-3" size={20} />
          Overview
        </Link>
        <Link to="/dashboard/chain-analysis" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <Search className="mr-3" size={20} />
          Chain Analysis
        </Link>
        <Link to="/dashboard/alerts" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <AlertTriangle className="mr-3" size={20} />
          Alerts
        </Link>
        <Link to="/dashboard/suspicious-transactions" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <MapPin className="mr-3" size={20} />
          Suspicious Transactions
        </Link>
        <Link to="/dashboard/reports" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <FileText className="mr-3" size={20} />
          Reports
        </Link>
        <Link to="/dashboard/analytics" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <FileBarChart className="mr-3" size={20} />
          Analytics
        </Link>
        <Link to="/dashboard/wallet" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <Wallet className="mr-3" size={20} />
          Wallet
        </Link>
        <Link to="/dashboard/mail" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <Mail className="mr-3" size={20} />
          Mail Box
        </Link>
      </nav>

      <div className="px-2 py-4 border-t border-gray-700">
        <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
          <Settings className="mr-3" size={20} />
          Settings
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          <LogOut className="mr-3" size={20} />
          Logout
        </button>
      </div>
    </motion.div>
  );
}