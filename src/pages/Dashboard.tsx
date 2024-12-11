import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot/Chatbot';
import Overview from '../components/pages/Overview';
import ChainAnalysisPage from './ChainAnalysisPage';

// Lazy load other pages to improve initial load performance
const ChartPage = React.lazy(() => import('../components/pages/ChartPage'));
const TransactionsPage = React.lazy(() => import('../components/pages/TransactionsPage'));
const WalletPage = React.lazy(() => import('../components/pages/WalletPage'));
const AlertsPage = React.lazy(() => import('./AlertsPage'));
const ReportsPage = React.lazy(() => import('./ReportsPage'));
const AnalyticsPage = React.lazy(() => import('./AnalyticsPage'));
const NewsPage = React.lazy(() => import('../components/pages/NewsPage'));
const MailboxPage = React.lazy(() => import('../components/pages/MailboxPage'));
const SettingsPage = React.lazy(() => import('../components/pages/SettingsPage'));
const ProfilePage = React.lazy(() => import('./ProfilePage'));
const SuspiciousTransactionsPage = React.lazy(() => import('./SuspiciousTransactionsPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <motion.main 
          className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/chart" element={<ChartPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/chain-analysis" element={<ChainAnalysisPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/mailbox" element={<MailboxPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/suspicious-transactions" element={<SuspiciousTransactionsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Suspense>
        </motion.main>
        <Chatbot />
      </div>
    </div>
  );
}