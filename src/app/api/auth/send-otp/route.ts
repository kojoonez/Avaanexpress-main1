import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { store } from '@/lib/store'

// In a real app, this would be in a database
const otpStore: Record<string, { otp: string; expires: number }> = {}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Generate OTP
    const otp = generateOTP()
    
    // Store OTP
    store.storeOTP(email, otp)

    // In a real app, send email with OTP
    console.log(`OTP for ${email}: ${otp}`) // For development only

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully'
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
} 