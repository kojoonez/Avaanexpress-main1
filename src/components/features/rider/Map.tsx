import dynamic from 'next/dynamic'

// Import the client-side map component with no SSR
const ClientMap = dynamic(() => import('./ClientMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-900 animate-pulse flex items-center justify-center">
      <span className="text-gray-600">Loading map...</span>
    </div>
  ),
})

export default function Map() {
  return <ClientMap />
} 