import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { store } from '@/lib/store'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = store.findUserByEmail(email)

    return NextResponse.json({
      success: true,
      exists: Boolean(user),
      message: user ? 'User found' : 'User not found'
    })
  } catch (error) {
    console.error('Check user error:', error)
    return NextResponse.json(
      { error: 'Failed to check user' },
      { status: 500 }
    )
  }
} 