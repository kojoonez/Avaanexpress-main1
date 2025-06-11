'use client'

import { MapPin, Search, LogIn, Menu, X, User, LogOut, Settings, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/shared/SearchBar'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import CartPreview from '@/components/features/cart/CartPreview'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  children?: React.ReactNode;
}

export default function Header({ isMobileMenuOpen, onMobileMenuToggle, children }: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { items } = useCart()
  const { t } = useLanguage()

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/discovery')
    } catch (error) {
      console.error('Logout failed:', error)
      // Still try to redirect even if there's an error
      router.push('/discovery')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="p-2 hover:bg-gray-700 rounded-lg md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="text-xl font-bold text-white">
            Avaan Express
          </Link>
        </div>

        {/* Center section - Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/restaurants"
            className="text-gray-300 hover:text-white transition-colors"
          >
            {t('common.restaurants')}
          </Link>
          <Link
            href="/grocery"
            className="text-gray-300 hover:text-white transition-colors"
          >
            {t('common.grocery')}
          </Link>
          <Link
            href="/pharmacy"
            className="text-gray-300 hover:text-white transition-colors"
          >
            {t('common.pharmacy')}
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Link
            href="/cart"
            className="p-2 hover:bg-gray-700 rounded-lg relative group"
          >
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
            <div className="absolute right-0 mt-2 hidden group-hover:block">
              <CartPreview />
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-gray-800">
          <nav className="px-4 py-2">
            <Link
              href="/restaurants"
              className="block py-2 text-gray-300 hover:text-white transition-colors"
            >
              {t('common.restaurants')}
            </Link>
            <Link
              href="/grocery"
              className="block py-2 text-gray-300 hover:text-white transition-colors"
            >
              {t('common.grocery')}
            </Link>
            <Link
              href="/pharmacy"
              className="block py-2 text-gray-300 hover:text-white transition-colors"
            >
              {t('common.pharmacy')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
} 