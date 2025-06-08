'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search, Loader2, Star } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  id: string
  name: string
  type: 'restaurant' | 'grocery' | 'pharmacy' | 'electronics' | 'health-beauty'
  image: string
  rating: number
  deliveryTime: string
  description: string
  tags: string[]
  priceRange: '$' | '$$' | '$$$'
}

// Add utility types and functions at the top of the file, after the imports
interface ProcessedSearchTerms {
  original: string[];
  variations: string[];
  ngrams: string[];
}

interface SearchableItem extends SearchResult {
  processedTerms?: ProcessedSearchTerms;
}

// Utility functions for processing search terms
const processText = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace special chars with spaces
    .split(/\s+/)
    .filter(word => word.length > 1) // Filter out single characters
}

const generateNgrams = (words: string[], minLength: number = 3): string[] => {
  const ngrams: Set<string> = new Set()
  
  words.forEach(word => {
    if (word.length < minLength) {
      ngrams.add(word)
      return
    }
    
    // Generate substrings of the word
    for (let i = 0; i < word.length - minLength + 1; i++) {
      for (let j = i + minLength; j <= word.length; j++) {
        ngrams.add(word.slice(i, j))
      }
    }
  })
  
  return Array.from(ngrams)
}

const getTermVariations = (term: string): string[] => {
  const variations: Record<string, string[]> = {
    'iphone': ['iphone', 'apple', 'smartphone', 'phone', 'mobile'],
    'macbook': ['macbook', 'apple', 'laptop', 'computer', 'mac'],
    'ipad': ['ipad', 'apple', 'tablet'],
    'phone': ['smartphone', 'mobile', 'iphone', 'samsung', 'android', 'cell'],
    'laptop': ['laptop', 'computer', 'macbook', 'notebook', 'pc'],
    'tablet': ['tablet', 'ipad', 'samsung', 'android'],
    'pc': ['computer', 'laptop', 'desktop', 'windows'],
    'mobile': ['smartphone', 'phone', 'iphone', 'android', 'cell'],
    'headphones': ['headphones', 'earphones', 'airpods', 'buds', 'audio'],
    'tv': ['television', 'smart tv', 'led', 'screen', 'display'],
    'game': ['gaming', 'games', 'console', 'playstation', 'xbox', 'nintendo'],
    'food': ['restaurant', 'meal', 'dining', 'cuisine'],
    'restaurant': ['food', 'dining', 'cuisine', 'meal'],
    'grocery': ['groceries', 'food', 'market', 'store'],
    'pharmacy': ['medicine', 'drug', 'prescription', 'health'],
    'beauty': ['cosmetics', 'makeup', 'skincare', 'care']
  }
  
  return variations[term] || [term]
}

const processSearchableItem = (item: SearchableItem): SearchableItem => {
  // Extract all searchable text
  const searchableText = [
    item.name,
    item.description,
    item.type,
    ...item.tags
  ].join(' ')
  
  // Get original terms
  const originalTerms = Array.from(new Set(processText(searchableText)))
  
  // Get variations for each term
  const variations = Array.from(new Set(
    originalTerms.flatMap(term => getTermVariations(term))
  ))
  
  // Generate ngrams for partial matching
  const ngrams = generateNgrams([...originalTerms, ...variations])
  
  item.processedTerms = {
    original: originalTerms,
    variations,
    ngrams
  }
  
  return item
}

