import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Search, Activity, Lock, BarChart, AlertTriangle } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Logo from '../components/Logo';

const features = [
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Real-time monitoring and threat detection for cryptocurrency transactions.'
  },
  {
    icon: Search,
    title: 'Chain Analysis',
    description: 'Deep insights into blockchain transactions and wallet relationships.'
  },
  {
    icon: Activity,
    title: 'Live Monitoring',
    description: 'Track transactions and wallet activity in real-time.'
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Comprehensive analytics and visualization tools.'
  },
  {
    icon: AlertTriangle,
    title: 'Risk Detection',
    description: 'Identify suspicious patterns and high-risk activities.'
  },
  {
    icon: Lock,
    title: 'Secure Access',
    description: 'Enterprise-grade security and access controls.'
  }
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      <AnimatedBackground />
      
      <nav className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/signin" 
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Sign in
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
                >
                  Sign up
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.h1
            className="text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Advanced Cryptocurrency
            <br />
            Monitoring System
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Secure your digital assets with real-time monitoring, advanced analytics,
            and comprehensive blockchain analysis tools.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/dashboard/wallet"
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              <Search size={20} />
              <span>Track Wallet</span>
            </Link>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <feature.icon className="text-indigo-500 mb-4" size={32} />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 CryptoGuard. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}