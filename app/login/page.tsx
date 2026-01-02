'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Mail, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserStorage } from '@/contexts/UserStorageContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { verifyUser } = useUserStorage()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const newErrors: Record<string, string> = {}

    // Validation
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Verify user credentials
    const verifiedUser = verifyUser(formData.email, formData.password)
    
    if (verifiedUser) {
      // User found and password matches
      const userData = {
        name: verifiedUser.name,
        email: verifiedUser.email,
        role: verifiedUser.role
      }
      login(userData)
      
      // Redirect based on role
      if (verifiedUser.role === 'admin') {
        router.push('/admin-portal/dashboard')
      } else if (verifiedUser.role === 'seller') {
        router.push('/seller')
      } else {
        router.push('/home')
      }
      setIsLoading(false)
      return
    }

    // User not found or wrong password
    setErrors({ email: 'Invalid email or password' })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-800 hover:text-purple-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
              Dean Homes
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-700" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.email ? 'border-red-300' : 'border-purple-100 focus:border-purple-800'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-purple-700" />
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.password ? 'border-red-300' : 'border-purple-100 focus:border-purple-800'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-purple-300 text-purple-800 focus:ring-purple-800" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-purple-800 hover:text-purple-900 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 gradient-purple text-white rounded-xl font-bold text-lg hover:shadow-purple-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-800 font-semibold hover:text-purple-900">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

