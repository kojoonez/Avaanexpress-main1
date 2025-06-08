import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { store } from '@/lib/store'

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json()

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    if (store.findUserByEmail(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email,
      name,
      password, // In a real app, this would be hashed
      role: 'customer' as const,
      isEmailVerified: false,
      createdAt: new Date().toISOString()
    }

    store.addUser(newUser)

    // In a real app, we would not return the password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
} 