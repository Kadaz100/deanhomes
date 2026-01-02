'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Mail, Key } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminPortalLogin() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accessKey: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // In production, this would be stored securely (environment variable, database, etc.)
  const ADMIN_ACCESS_KEY = 'DEANHOMES_ADMIN_2025' // Change this to your secret key
  const ADMIN_EMAILS = ['admin@deanhomes.com'] // Pre-approved admin emails

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const newErrors: Record<string, string> = {}

    // Validation
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (!formData.accessKey.trim()) newErrors.accessKey = 'Access key is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Verify access key
    if (formData.accessKey !== ADMIN_ACCESS_KEY) {
      setErrors({ accessKey: 'Invalid access key. Admin access is restricted.' })
      setIsLoading(false)
      return
    }

    // Verify admin email (optional - you can remove this check if you want)
    if (!ADMIN_EMAILS.includes(formData.email.toLowerCase())) {
      setErrors({ email: 'This email is not authorized for admin access.' })
      setIsLoading(false)
      return
    }

    // Create admin user and login
    const adminUser = {
      name: 'Administrator',
      email: formData.email,
      role: 'admin' as const
    }
    
    login(adminUser)
    router.push('/admin-portal/dashboard')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Shield className="w-8 h-8 text-purple-800" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-purple-200">Restricted Access Only</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-purple-200">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-purple-800 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-purple-900 mb-1">Private Admin Access</p>
                <p className="text-xs text-purple-700">
                  This portal is for authorized administrators only. You must have a valid access key to proceed.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-700" />
                Admin Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.email ? 'border-red-300' : 'border-purple-100 focus:border-purple-800'
                }`}
                placeholder="Enter admin email"
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
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Key className="w-4 h-4 mr-2 text-purple-700" />
                Access Key
              </label>
              <input
                type="password"
                value={formData.accessKey}
                onChange={(e) => setFormData({ ...formData, accessKey: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.accessKey ? 'border-red-300' : 'border-purple-100 focus:border-purple-800'
                }`}
                placeholder="Enter access key"
              />
              {errors.accessKey && <p className="text-red-500 text-sm mt-1">{errors.accessKey}</p>}
              <p className="text-xs text-gray-500 mt-2">
                Contact the system owner to obtain an access key
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 gradient-purple text-white rounded-xl font-bold text-lg hover:shadow-purple-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Access Admin Portal'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

