import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Avaan Express',
    default: 'Avaan Express - Your one-stop shop for all your needs'
  },
  description: 'Order food, groceries, and medicines from your favorite local stores with fast delivery.',
  keywords: ['food delivery', 'grocery delivery', 'pharmacy delivery', 'local stores', 'express delivery'],
  authors: [{ name: 'Avaan Express' }],
  creator: 'Avaan Express',
  publisher: 'Avaan Express',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
} 