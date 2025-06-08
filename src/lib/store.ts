// This is a mock data store for demo purposes
// In a real app, this would be replaced with a database

export interface User {
  id: number
  name: string
  email: string
  password: string // In a real app, this would be hashed
  role: 'admin' | 'store' | 'driver' | 'customer'
  isEmailVerified?: boolean
  createdAt: string
}

interface OTPRecord {
  otp: string
  expires: number
}

class Store {
  private users: User[] = []
  private otpStore: Record<string, OTPRecord> = {}

  // User methods
  addUser(user: User) {
    this.users.push(user)
  }

  findUserByEmail(email: string) {
    return this.users.find(u => u.email === email)
  }

  updateUser(email: string, updates: Partial<User>) {
    const index = this.users.findIndex(u => u.email === email)
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates }
      return this.users[index]
    }
    return null
  }

  // OTP methods
  storeOTP(email: string, otp: string) {
    this.otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    }
  }

  verifyOTP(email: string, otp: string) {
    const record = this.otpStore[email]
    if (!record) return false
    if (record.expires < Date.now()) {
      delete this.otpStore[email]
      return false
    }
    if (record.otp !== otp) return false
    delete this.otpStore[email]
    return true
  }

  // Initialize with some test data
  constructor() {
    this.addUser({
      id: 1,
      name: 'Test Customer',
      email: 'customer@test.com',
      password: 'password123',
      role: 'customer',
      isEmailVerified: true,
      createdAt: new Date().toISOString()
    })
  }
}

// Export a singleton instance
export const store = new Store() 