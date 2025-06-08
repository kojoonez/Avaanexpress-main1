interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSummaryProps {
  items: CartItem[];
  deliveryFee: number;
  showImages?: boolean;
}

export default function CartSummary({ items, deliveryFee, showImages = true }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        
        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="py-4 flex items-center">
              {showImages && item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-md mr-4"
                />
              )}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                €{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery Fee</span>
            <span>€{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 