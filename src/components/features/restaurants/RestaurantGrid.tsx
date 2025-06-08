'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Bike } from 'lucide-react'

// Enhanced restaurant data with tags and description
const restaurants = [
  {
    id: 1,
    name: 'Pizza Italia',
    image: 'https://picsum.photos/400/300?random=1',
    cuisine: 'Italian',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    priceRange: '$$',
    description: 'Authentic Italian pizzas and pasta made with fresh ingredients',
    tags: ['pizza', 'pasta', 'italian', 'vegetarian']
  },
  {
    id: 2,
    name: 'Sushi Master',
    image: 'https://picsum.photos/400/300?random=2',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '25-35 min',
    deliveryFee: '$3.99',
    priceRange: '$$$',
    description: 'Premium sushi and Japanese cuisine',
    tags: ['sushi', 'japanese', 'seafood', 'asian']
  },
  {
    id: 3,
    name: 'Taco Fiesta',
    image: 'https://picsum.photos/400/300?random=3',
    cuisine: 'Mexican',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    priceRange: '$',
    description: 'Authentic Mexican tacos, burritos, and quesadillas',
    tags: ['tacos', 'mexican', 'burritos', 'spicy']
  },
  {
    id: 4,
    name: 'Curry House',
    image: 'https://picsum.photos/400/300?random=4',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: '$2.99',
    priceRange: '$$',
    description: 'Traditional Indian curries and tandoori dishes',
    tags: ['curry', 'indian', 'spicy', 'vegetarian']
  },
  {
    id: 5,
    name: 'Golden Dragon',
    image: 'https://picsum.photos/400/300?random=5',
    cuisine: 'Chinese',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: '$2.99',
    priceRange: '$$',
    description: 'Authentic Chinese cuisine and dim sum',
    tags: ['chinese', 'asian', 'dim sum', 'noodles']
  },
  {
    id: 6,
    name: 'Thai Spice',
    image: 'https://picsum.photos/400/300?random=6',
    cuisine: 'Thai',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: '$3.99',
    priceRange: '$$',
    description: 'Authentic Thai curries and stir-fries',
    tags: ['thai', 'asian', 'curry', 'spicy']
  }
]

interface RestaurantGridProps {
  selectedCuisine: string;
  selectedPrice: string;
  searchQuery: string;
}

export default function RestaurantGrid({ selectedCuisine, selectedPrice, searchQuery }: RestaurantGridProps) {
  // Process search terms
  const processSearchTerms = (query: string): string[] => {
    return query.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 1)
  }

  // Get term variations for better matching
  const getTermVariations = (term: string): string[] => {
    const variations: Record<string, string[]> = {
      'pizza': ['italian', 'pizzeria'],
      'sushi': ['japanese', 'asian'],
      'burger': ['american', 'burgers'],
      'curry': ['indian', 'thai', 'asian'],
      'spicy': ['indian', 'thai', 'mexican'],
      'noodles': ['chinese', 'asian', 'ramen'],
      'vegetarian': ['vegan', 'healthy', 'salad'],
      'seafood': ['fish', 'sushi', 'japanese']
    }
    return variations[term] || [term]
  }

  // Filter restaurants based on selected cuisine, price, and search query
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Basic filters
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine
    const matchesPrice = selectedPrice === 'all' || restaurant.priceRange.length === (selectedPrice === 'low' ? 1 : selectedPrice === 'medium' ? 2 : 3)

    // Search query matching
    if (searchQuery.trim()) {
      const searchTerms = processSearchTerms(searchQuery)
      const searchableText = [
        restaurant.name.toLowerCase(),
        restaurant.cuisine.toLowerCase(),
        restaurant.description.toLowerCase(),
        ...restaurant.tags
      ].join(' ')

      // Check if any search term or its variations match
      const matchesSearch = searchTerms.some(term => {
        const variations = getTermVariations(term)
        return variations.some(variation => searchableText.includes(variation))
      })

      return matchesCuisine && matchesPrice && matchesSearch
    }

    return matchesCuisine && matchesPrice
  })

  // Sort restaurants by relevance if there's a search query
  const sortedRestaurants = searchQuery.trim()
    ? filteredRestaurants.sort((a, b) => {
        const getScore = (restaurant: typeof restaurants[0]) => {
          let score = 0
          const searchTerms = processSearchTerms(searchQuery)
          const searchableText = [
            restaurant.name.toLowerCase(),
            restaurant.cuisine.toLowerCase(),
            restaurant.description.toLowerCase(),
            ...restaurant.tags
          ].join(' ')

          searchTerms.forEach(term => {
            const variations = getTermVariations(term)
            // Name matches get highest score
            if (restaurant.name.toLowerCase().includes(term)) score += 10
            // Cuisine matches get high score
            if (restaurant.cuisine.toLowerCase().includes(term)) score += 8
            // Tag matches get medium score
            if (restaurant.tags.some(tag => tag.includes(term))) score += 5
            // Description matches get base score
            if (restaurant.description.toLowerCase().includes(term)) score += 3
            // Variation matches get lower scores
            variations.forEach(variation => {
              if (searchableText.includes(variation)) score += 2
            })
          })

          return score
        }

        return getScore(b) - getScore(a)
      })
    : filteredRestaurants

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedRestaurants.map((restaurant) => (
        <Link
          key={restaurant.id}
          href={`/restaurants/${restaurant.id}`}
          className="group block bg-card-background rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{restaurant.cuisine}</span>
              <span className="text-sm text-gray-400">{restaurant.priceRange}</span>
            </div>

            <h3 className="font-semibold mb-2 group-hover:text-primary-blue transition-colors">
              {restaurant.name}
            </h3>

            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center text-yellow-500">
                <Star size={16} className="fill-current" />
                <span className="ml-1">{restaurant.rating}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock size={14} className="mr-1" />
                {restaurant.deliveryTime}
              </div>
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              <Bike size={14} className="mr-1" />
              Delivery {restaurant.deliveryFee}
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {restaurant.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 