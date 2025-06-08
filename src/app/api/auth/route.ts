import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock database - replace with your actual database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { action, ...payload } = data

    switch (action) {
      case 'signup':
        // Check if user already exists
        if (users.find(u => u.email === payload.email)) {
          return NextResponse.json(
            { error: 'Email already registered' },
            { status: 400 }
          )
        }

        // Create new user
        const newUser = {
          id: Date.now().toString(),
          email: payload.email,
          name: payload.name,
          role: payload.role,
          phone: payload.phone,
          address: payload.address,
          createdAt: new Date().toISOString()
        }

        // In a real app, hash the password before storing
        users.push({ ...newUser, password: payload.password })

        // Generate token (in a real app, use proper JWT)
        const token = Buffer.from(newUser.id).toString('base64')

        return NextResponse.json({
          user: newUser,
          token
        })

      case 'login':
        const user = users.find(
          u => u.email === payload.email && u.password === payload.password
        )

        if (!user) {
          return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
          )
        }

        // Generate token
        const loginToken = Buffer.from(user.id).toString('base64')

        return NextResponse.json({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          },
          token: loginToken
        })

      case 'logout':
        // In a real app, invalidate the token
        return NextResponse.json({ success: true })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
} 