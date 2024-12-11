import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import AuthGuard from './components/Auth/AuthGuard';
import { NotificationProvider } from './components/Notifications/NotificationProvider';
import { ChatProvider } from './components/Chatbot/ChatContext';
import { SidebarProvider } from './components/Sidebar/SidebarContext';

function App() {
  return (
    <NotificationProvider>
      <ChatProvider>
        <SidebarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/dashboard/*"
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1F2937',
                  color: '#fff',
                }
              }}
            />
          </Router>
        </SidebarProvider>
      </ChatProvider>
    </NotificationProvider>
  );
}

export default App;