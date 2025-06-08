'use client'

import { useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, Phone, Upload, Plus, Minus, Stethoscope } from 'lucide-react'
import Header from '@/components/layout/Header'
import { useCart } from '@/contexts/CartContext'

// Mock data - In a real app, this would come from an API
const pharmacy = {
  id: 1,
  name: 'HealthCare Pharmacy',
  image: 'https://picsum.photos/800/400?random=1',
  type: 'Retail',
  services: ['Prescription', 'OTC', 'Medical Supplies'],
  rating: 4.8,
  deliveryTime: '30-45 min',
  isOpen24Hours: true,
  acceptsInsurance: true,
  description: 'Full-service pharmacy with prescription and OTC medications',
  address: '123 Health St, Medical District',
  phone: '(555) 123-4567',
  categories: [
    {
      id: 1,
      name: 'Over-the-Counter',
      items: [
        {
          id: 101,
          name: 'Pain Relief Tablets',
          description: 'Fast-acting pain relief, 24 tablets',
          price: 8.99,
          image: 'https://picsum.photos/200/200?random=101'
        },
        {
          id: 102,
          name: 'Cold & Flu Medicine',
          description: 'Multi-symptom relief, 12 capsules',
          price: 12.99,
          image: 'https://picsum.photos/200/200?random=102'
        }
      ]
    },
    {
      id: 2,
      name: 'Medical Supplies',
      items: [
        {
          id: 201,
          name: 'Digital Thermometer',
          description: 'Fast reading digital thermometer',
          price: 15.99,
          image: 'https://picsum.photos/200/200?random=201'
        },
        {
          id: 202,
          name: 'First Aid Kit',
          description: 'Complete first aid kit for home use',
          price: 24.99,
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
  image?: string;
}

export default function PharmacyPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        restaurantId: pharmacy.id,
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)])
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Pharmacy Hero */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={pharmacy.image}
          alt={pharmacy.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {pharmacy.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
              <span>{pharmacy.type}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" size={20} />
                <span>{pharmacy.rating}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={20} />
                <span>{pharmacy.deliveryTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Phone size={20} />
                <span>{pharmacy.phone}</span>
              </div>
              {pharmacy.acceptsInsurance && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Stethoscope size={20} />
                    <span>Insurance Accepted</span>
                  </div>
                </>
              )}
            </div>
            <p className="text-white/80 max-w-2xl">
              {pharmacy.description}
            </p>
          </div>
        </div>
      </div>

      {/* Prescription Upload */}
      <div className="bg-card-background border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-white mb-4">
              Upload Prescription
            </h2>
            <p className="text-gray-400 mb-6">
              Upload your prescription for faster processing. We accept images and PDF files.
            </p>
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
                multiple
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary-blue transition-colors"
              >
                <Upload className="text-gray-400" size={24} />
                <span className="text-gray-400">Click to upload or drag and drop</span>
                <span className="text-gray-500 text-sm">JPG, JPEG, PNG, or PDF</span>
              </button>
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                    >
                      <span className="text-white truncate">{file.name}</span>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 bg-card-background border-b border-gray-800 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto">
            {pharmacy.categories.map((category) => (
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
        {pharmacy.categories.map((category) => (
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
                        ${product.price.toFixed(2)}
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