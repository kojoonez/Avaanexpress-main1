'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, TrendingUp } from 'lucide-react'

const trendingItems = [
  {
    id: 1,
    title: 'Burger King',
    category: 'Restaurant',
    image: 'https://picsum.photos/400/300?random=1',
    rating: 4.5,
    deliveryTime: '20-30 min',
    trending: '+15% orders today'
  },
  {
    id: 2,
    title: 'Fresh Market',
    category: 'Grocery',
    image: 'https://picsum.photos/400/300?random=2',
    rating: 4.8,
    deliveryTime: '30-45 min',
    trending: '+25% orders today'
  },
  {
    id: 3,
    title: 'City Pharmacy',
    category: 'Pharmacy',
    image: 'https://picsum.photos/400/300?random=3',
    rating: 4.6,
    deliveryTime: '15-25 min',
    trending: '+10% orders today'
  },
  {
    id: 4,
    title: 'Electronics Hub',
    category: 'Electronics',
    image: 'https://picsum.photos/400/300?random=4',
    rating: 4.7,
    deliveryTime: '40-60 min',
    trending: '+20% orders today'
  }
]

export default function TrendingSection() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Trending Now</h2>
        <Link 
          href="/trending"
          className="text-primary-blue hover:text-secondary-blue transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingItems.map((item) => (
          <Link
            key={item.id}
            href={`/store/${item.id}`}
            className="group block bg-card-background rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{item.category}</span>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} className="fill-current" />
                  <span className="ml-1 text-sm">{item.rating}</span>
                </div>
              </div>

              <h3 className="font-semibold mb-2 group-hover:text-primary-blue transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <Clock size={14} className="mr-1" />
                  {item.deliveryTime}
                </div>
                <div className="flex items-center text-green-500">
                  <TrendingUp size={14} className="mr-1" />
                  {item.trending}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
} 