'use client'

import { Star, ShoppingCart, Tag, Box } from 'lucide-react'
import Link from 'next/link'

// Enhanced product data with tags and description
const products = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    category: 'Smartphones',
    brand: 'apple',
    image: 'https://picsum.photos/400/300?random=20',
    rating: 4.8,
    price: 999,
    originalPrice: 1099,
    availability: 'in-stock',
    description: 'Latest iPhone with advanced camera system and A16 chip',
    tags: ['iphone', 'smartphone', 'apple', 'ios', 'mobile', '5g'],
    specs: [
      '6.1" Super Retina XDR display',
      'A16 Bionic chip',
      'Pro camera system',
      '5G capable'
    ]
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    category: 'Laptops',
    brand: 'apple',
    image: 'https://picsum.photos/400/300?random=21',
    rating: 4.9,
    price: 1999,
    originalPrice: 2199,
    availability: 'in-stock',
    description: 'Powerful laptop with M2 Pro chip for professionals',
    tags: ['macbook', 'laptop', 'apple', 'macos', 'm2', 'pro'],
    specs: [
      '14" Liquid Retina XDR display',
      'M2 Pro chip',
      'Up to 18 hours battery life',
      'Pro apps optimized'
    ]
  },
  {
    id: 3,
    name: 'Samsung Galaxy S23 Ultra',
    category: 'Smartphones',
    brand: 'samsung',
    image: 'https://picsum.photos/400/300?random=22',
    rating: 4.7,
    price: 1199,
    originalPrice: 1299,
    availability: 'in-stock',
    description: 'Premium Android smartphone with S Pen and 200MP camera',
    tags: ['samsung', 'smartphone', 'android', 'galaxy', 'mobile', '5g'],
    specs: [
      '6.8" Dynamic AMOLED display',
      'Snapdragon 8 Gen 2',
      '200MP camera system',
      'S Pen included'
    ]
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    category: 'Audio',
    brand: 'sony',
    image: 'https://picsum.photos/400/300?random=23',
    rating: 4.8,
    price: 399,
    originalPrice: 449,
    availability: 'in-stock',
    description: 'Premium noise-cancelling headphones with exceptional sound',
    tags: ['sony', 'headphones', 'audio', 'wireless', 'noise-cancelling'],
    specs: [
      'Industry-leading noise cancellation',
      '30-hour battery life',
      'Multi-device pairing',
      'Hi-Res Audio certified'
    ]
  },
  {
    id: 5,
    name: 'LG C2 65" OLED TV',
    category: 'TVs',
    brand: 'lg',
    image: 'https://picsum.photos/400/300?random=24',
    rating: 4.9,
    price: 1799,
    originalPrice: 2099,
    availability: 'in-stock',
    description: 'Premium OLED TV with stunning picture quality',
    tags: ['lg', 'tv', 'oled', '4k', 'smart tv', 'gaming'],
    specs: [
      '65" 4K OLED display',
      'α9 Gen5 AI Processor',
      'Dolby Vision & Atmos',
      'HDMI 2.1 gaming features'
    ]
  },
  {
    id: 6,
    name: 'PS5 Digital Edition',
    category: 'Gaming',
    brand: 'sony',
    image: 'https://picsum.photos/400/300?random=25',
    rating: 4.8,
    price: 399,
    originalPrice: 399,
    availability: 'pre-order',
    description: 'Next-gen gaming console with lightning-fast loading',
    tags: ['playstation', 'ps5', 'gaming', 'console', 'digital'],
    specs: [
      'AMD Zen 2 processor',
      'Ray tracing support',
      'SSD storage',
      '4K gaming capable'
    ]
  }
]

interface ProductGridProps {
  selectedCategory: string;
  selectedBrand: string;
  selectedPrice: string;
  selectedAvailability: string;
  searchQuery: string;
}

