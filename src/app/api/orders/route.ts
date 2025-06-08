import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock database - replace with your actual database
const orders: any[] = [
  {
    id: '1',
    date: new Date('2024-03-15T18:30:00').toISOString(),
    status: 'delivered',
    total: 29.90,
    items: [
      {
        id: '101',
        name: 'Margherita Pizza',
        quantity: 1,
        price: 14.95,
        image: 'https://picsum.photos/200/200?random=1'
      },
      {
        id: '102',
        name: 'Garlic Bread',
        quantity: 2,
        price: 7.95,
        image: 'https://picsum.photos/200/200?random=2'
      }
    ],
    restaurant: {
      name: 'Pizza Palace',
      image: 'https://picsum.photos/200/200?random=3'
    },
    deliveryAddress: 'Mannerheimintie 123, 00100 Helsinki',
    paymentMethod: 'MobilePay'
  },
  {
    id: '2',
    date: new Date('2024-03-14T12:45:00').toISOString(),
    status: 'delivered',
    total: 42.80,
    items: [
      {
        id: '201',
        name: 'Sushi Set',
        quantity: 2,
        price: 21.40,
        image: 'https://picsum.photos/200/200?random=4'
      }
    ],
    restaurant: {
      name: 'Sushi Express',
      image: 'https://picsum.photos/200/200?random=5'
    },
    deliveryAddress: 'Mannerheimintie 123, 00100 Helsinki',
    paymentMethod: 'Klarna'
  },
  {
    id: '3',
    date: new Date('2024-03-13T19:15:00').toISOString(),
    status: 'processing',
    total: 18.90,
    items: [
      {
        id: '301',
        name: 'Chicken Burger',
        quantity: 1,
        price: 12.95,
        image: 'https://picsum.photos/200/200?random=6'
      },
      {
        id: '302',
        name: 'French Fries',
        quantity: 1,
        price: 5.95,
        image: 'https://picsum.photos/200/200?random=7'
      }
    ],
    restaurant: {
      name: 'Burger Joint',
      image: 'https://picsum.photos/200/200?random=8'
    },
    deliveryAddress: 'Mannerheimintie 123, 00100 Helsinki',
    paymentMethod: 'Apple Pay'
  }
]

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // In a real app, filter orders by user email
    // For demo, return all mock orders
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
} 