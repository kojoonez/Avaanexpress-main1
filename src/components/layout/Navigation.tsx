'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  Compass, 
  UtensilsCrossed, 
  ShoppingCart, 
  ChevronLeft,
  ChevronRight,
  Pill,
  Sparkles,
  Cpu,
  Truck,
  Package,
  ClipboardList
} from 'lucide-react'

const navigationItems = [
  { 
    title: 'Services',
    items: [
      { name: 'Discovery', href: '/discovery', icon: Compass },
      { name: 'Restaurants', href: '/restaurants', icon: UtensilsCrossed },
      { name: 'Groceries', href: '/groceries', icon: ShoppingCart },
      { name: 'Pharmacies', href: '/pharmacies', icon: Pill },
      { name: 'Health & Beauty', href: '/health-beauty', icon: Sparkles },
      { name: 'Electronics', href: '/electronics', icon: Cpu },
    ]
  },
  {
    title: 'Delivery',
    items: [
      { name: 'Request Delivery', href: '/delivery/request', icon: Truck },
      { name: 'Track Order', href: '/delivery/track', icon: Package },
      { name: 'Order History', href: '/delivery/history', icon: ClipboardList },
    ]
  }
]

interface NavigationProps {
  onCollapse?: (collapsed: boolean) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

export default function Navigation({ onCollapse, isMobileMenuOpen, onMobileMenuClose }: NavigationProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
        onCollapse?.(true)
      }
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [onCollapse])

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed)
    onCollapse?.(collapsed)
  }

  return (
    <>
      {/* Navigation Sidebar */}
      <nav className={`fixed left-0 top-[60px] h-[calc(100vh-60px)] bg-black border-r border-gray-800 transition-all duration-300
        ${isMobile 
          ? `${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-full md:w-auto z-40`
          : `${isCollapsed ? 'w-20' : 'w-64'}`
        }`}
      >
        {/* Collapse Button - Only show on desktop */}
        {!isMobile && (
          <button
            onClick={() => handleCollapse(!isCollapsed)}
            className="absolute -right-3 top-4 p-1 bg-black border border-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
        
        <div className="h-full overflow-y-auto py-4">
          {navigationItems.map((section, index) => (
            <div key={section.title} className={`${index > 0 ? 'mt-6' : ''}`}>
              {/* Section Title - Hide on collapsed desktop */}
              {(!isCollapsed || isMobile) && (
                <h2 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h2>
              )}
              
              <ul className="space-y-1 px-2">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-blue text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                        title={isCollapsed && !isMobile ? item.name : undefined}
                        onClick={() => isMobile && onMobileMenuClose()}
                      >
                        <Icon size={18} />
                        {(!isCollapsed || isMobile) && <span>{item.name}</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onMobileMenuClose}
        />
      )}
    </>
  )
} 