export default function ProductGrid({ 
  selectedCategory, 
  selectedBrand, 
  selectedPrice, 
  selectedAvailability,
  searchQuery 
}: ProductGridProps) {
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
      'iphone': ['apple', 'smartphone', 'ios', 'mobile'],
      'macbook': ['apple', 'laptop', 'macos'],
      'samsung': ['android', 'galaxy', 'smartphone'],
      'playstation': ['ps5', 'gaming', 'console'],
      'headphones': ['audio', 'wireless', 'sound'],
      'tv': ['television', 'smart tv', 'display'],
      'laptop': ['computer', 'notebook', 'portable'],
      'gaming': ['games', 'console', 'play']
    }
    return variations[term] || [term]
  }

  // Filter products based on selected filters and search query
  const filteredProducts = products.filter(product => {
    // Basic filters
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand
    const matchesAvailability = selectedAvailability === 'all' || product.availability === selectedAvailability

    // Price range filter
    const matchesPrice = selectedPrice === 'all' || (() => {
      switch (selectedPrice) {
        case 'under-100':
          return product.price < 100
        case '100-500':
          return product.price >= 100 && product.price <= 500
        case '500-1000':
          return product.price > 500 && product.price <= 1000
        case 'over-1000':
          return product.price > 1000
        default:
          return true
      }
    })()

    // Search query matching
    if (searchQuery.trim()) {
      const searchTerms = processSearchTerms(searchQuery)
      const searchableText = [
        product.name.toLowerCase(),
        product.category.toLowerCase(),
        product.brand.toLowerCase(),
        product.description.toLowerCase(),
        ...product.tags,
        ...product.specs.map(s => s.toLowerCase())
      ].join(' ')

      // Check if any search term or its variations match
      const matchesSearch = searchTerms.some(term => {
        const variations = getTermVariations(term)
        return variations.some(variation => searchableText.includes(variation))
      })

      return matchesCategory && matchesBrand && matchesPrice && matchesAvailability && matchesSearch
    }

    return matchesCategory && matchesBrand && matchesPrice && matchesAvailability
  })

  // Sort products by relevance if there's a search query
  const sortedProducts = searchQuery.trim()
    ? filteredProducts.sort((a, b) => {
        const getScore = (product: typeof products[0]) => {
          let score = 0
          const searchTerms = processSearchTerms(searchQuery)
          const searchableText = [
            product.name.toLowerCase(),
            product.category.toLowerCase(),
            product.brand.toLowerCase(),
            product.description.toLowerCase(),
            ...product.tags,
            ...product.specs.map(s => s.toLowerCase())
          ].join(' ')

          searchTerms.forEach(term => {
            const variations = getTermVariations(term)
            // Name matches get highest score
            if (product.name.toLowerCase().includes(term)) score += 10
            // Category matches get high score
            if (product.category.toLowerCase().includes(term)) score += 8
            // Brand matches get high score
            if (product.brand.toLowerCase().includes(term)) score += 8
            // Tag matches get medium score
            if (product.tags.some(tag => tag.includes(term))) score += 5
            // Spec matches get medium score
            if (product.specs.some(spec => 
              spec.toLowerCase().includes(term)
            )) score += 5
            // Description matches get base score
            if (product.description.toLowerCase().includes(term)) score += 3
            // Variation matches get lower scores
            variations.forEach(variation => {
              if (searchableText.includes(variation)) score += 2
            })
          })

          return score
        }

        return getScore(b) - getScore(a)
      })
    : filteredProducts

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {sortedProducts.map((product) => (
        <Link
          key={product.id}
          href={`/electronics/${product.id}`}
          className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-blue transition-all"
        >
          {/* Product Image */}
          <div className="relative h-[200px] md:h-[250px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {product.originalPrice > product.price && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                Save ${product.originalPrice - product.price}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{product.category}</span>
              <div className="flex items-center text-yellow-500">
                <Star size={16} className="fill-current" />
                <span className="ml-1 text-sm">{product.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-blue transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center text-gray-400">
                <Tag size={14} className="mr-1" />
                {product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}
              </div>
              <div className="flex items-center text-gray-400">
                <Box size={14} className="mr-1" />
                {product.availability === 'in-stock' ? 'In Stock' : 'Pre-order'}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {product.specs.slice(0, 2).map((spec, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <span className="text-xl font-bold text-white">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                )}
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-primary-blue text-white rounded hover:bg-secondary-blue transition-colors">
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 