'use client'

interface AppStoreBadgeProps {
  store: 'google' | 'apple'
  className?: string
}

export default function AppStoreBadge({ store, className = '' }: AppStoreBadgeProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-2 flex items-center justify-center ${className}`}>
      {store === 'google' ? (
        <div className="text-white text-sm font-medium">Get it on Google Play</div>
      ) : (
        <div className="text-white text-sm font-medium">Download on the App Store</div>
      )}
    </div>
  )
} 