// Mock database of items
const mockDatabase: SearchResult[] = [
  {
    id: '1',
    name: 'Burger Palace',
    type: 'restaurant',
    image: 'https://picsum.photos/400/300?random=1',
    rating: 4.5,
    deliveryTime: '20-30 min',
    description: 'Best burgers in town with fresh ingredients',
    tags: ['burgers', 'fast food', 'american', 'fries', 'shakes'],
    priceRange: '$$'
  },
  {
    id: '2',
    name: 'Fresh Market',
    type: 'grocery',
    image: 'https://picsum.photos/400/300?random=2',
    rating: 4.8,
    deliveryTime: '30-45 min',
    description: 'Fresh produce, groceries, and household items',
    tags: ['groceries', 'fresh produce', 'organic', 'vegetables', 'fruits'],
    priceRange: '$$'
  },
  {
    id: '3',
    name: 'City Pharmacy',
    type: 'pharmacy',
    image: 'https://picsum.photos/400/300?random=3',
    rating: 4.7,
    deliveryTime: '15-25 min',
    description: '24/7 pharmacy with prescription and OTC medications',
    tags: ['pharmacy', 'medications', 'health', 'prescriptions', 'otc'],
    priceRange: '$'
  },
  {
    id: '4',
    name: 'Tech Hub',
    type: 'electronics',
    image: 'https://picsum.photos/400/300?random=4',
    rating: 4.6,
    deliveryTime: '40-60 min',
    description: 'Latest electronics and gadgets',
    tags: ['electronics', 'gadgets', 'phones', 'computers', 'accessories'],
    priceRange: '$$$'
  },
  {
    id: '5',
    name: 'Beauty Zone',
    type: 'health-beauty',
    image: 'https://picsum.photos/400/300?random=5',
    rating: 4.9,
    deliveryTime: '25-35 min',
    description: 'Premium beauty products and cosmetics',
    tags: ['beauty', 'cosmetics', 'skincare', 'makeup', 'personal care'],
    priceRange: '$$'
  },
  {
    id: '6',
    name: 'Pizza Express',
    type: 'restaurant',
    image: 'https://picsum.photos/400/300?random=6',
    rating: 4.4,
    deliveryTime: '25-35 min',
    description: 'Authentic Italian pizzas and pasta',
    tags: ['pizza', 'italian', 'pasta', 'fast food', 'delivery'],
    priceRange: '$$'
  },
  {
    id: '7',
    name: 'Asian Mart',
    type: 'grocery',
    image: 'https://picsum.photos/400/300?random=7',
    rating: 4.6,
    deliveryTime: '30-45 min',
    description: 'Asian groceries and specialty items',
    tags: ['asian', 'groceries', 'international', 'specialty', 'food'],
    priceRange: '$'
  },
  {
    id: '8',
    name: 'Sushi Master',
    type: 'restaurant',
    image: 'https://picsum.photos/400/300?random=8',
    rating: 4.8,
    deliveryTime: '25-35 min',
    description: 'Premium sushi and Japanese cuisine',
    tags: ['sushi', 'japanese', 'asian', 'seafood', 'restaurant'],
    priceRange: '$$$'
  },
  {
    id: '9',
    name: 'Taco Fiesta',
    type: 'restaurant',
    image: 'https://picsum.photos/400/300?random=9',
    rating: 4.3,
    deliveryTime: '20-30 min',
    description: 'Authentic Mexican tacos and burritos',
    tags: ['mexican', 'tacos', 'burritos', 'fast food', 'restaurant'],
    priceRange: '$'
  },
  {
    id: '10',
    name: 'Indian Spice',
    type: 'restaurant',
    image: 'https://picsum.photos/400/300?random=10',
    rating: 4.7,
    deliveryTime: '30-45 min',
    description: 'Authentic Indian cuisine and curry dishes',
    tags: ['indian', 'curry', 'spicy', 'vegetarian', 'restaurant'],
    priceRange: '$$'
  },
  {
    id: '11',
    name: 'Apple Store',
    type: 'electronics',
    image: 'https://picsum.photos/400/300?random=11',
    rating: 4.9,
    deliveryTime: '30-45 min',
    description: 'Official Apple products - iPhone, MacBook, iPad, and accessories',
    tags: ['apple', 'iphone', 'macbook', 'ipad', 'electronics', 'smartphone', 'laptop', 'tablet', 'airpods', 'watch'],
    priceRange: '$$$'
  },
  {
    id: '12',
    name: 'Samsung Store',
    type: 'electronics',
    image: 'https://picsum.photos/400/300?random=12',
    rating: 4.8,
    deliveryTime: '30-45 min',
    description: 'Samsung phones, tablets, and smart devices',
    tags: ['samsung', 'galaxy', 'smartphone', 'tablet', 'electronics', 'android', 'watch', 'buds'],
    priceRange: '$$$'
  },
  {
    id: '13',
    name: 'Laptop World',
    type: 'electronics',
    image: 'https://picsum.photos/400/300?random=13',
    rating: 4.7,
    deliveryTime: '35-50 min',
    description: 'Wide range of laptops and accessories',
    tags: ['laptop', 'macbook', 'dell', 'hp', 'lenovo', 'asus', 'electronics', 'computer', 'accessories'],
    priceRange: '$$$'
  },
  {
    id: '14',
    name: 'Mobile Zone',
    type: 'electronics',
    image: 'https://picsum.photos/400/300?random=14',
    rating: 4.6,
    deliveryTime: '25-40 min',
    description: 'Smartphones and accessories from all major brands',
    tags: ['smartphone', 'iphone', 'samsung', 'xiaomi', 'oneplus', 'electronics', 'mobile', 'accessories', 'cases'],
    priceRange: '$$'
  },
  {
    id: '15',
    name: 'Gaming Hub',
    type: 'electronics',
    image: 'https://picsum.photos/400/300?random=15',
    rating: 4.8,
    deliveryTime: '30-45 min',
    description: 'Gaming consoles, games, and accessories',
    tags: ['gaming', 'playstation', 'xbox', 'nintendo', 'ps5', 'electronics', 'console', 'games', 'accessories'],
    priceRange: '$$'
  }
]

