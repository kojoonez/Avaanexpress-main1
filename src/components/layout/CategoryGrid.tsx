'use client'

import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    name: 'Restaurants',
    image: 'https://picsum.photos/200/200?random=1',
    href: '/restaurants'
  },
  {
    name: 'Groceries',
    image: 'https://picsum.photos/200/200?random=2',
    href: '/groceries'
  },
  {
    name: 'Pharmacies',
    image: 'https://picsum.photos/200/200?random=3',
    href: '/pharmacies'
  },
  {
    name: 'Health & Beauty',
    image: 'https://picsum.photos/200/200?random=4',
    href: '/health-beauty'
  },
  {
    name: 'Electronics',
    image: 'https://picsum.photos/200/200?random=5',
    href: '/electronics'
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="group relative aspect-square rounded-lg overflow-hidden bg-gray-900 hover:scale-105 transition-transform"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:opacity-75 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
} 