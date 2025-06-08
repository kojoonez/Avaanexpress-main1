'use client'

import { useState, useEffect } from 'react'
import { Send, X } from 'lucide-react'

interface ChatPanelProps {
  orderId: string
  onClose: () => void
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: number // Changed to store Unix timestamp
}

// Sample messages with Unix timestamps
const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'Admin',
    content: 'Hi, how can I help you?',
    timestamp: 1683720600000 // Example timestamp
  },
  {
    id: '2',
    sender: 'Rider',
    content: 'I need to unassign this order due to vehicle issues.',
    timestamp: 1683720660000 // Example timestamp
  }
]

export function ChatPanel({ orderId, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatTimestamp = (timestamp: number) => {
    if (!mounted) return '' // Return empty string during SSR
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: 'Admin',
      content: newMessage,
      timestamp: Date.now()
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Chat - Order {orderId}</h3>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.sender === 'Admin' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-400">{message.sender}</span>
              {mounted && (
                <span className="text-xs text-gray-500">
                  {formatTimestamp(message.timestamp)}
                </span>
              )}
            </div>
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === 'Admin'
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 min-h-[44px] max-h-[120px] px-4 py-2 bg-gray-700 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary-blue"
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="p-2 bg-primary-blue text-white rounded-md hover:bg-secondary-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
} 