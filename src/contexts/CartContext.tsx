'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string | number
  name: string
  price: number
  quantity: number
  image?: string
  section: 'restaurant' | 'grocery' | 'pharmacy' | 'health-beauty'
  vendorId: string | number
  vendorName: string
  specialInstructions?: string
  options?: {
    name: string
    value: string
    price?: number
  }[]
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string | number) => void
  updateQuantity: (itemId: string | number, quantity: number) => void
  clearCart: () => void
  getSubtotal: () => number
  getTotal: () => number
  getDeliveryFee: () => number
  getTax: () => number
  itemCount: number
  currentVendor: { id: string | number; name: string; section: string } | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [currentVendor, setCurrentVendor] = useState<{ id: string | number; name: string; section: string } | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart.items || [])
        setCurrentVendor(parsedCart.currentVendor || null)
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        localStorage.removeItem('cart')
      }
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return
    try {
      localStorage.setItem('cart', JSON.stringify({ items, currentVendor }))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [items, currentVendor, isInitialized])

  const addItem = (item: CartItem) => {
    // Check if adding from a different vendor
    if (items.length > 0 && currentVendor && (item.vendorId !== currentVendor.id)) {
      if (!window.confirm('Adding items from a different vendor will clear your current cart. Continue?')) {
        return
      }
      setItems([])
    }

    // Set current vendor if cart is empty
    if (items.length === 0) {
      setCurrentVendor({
        id: item.vendorId,
        name: item.vendorName,
        section: item.section
      })
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prevItems, item]
    })
  }

  const removeItem = (itemId: string | number) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId)
      if (newItems.length === 0) {
        setCurrentVendor(null)
      }
      return newItems
    })
  }

  const updateQuantity = (itemId: string | number, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setCurrentVendor(null)
  }

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity
      const optionsTotal = item.options?.reduce((acc, opt) => acc + (opt.price || 0), 0) || 0
      return total + itemTotal + (optionsTotal * item.quantity)
    }, 0)
  }

  const getDeliveryFee = () => {
    // Base delivery fee - could be calculated based on distance, order size, etc.
    return items.length > 0 ? 4.99 : 0
  }

  const getTax = () => {
    return getSubtotal() * 0.08 // 8% tax rate
  }

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee() + getTax()
  }

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTotal,
    getDeliveryFee,
    getTax,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    currentVendor
  }

  if (!isInitialized) {
    return null // or a loading spinner if you prefer
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 