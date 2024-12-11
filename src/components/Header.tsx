import React, { useState } from 'react';
import NotificationBell from './Notifications/NotificationBell';
import ProfileDropdown from './Profile/ProfileDropdown';
import NotificationList from './Notifications/NotificationList';
import SearchBar from './Search/SearchBar';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center flex-1">
          <SearchBar
            isExpanded={isSearchExpanded}
            onToggle={() => setIsSearchExpanded(!isSearchExpanded)}
            className="max-w-xl w-full"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="focus:outline-none"
            >
              <NotificationBell />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 z-50">
                <NotificationList />
              </div>
            )}
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}