import { useState, useEffect } from 'react'
import { Bell, Package, AlertCircle } from 'lucide-react'
import wsService from '@/services/websocket'

interface Notification {
  id: string
  type: 'new_order' | 'status_update' | 'alert'
  message: string
  timestamp: Date
  orderId?: string
  read: boolean
}

export default function OrderNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Connect to WebSocket when component mounts
    wsService.connect()

    // Subscribe to notifications
    const handleNotification = (data: any) => {
      const newNotification: Notification = {
        id: data.id,
        type: data.notificationType,
        message: data.message,
        timestamp: new Date(data.timestamp),
        orderId: data.orderId,
        read: false
      }
      setNotifications(prev => [newNotification, ...prev])
      setUnreadCount(prev => prev + 1)
    }

    wsService.subscribe('notification', handleNotification)

    // Cleanup subscription when component unmounts
    return () => {
      wsService.unsubscribe('notification', handleNotification)
    }
  }, [])

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))

    // Send read status to server
    wsService.send('notification', {
      type: 'mark_read',
      notificationId
    })
  }

  const markAllAsRead = () => {
    const unreadIds = notifications
      .filter(n => !n.read)
      .map(n => n.id)

    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
    setUnreadCount(0)

    // Send read status to server
    wsService.send('notification', {
      type: 'mark_all_read',
      notificationIds: unreadIds
    })
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new_order':
        return <Package className="w-5 h-5 text-primary-blue" />
      case 'status_update':
        return <Bell className="w-5 h-5 text-yellow-500" />
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-card-background rounded-lg border border-gray-800 shadow-lg z-50">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary-blue hover:text-blue-400"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-800 last:border-0 ${
                    notification.read ? 'opacity-60' : ''
                  } cursor-pointer hover:bg-gray-800/50`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      {notification.orderId && (
                        <p className="text-xs text-gray-400 mt-1">
                          Order #{notification.orderId}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary-blue rounded-full" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
} 