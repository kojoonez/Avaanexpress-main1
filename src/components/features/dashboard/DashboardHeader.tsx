'use client'

import { Bell, Settings, User } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="bg-card-background border-b border-gray-800 h-16">
      <div className="h-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        {/* System Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-400">System Status: Operational</span>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Admin Actions */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="text-sm">
              <div className="font-medium">Admin User</div>
              <div className="text-gray-400">Super Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 