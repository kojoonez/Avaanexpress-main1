import { useEffect } from 'react'
import Image from 'next/image'
import { Star, Clock, Bike, X } from 'lucide-react'

interface Restaurant {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  priceRange: string;
  description: string;
  tags: string[];
}

interface RestaurantModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export default function RestaurantModal({ restaurant, onClose }: RestaurantModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!restaurant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-card-background rounded-lg overflow-hidden shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-80">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {restaurant.name}
            </h2>
            <div className="flex items-center gap-4 text-white/90">
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Rating and Delivery Info */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500" size={20} />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={20} />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bike size={20} />
              <span>{restaurant.deliveryFee}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">
            {restaurant.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Order Button */}
          <button
            onClick={() => window.location.href = `/restaurants/${restaurant.id}`}
            className="mt-6 w-full py-3 bg-primary-blue hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
} 