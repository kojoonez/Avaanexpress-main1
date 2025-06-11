'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Header from '@/components/layout/Header'

export default function CheckoutSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={false}
        onMobileMenuToggle={() => {}}
      />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-400 mb-8">
          Thank you for your order. We'll send you a confirmation email with your order details.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary-blue hover:bg-secondary-blue text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          
          <p className="text-sm text-gray-400">
            You'll be automatically redirected to the home page in a few seconds...
          </p>
        </div>
      </div>
    </div>
  )
} 