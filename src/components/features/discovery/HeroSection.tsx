'use client'

import Image from 'next/image'
import SearchBar from '@/components/shared/SearchBar'

export default function HeroSection() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://picsum.photos/1920/1080?random=1"
        alt="Hero background"
        fill
        className="object-cover brightness-50"
        priority
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
          Discover Everything You Need
        </h1>
        <p className="text-xl text-white/90 text-center mb-8 max-w-2xl">
          From local restaurants to grocery stores, find the best services in your area
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl">
          <SearchBar
            variant="hero"
            placeholder="Search for restaurants, groceries, pharmacies and more..."
          />
        </div>
      </div>
    </div>
  )
} 