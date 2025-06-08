import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import authService from '@/services/auth'

export default function AdminDashboardNav() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard/admin" className="text-xl font-bold">
            Admin Dashboard
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/dashboard/admin/stores" className="hover:text-primary-blue">
              Manage Stores
            </Link>
            <Link href="/dashboard/admin/drivers" className="hover:text-primary-blue">
              Manage Drivers
            </Link>
            <Link href="/dashboard/admin/customers" className="hover:text-primary-blue">
              Customers
            </Link>
            <Link href="/dashboard/admin/orders" className="hover:text-primary-blue">
              Orders
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative group px-4 py-2 hover:text-primary-blue"
          >
            Apps
            <div className={`absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
              <div className="py-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.avaan.driver"
                  target="_blank"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Driver App (Android)
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.avaan.customer"
                  target="_blank"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Customer App (Android)
                </a>
                <a
                  href="https://apps.apple.com/app/avaan-customer"
                  target="_blank"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Customer App (iOS)
                </a>
              </div>
            </div>
          </button>
          
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
} 