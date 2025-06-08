'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, ShoppingBag, Plus, Minus } from 'lucide-react'
import Header from '@/components/layout/Header'
import { useCart } from '@/contexts/CartContext'

// Mock data - In a real app, this would come from an API
const store = {
  id: 1,
  name: 'Fresh Market',
  image: 'https://picsum.photos/800/400?random=1',
  type: 'Supermarket',
  rating: 4.8,
  deliveryTime: '20-30 min',
  minOrder: 20,
  priceRange: '$$',
  description: 'Fresh produce, groceries, and household essentials',
  categories: [
    {
      id: 1,
      name: 'Fresh Produce',
      items: [
        {
          id: 101,
          name: 'Organic Bananas',
          description: 'Fresh organic bananas, sold by bunch',
          price: 2.99,
          unit: 'bunch',
          image: 'https://picsum.photos/200/200?random=101'
        },
        {
          id: 102,
          name: 'Red Apples',
          description: 'Fresh red apples, price per pound',
          price: 1.99,
          unit: 'lb',
          image: 'https://picsum.photos/200/200?random=102'
        }
      ]
    },
    {
      id: 2,
      name: 'Dairy & Eggs',
      items: [
        {
          id: 201,
          name: 'Whole Milk',
          description: 'Fresh whole milk, 1 gallon',
          price: 3.99,
          unit: 'gallon',
          image: 'https://picsum.photos/200/200?random=201'
        },
        {
          id: 202,
          name: 'Large Eggs',
          description: 'Farm fresh large eggs, dozen',
          price: 4.49,
          unit: 'dozen',
          image: 'https://picsum.photos/200/200?random=202'
        }
      ]
    }
  ]
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image?: string;
}

export default function StorePage() {
  const params = useParams()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [quantities, setQuantities] = useState<Record<number, number>>({})

  const handleQuantityChange = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }))
  }

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0
    if (quantity > 0) {
      addItem({
        id: product.id.toString(),
        restaurantId: store.id,
        name: product.name,
        price: product.price,
        basePrice: product.price,
        quantity,
        image: product.image
      })
      // Reset quantity after adding to cart
      setQuantities(prev => ({ ...prev, [product.id]: 0 }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Store Hero */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={store.image}
          alt={store.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {store.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
              <span>{store.type}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" size={20} />
                <span>{store.rating}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={20} />
                <span>{store.deliveryTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ShoppingBag size={20} />
                <span>Min ${store.minOrder}</span>
              </div>
            </div>
            <p className="text-white/80 max-w-2xl">
              {store.description}
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 bg-card-background border-b border-gray-800 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto">
            {store.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'border-primary-blue text-primary-blue'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {store.categories.map((category) => (
          <div
            key={category.id}
            className={category.id === selectedCategory ? 'block' : 'hidden'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((product) => (
                <div
                  key={product.id}
                  className="bg-card-background rounded-lg overflow-hidden border border-gray-800"
                >
                  {product.image && (
                    <div className="relative h-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-primary-blue">
                        ${product.price.toFixed(2)} / {product.unit}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          disabled={!quantities[product.id]}
                          className="p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-white w-8 text-center">
                          {quantities[product.id] || 0}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    {quantities[product.id] > 0 && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-4 py-2 bg-primary-blue hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 