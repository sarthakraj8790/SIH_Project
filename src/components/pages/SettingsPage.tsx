import React, { useState } from 'react';
import { User, Bell, Moon, Shield, Save } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { useAuthStore } from '../../store/authStore';

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: user?.name || '',
      email: user?.email || '',
      avatar: '',
    },
    notifications: {
      email: true,
      push: true,
      transactions: true,
      security: true,
    },
    appearance: {
      theme: 'dark',
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
    },
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings[section]);
    // In a real app, implement API calls to save settings
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-6">Settings</h2>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex space-x-4 border-b border-gray-700">
            <Tabs.Trigger
              value="profile"
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === 'profile'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>Profile</span>
              </div>
            </Tabs.Trigger>

            <Tabs.Trigger
              value="notifications"
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === 'notifications'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell size={16} />
                <span>Notifications</span>
              </div>
            </Tabs.Trigger>

            <Tabs.Trigger
              value="appearance"
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === 'appearance'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Moon size={16} />
                <span>Appearance</span>
              </div>
            </Tabs.Trigger>

            <Tabs.Trigger
              value="security"
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === 'security'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield size={16} />
                <span>Security</span>
              </div>
            </Tabs.Trigger>
          </Tabs.List>

          <div className="mt-6">
            <Tabs.Content value="profile" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200">Profile Picture</label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                      <User className="text-gray-400" size={32} />
                    </div>
                    <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      Change
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">Full Name</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, name: e.target.value },
                      })
                    }
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">Email Address</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, email: e.target.value },
                      })
                    }
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-400">Receive email updates about your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            email: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            push: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Transaction Alerts</h4>
                    <p className="text-sm text-gray-400">Get notified about suspicious transactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.transactions}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            transactions: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="appearance" className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-4">Theme</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, theme: 'light' },
                      })
                    }
                    className={`p-4 rounded-lg border-2 ${
                      settings.appearance.theme === 'light'
                        ? 'border-blue-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <div className="bg-white h-24 rounded-md mb-2"></div>
                    <span className="text-white">Light</span>
                  </button>
                  <button
                    onClick={() =>
                      setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, theme: 'dark' },
                      })
                    }
                    className={`p-4 rounded-lg border-2 ${
                      settings.appearance.theme === 'dark'
                        ? 'border-blue-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <div className="bg-gray-900 h-24 rounded-md mb-2"></div>
                    <span className="text-white">Dark</span>
                  </button>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="security" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: {
                            ...settings.security,
                            twoFactor: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Session Timeout</h4>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          sessionTimeout: e.target.value,
                        },
                      })
                    }
                    className="block w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => handleSave(activeTab)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}