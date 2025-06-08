import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock database - replace with your actual database
const customerProfiles: any[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if profile already exists
    if (customerProfiles.find(p => p.email === data.email)) {
      return NextResponse.json(
        { error: 'Profile already exists' },
        { status: 400 }
      )
    }

    // Create new profile
    const newProfile = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    customerProfiles.push(newProfile)

    return NextResponse.json({
      success: true,
      profile: newProfile
    })
  } catch (error) {
    console.error('Profile creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would fetch the profile from your database
    // For demo purposes, we'll return a mock profile
    
    return NextResponse.json({ 
      success: true,
      data: {
        name: 'Demo User',
        email: 'customer@avaan.com',
        phone: '+358123456789'
      }
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const profile = await request.json()
    
    // In a real app, you would update the profile in your database
    // For demo purposes, we'll just return success
    
    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: profile 
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
} 