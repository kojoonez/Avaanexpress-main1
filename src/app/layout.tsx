import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import MobileAppDownload from '@/components/MobileAppDownload'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Avaan Express | Modern Delivery Platform',
  description: 'Avaan Express - Your trusted partner for fast, reliable, and efficient delivery services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-white`} suppressHydrationWarning>
        <AuthProvider>
          {children}
          <MobileAppDownload />
        </AuthProvider>
      </body>
    </html>
  )
}