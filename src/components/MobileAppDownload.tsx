'use client'

import { useState } from 'react'
import AppStoreBadge from './AppStoreBadge'

export default function MobileAppDownload() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-6 w-72">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Download Our Apps</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Customer App</h4>
              <div className="flex space-x-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.avaan.customer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <AppStoreBadge store="google" />
                </a>
                <a
                  href="https://apps.apple.com/app/avaan-customer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <AppStoreBadge store="apple" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-gray-800">Driver App</h4>
              <a
                href="https://play.google.com/store/apps/details?id=com.avaan.driver"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <AppStoreBadge store="google" />
              </a>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
} 