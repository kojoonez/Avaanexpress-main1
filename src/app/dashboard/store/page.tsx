'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/services/auth'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
}

interface StoreSettings {
  name: string
  address: string
  phone: string
  openTime: string
  closeTime: string
}

export default function StoreDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('orders')
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [showMenuForm, setShowMenuForm] = useState(false)
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'main'
  })
  const [settings, setSettings] = useState<StoreSettings>({
    name: '',
    address: '',
    phone: '',
    openTime: '09:00',
    closeTime: '22:00'
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load store data
    const user = authService.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    // Here you would typically fetch store data from API
    // For now, we'll just use the user data
    setSettings({
      name: user.name || '',
      address: '',
      phone: user.phone || '',
      openTime: '09:00',
      closeTime: '22:00'
    })
  }, [router])

  const handleLogout = async () => {
    try {
      await authService.logout()
      // Redirect to explore page after logout
      router.push('/discovery')
    } catch (error) {
      console.error('Logout failed:', error)
      // Still try to redirect even if there's an error
      router.push('/discovery')
    }
  }

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // Here you would make an API call to update the settings
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      alert('Settings updated successfully!')
    } catch (error) {
      console.error('Failed to update settings:', error)
      alert('Failed to update settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // Here you would make an API call to add the menu item
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      const newItem: MenuItem = {
        id: Date.now(),
        name: newMenuItem.name,
        description: newMenuItem.description,
        price: parseFloat(newMenuItem.price),
        category: newMenuItem.category
      }
      setMenuItems([...menuItems, newItem])
      setShowMenuForm(false)
      setNewMenuItem({ name: '', description: '', price: '', category: 'main' })
    } catch (error) {
      console.error('Failed to add menu item:', error)
      alert('Failed to add menu item. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Store Dashboard</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`${
                    activeTab === 'orders'
                      ? 'border-primary-blue text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`${
                    activeTab === 'menu'
                      ? 'border-primary-blue text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Menu
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`${
                    activeTab === 'settings'
                      ? 'border-primary-blue text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'orders' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Active Orders</h2>
            <div className="text-gray-500 text-center py-4">
              No active orders at the moment.
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Menu Items</h2>
              <button
                onClick={() => setShowMenuForm(true)}
                className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600"
              >
                Add New Item
              </button>
            </div>

            {menuItems.length === 0 ? (
              <div className="text-gray-500 text-center py-4">
                No menu items yet. Start by adding your first dish!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                        <p className="text-primary-blue font-medium mt-2">${item.price.toFixed(2)}</p>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mt-2">
                          {item.category}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setMenuItems(menuItems.filter(i => i.id !== item.id))
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showMenuForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add Menu Item</h3>
                  <form onSubmit={handleAddMenuItem} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Item Name</label>
                      <input
                        type="text"
                        value={newMenuItem.name}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={newMenuItem.description}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={newMenuItem.price}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={newMenuItem.category}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                      >
                        <option value="main">Main Course</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="dessert">Dessert</option>
                        <option value="beverage">Beverage</option>
                      </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowMenuForm(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                      >
                        {isSaving ? 'Adding...' : 'Add Item'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Store Settings</h2>
            <form onSubmit={handleSettingsUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500">Opening Time</label>
                    <input
                      type="time"
                      value={settings.openTime}
                      onChange={(e) => setSettings({ ...settings, openTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Closing Time</label>
                    <input
                      type="time"
                      value={settings.closeTime}
                      onChange={(e) => setSettings({ ...settings, closeTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
} 