'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Clock,
  DollarSign,
  Settings,
  Bell
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/rider', icon: Home },
  { name: 'Schedule', href: '/rider/schedule', icon: Clock },
  { name: 'Earnings', href: '/rider/earnings', icon: DollarSign },
  { name: 'Settings', href: '/rider/settings', icon: Settings }
]

export default function RiderLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-card-background border-b border-gray-800 z-50">
        <div className="flex items-center justify-between px-4 h-full">
          <h1 className="text-lg font-semibold">Delivery App</h1>
          <button className="p-2 hover:bg-gray-800 rounded-lg relative">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-blue rounded-full" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-20">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card-background border-t border-gray-800 z-50">
        <nav className="flex items-center justify-around h-20">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-full ${
                  isActive
                    ? 'text-primary-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon size={24} />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 