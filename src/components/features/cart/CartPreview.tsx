import { useRouter } from 'next/navigation'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function CartPreview() {
  const router = useRouter()
  const { state, getSubtotal, getItemCount } = useCart()

  if (state.items.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-card-background border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push('/cart')}
          className="w-full flex items-center justify-between py-3 px-6 bg-primary-blue hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-white text-primary-blue text-xs font-bold rounded-full">
                {getItemCount()}
              </span>
            </div>
            <span>View Cart</span>
          </div>
          <span className="font-bold">${getSubtotal().toFixed(2)}</span>
        </button>
      </div>
    </div>
  )
} 