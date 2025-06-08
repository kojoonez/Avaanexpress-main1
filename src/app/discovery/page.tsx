'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/features/discovery/HeroSection'
import TrendingSection from '@/components/features/discovery/TrendingSection'
import CategoryGrid from '@/components/layout/CategoryGrid'

interface Category {
  id: string
  name: string
  icon: string
  description: string
}

const categories: Category[] = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: '🍽️',
    description: 'Discover local restaurants and order your favorite meals'
  },
  {
    id: 'groceries',
    name: 'Groceries',
    icon: '🛒',
    description: 'Fresh groceries delivered to your doorstep'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    icon: '💊',
    description: 'Medicines and healthcare products'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    description: 'Gadgets and electronic accessories'
  }
]

export default function DiscoveryPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [welcomeVisible, setWelcomeVisible] = useState(true)
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Hide welcome message after 5 seconds if user is logged in
    if (user) {
      const timer = setTimeout(() => {
        setWelcomeVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    } else {
      setWelcomeVisible(false)
    }
  }, [user])

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Overlay - Only show if user is logged in */}
      {welcomeVisible && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Avaan Express, {user.name}! 🎉
            </h2>
            <p className="text-gray-600">
              Your profile has been created successfully. Start exploring our services!
            </p>
          </div>
        </div>
      )}

      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <Navigation 
        onCollapse={(collapsed) => setIsNavCollapsed(collapsed)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />
      <div 
        className={`transition-all duration-300 ${
          isMobile 
            ? 'ml-0' 
            : isNavCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              What would you like to order?
            </h1>
            <p className="text-xl text-gray-600">
              Choose from our wide range of delivery services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => router.push(`/${category.id}`)}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-left"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
} 