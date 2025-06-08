'use client'

import { ArrowRight, UtensilsCrossed, Truck, Clock, Star } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-primary-blue">Explore</span> & Discover
            <br />
            Local Services
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Find the best restaurants, groceries, pharmacies and more in your area.
            Everything you need, delivered to your doorstep.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              href="/discovery"
              className="px-8 py-4 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors flex items-center gap-2"
            >
              Start Exploring
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed className="w-8 h-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Multiple Categories</h3>
              <p className="text-gray-400">
                From restaurants to pharmacies, find all essential services in one place
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-gray-400">
                Professional riders ensuring quick and safe delivery
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Top Rated</h3>
              <p className="text-gray-400">
                Discover highly rated services and products in your area
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className="py-24 bg-gradient-to-b from-black to-background">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of users discovering local services every day.
          </p>
          <Link
            href="/discovery"
            className="px-8 py-4 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors inline-flex items-center gap-2"
          >
            Explore Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
} 