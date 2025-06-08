'use client'

import { useState } from 'react'
import { Plus, Image, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
}

export default function RestaurantDashboard() {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Mock products data - would come from API in production
  const products: Product[] = [
    {
      id: '1',
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh vegetables',
      price: 12.99,
      category: 'Burgers',
      image: '/burger.jpg',
      available: true,
    },
    // Add more products
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Restaurant Dashboard</h1>
        <Button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-2 bg-primary-blue hover:bg-secondary-blue text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Cards */}
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card-background rounded-lg overflow-hidden"
          >
            <div className="aspect-video relative bg-gray-800">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-600" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </div>
                <span className="text-lg font-semibold text-primary-blue">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.available}
                      className="sr-only peer"
                      onChange={() => {
                        // Toggle availability
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                  </label>
                  <span className="text-sm text-gray-400">
                    {product.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddProduct || selectedProduct) && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setShowAddProduct(false)
            setSelectedProduct(null)
          }}
          onSave={(data) => {
            // Save product data
            console.log(data)
          }}
        />
      )}
    </div>
  )
}

interface ProductModalProps {
  product?: Product | null
  onClose: () => void
  onSave: (data: Partial<Product>) => void
}

function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card-background rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          <form className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                  <div className="flex flex-col items-center">
                    <Image className="w-12 h-12 text-gray-600 mb-2" />
                    <p className="text-sm text-gray-400">
                      Drag and drop an image, or click to select
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="product-image"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('product-image')?.click()}
                      className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  defaultValue={product?.name}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  defaultValue={product?.description}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={product?.price}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Category
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue">
                    <option value="">Select Category</option>
                    <option value="burgers">Burgers</option>
                    <option value="pizzas">Pizzas</option>
                    <option value="drinks">Drinks</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="secondary"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 bg-primary-blue hover:bg-secondary-blue text-white rounded-lg"
              >
                {product ? 'Save Changes' : 'Add Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 