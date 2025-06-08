'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Star, Clock, Bike, ChevronDown, Plus, Minus } from 'lucide-react'
import Header from '@/components/layout/Header'
import MenuItemModal from '@/components/features/restaurants/MenuItemModal'
import CartPreview from '@/components/cart/CartPreview'
import { useCart } from '@/contexts/CartContext'

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  options?: {
    name: string;
    choices: {
      name: string;
      price: number;
    }[];
  }[];
}

interface MenuSection {
  id: number;
  name: string;
  items: MenuItem[];
}

// Mock data - In a real app, this would come from an API
const restaurant = {
  id: 1,
  name: 'Pizza Italia',
  image: 'https://picsum.photos/800/400?random=1',
  cuisine: 'Italian',
  rating: 4.8,
  deliveryTime: '20-30 min',
  deliveryFee: '$2.99',
  priceRange: '$$',
  description: 'Authentic Italian pizzas and pasta made with fresh ingredients',
  tags: ['pizza', 'pasta', 'italian', 'vegetarian'],
  menu: [
    {
      id: 1,
      name: 'Pizzas',
      items: [
        {
          id: 101,
          name: 'Margherita Pizza',
          description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
          price: 14.99,
          image: 'https://picsum.photos/200/200?random=101',
          options: [
            {
              name: 'Size',
              choices: [
                { name: 'Small (10")', price: 0 },
                { name: 'Medium (12")', price: 3 },
                { name: 'Large (14")', price: 5 }
              ]
            },
            {
              name: 'Crust',
              choices: [
                { name: 'Thin', price: 0 },
                { name: 'Regular', price: 0 },
                { name: 'Thick', price: 1 }
              ]
            }
          ]
        },
        {
          id: 102,
          name: 'Pepperoni Pizza',
          description: 'Classic pepperoni with mozzarella and tomato sauce',
          price: 16.99,
          image: 'https://picsum.photos/200/200?random=102',
          options: [
            {
              name: 'Size',
              choices: [
                { name: 'Small (10")', price: 0 },
                { name: 'Medium (12")', price: 3 },
                { name: 'Large (14")', price: 5 }
              ]
            },
            {
              name: 'Crust',
              choices: [
                { name: 'Thin', price: 0 },
                { name: 'Regular', price: 0 },
                { name: 'Thick', price: 1 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Pasta',
      items: [
        {
          id: 201,
          name: 'Spaghetti Carbonara',
          description: 'Creamy sauce with pancetta, eggs, and parmesan',
          price: 15.99,
          image: 'https://picsum.photos/200/200?random=201'
        },
        {
          id: 202,
          name: 'Fettuccine Alfredo',
          description: 'Classic creamy alfredo sauce with parmesan',
          price: 14.99,
          image: 'https://picsum.photos/200/200?random=202'
        }
      ]
    }
  ]
}

export default function RestaurantPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [selectedSection, setSelectedSection] = useState<number>(1)
  const [showItemModal, setShowItemModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setShowItemModal(true)
  }

  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedOptions: Record<string, string>
  ) => {
    // Calculate total price including options
    let totalPrice = item.price
    if (item.options) {
      item.options.forEach(option => {
        const selectedChoice = option.choices.find(
          choice => choice.name === selectedOptions[option.name]
        )
        if (selectedChoice) {
          totalPrice += selectedChoice.price
        }
      })
    }

    // Format options for CartItem
    const formattedOptions = Object.entries(selectedOptions).map(([name, value]) => ({
      name,
      value,
      price: item.options?.find(opt => opt.name === name)?.choices.find(choice => choice.name === value)?.price || 0
    }))

    // Create unique ID for the item with its options
    const optionsKey = Object.entries(selectedOptions)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join('|')

    addItem({
      id: `${item.id}${optionsKey ? `|${optionsKey}` : ''}`,
      vendorId: restaurant.id,
      vendorName: restaurant.name,
      name: item.name,
      price: totalPrice,
      quantity,
      options: formattedOptions,
      image: item.image,
      section: 'restaurant'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Restaurant Hero */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" size={20} />
                <span>{restaurant.rating}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={20} />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Bike size={20} />
                <span>Delivery {restaurant.deliveryFee}</span>
              </div>
            </div>
            <p className="text-white/80 max-w-2xl">
              {restaurant.description}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Navigation */}
      <div className="sticky top-0 bg-card-background border-b border-gray-800 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto">
            {restaurant.menu.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  selectedSection === section.id
                    ? 'border-primary-blue text-primary-blue'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {restaurant.menu.map((section) => (
          <div
            key={section.id}
            className={section.id === selectedSection ? 'block' : 'hidden'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="flex gap-4 p-4 bg-card-background rounded-lg border border-gray-800 hover:border-gray-700 transition-colors text-left"
                >
                  {item.image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                    <span className="text-primary-blue">${item.price.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Menu Item Modal */}
      <MenuItemModal
        item={selectedItem}
        onClose={() => setShowItemModal(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Preview */}
      <CartPreview />
    </div>
  )
} 