// Process the mock database
const processedDatabase: SearchableItem[] = mockDatabase.map(processSearchableItem)

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState<SearchableItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedPrice, setSelectedPrice] = useState<string>('all')

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return

      setIsLoading(true)
      setError('')

      try {
        await new Promise(resolve => setTimeout(resolve, 500))

        // Process the search query
        const searchTerms = processText(query)
        const searchNgrams = generateNgrams(searchTerms)
        
        let filteredResults = processedDatabase.filter(item => {
          if (!item.processedTerms) return false

          // Check for matches in original terms, variations, and ngrams
          const { original, variations, ngrams } = item.processedTerms

          const matchesOriginal = searchTerms.some(term => 
            original.includes(term)
          )
          
          const matchesVariations = searchTerms.some(term =>
            variations.includes(term)
          )
          
          const matchesNgrams = searchNgrams.some(ngram =>
            ngrams.includes(ngram)
          )

          const matchesType = selectedType === 'all' || item.type === selectedType
          const matchesPrice = selectedPrice === 'all' || item.priceRange === selectedPrice

          return (matchesOriginal || matchesVariations || matchesNgrams) && matchesType && matchesPrice
        })

        // Enhanced relevance scoring using processed terms
        filteredResults.sort((a, b) => {
          const getScore = (item: SearchableItem) => {
            if (!item.processedTerms) return 0
            const { original, variations, ngrams } = item.processedTerms
            let score = 0

            // Score based on original terms
            searchTerms.forEach(term => {
              // Exact matches in original terms
              if (original.includes(term)) score += 30
              // Matches in variations
              if (variations.includes(term)) score += 20
              // Matches in ngrams (partial matches)
              if (ngrams.includes(term)) score += 10
            })

            // Boost score based on field importance
            if (item.name.toLowerCase().includes(query.toLowerCase())) score += 50
            if (item.tags.some(tag => tag.includes(query.toLowerCase()))) score += 25
            if (item.description.toLowerCase().includes(query.toLowerCase())) score += 15

            return score
          }

          return getScore(b) - getScore(a)
        })

        setResults(filteredResults)
      } catch (err) {
        setError('Failed to fetch search results. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query, selectedType, selectedPrice])

  if (!query) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-4">Search Results</h1>
          <p className="text-gray-400">Please enter a search query.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-white">
            Search Results for "{query}"
          </h1>

          <div className="flex gap-4">
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
            >
              <option value="all">All Types</option>
              <option value="restaurant">Restaurants</option>
              <option value="grocery">Groceries</option>
              <option value="pharmacy">Pharmacies</option>
              <option value="electronics">Electronics</option>
              <option value="health-beauty">Health & Beauty</option>
            </select>

            {/* Price Filter */}
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
            >
              <option value="all">All Prices</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-blue" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        ) : results.length === 0 ? (
          <div className="text-gray-400">
            No results found for "{query}". Try a different search term.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/${result.type}/${result.id}`}
                className="bg-card-background rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-blue transition-all"
              >
                <div className="aspect-video relative">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-sm text-white">
                    {result.type}
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-sm text-white">
                    {result.priceRange}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white mb-1">
                    {result.name}
                  </h2>
                  <p className="text-sm text-gray-400 mb-2">
                    {result.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-400">{result.rating}</span>
                    </div>
                    <span className="text-gray-400">{result.deliveryTime}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {result.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 