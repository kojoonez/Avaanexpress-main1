import { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus } from 'lucide-react'

interface MenuItemOption {
  name: string;
  choices: {
    name: string;
    price: number;
  }[];
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  options?: MenuItemOption[];
}

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, selectedOptions: Record<string, string>) => void;
}

export default function MenuItemModal({ item, onClose, onAddToCart }: MenuItemModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  if (!item) return null;

  const handleOptionSelect = (optionName: string, choiceName: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choiceName
    }))
  }

  const calculateTotalPrice = () => {
    let total = item.price * quantity

    if (item.options) {
      item.options.forEach(option => {
        const selectedChoice = option.choices.find(
          choice => choice.name === selectedOptions[option.name]
        )
        if (selectedChoice) {
          total += selectedChoice.price * quantity
        }
      })
    }

    return total
  }

  const handleAddToCart = () => {
    onAddToCart(item, quantity, selectedOptions)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card-background rounded-lg overflow-hidden shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image */}
        {item.image && (
          <div className="relative h-64">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{item.name}</h2>
          <p className="text-gray-400 mb-6">{item.description}</p>

          {/* Options */}
          {item.options && (
            <div className="space-y-6 mb-6">
              {item.options.map((option) => (
                <div key={option.name}>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">
                    {option.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {option.choices.map((choice) => (
                      <button
                        key={choice.name}
                        onClick={() => handleOptionSelect(option.name, choice.name)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          selectedOptions[option.name] === choice.name
                            ? 'border-primary-blue bg-primary-blue/10 text-white'
                            : 'border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{choice.name}</span>
                          {choice.price > 0 && (
                            <span>+${choice.price.toFixed(2)}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-gray-300">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Total and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Total</span>
              <div className="text-xl font-bold text-white">
                ${calculateTotalPrice().toFixed(2)}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 bg-primary-blue hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 