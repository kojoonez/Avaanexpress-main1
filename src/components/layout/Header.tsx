'use client'

import { MapPin, Search, LogIn, Menu, X, User, LogOut, Settings, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/shared/SearchBar'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export default function Header({ isMobileMenuOpen, onMobileMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

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
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-black/80 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu Button and Logo Section */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={onMobileMenuToggle}
              className="text-gray-400 hover:text-white p-2 -ml-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-primary-blue hover:text-secondary-blue transition-colors whitespace-nowrap">
              Avaan Express
            </h1>
          </Link>
          
          {/* Location Selector - Hide on mobile when search is open */}
          {(!isMobile || !isSearchOpen) && (
            <button className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-400 hover:text-primary-blue transition-colors">
              <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">Select location</span>
            </button>
          )}
        </div>

        {/* Search Bar - Full width on mobile when open */}
        <div 
          className={`${
            isMobile 
              ? isSearchOpen 
                ? 'absolute left-0 right-0 top-0 h-full px-4 bg-black flex items-center z-50' 
                : 'hidden' 
              : 'relative w-[40%] z-50'
          }`}
        >
          <SearchBar
            variant="header"
            isMobile={isMobile && isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            className={isMobile && isSearchOpen ? 'w-full' : ''}
          />
          
          {/* Backdrop for mobile search */}
          {isMobile && isSearchOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsSearchOpen(false)}
            />
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Search Toggle */}
          {isMobile && !isSearchOpen && (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <Search size={20} />
            </button>
          )}

          {/* Auth Buttons - Hide on mobile when search is open */}
          {(!isMobile || !isSearchOpen) && (
            <div className="flex items-center gap-1.5 md:gap-2">
              {user ? (
                <>
                  {/* Cart Icon */}
                  <Link 
                    href="/cart" 
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <ShoppingCart size={24} />
                  </Link>

                  {/* Profile Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                        {user.profilePicture ? (
                          <Image
                            src={user.profilePicture}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-full h-full p-1 text-gray-400" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <User size={16} className="mr-2" />
                          My Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-2.5 py-1 md:px-3 md:py-1.5 bg-primary-blue text-white rounded-lg text-xs md:text-sm hover:bg-secondary-blue transition-colors whitespace-nowrap h-[28px] md:h-[34px] flex items-center justify-center"
                  >
                    <LogIn size={14} className="hidden md:block md:w-4 md:h-4 mr-1" />
                    <span>Log in</span>
                  </Link>
                  <Link 
                    href="/auth/signup"
                    className="px-2.5 py-1 md:px-3 md:py-1.5 bg-primary-blue text-white rounded-lg text-xs md:text-sm hover:bg-secondary-blue transition-colors whitespace-nowrap h-[28px] md:h-[34px] flex items-center justify-center"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 