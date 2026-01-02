'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, ArrowLeft, Mail, Lock, UserCircle, Phone } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserStorage } from '@/contexts/UserStorageContext'

export default function SignupPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { saveUser } = useUserStorage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' as 'buyer' | 'seller'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Store user data with password
    saveUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    })

    // Login user
    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role
    }
    login(userData)

    // Redirect based on role
    if (formData.role === 'seller') {
      router.push('/seller')
    } else {
      router.push('/home')
    }
  }

  const roles = [
    {
      id: 'buyer' as const,
      label: 'Buyer/Renter',
      description: 'Browse and search properties',
      icon: Home,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'seller' as const,
      label: 'Seller',
      description: 'List and manage your properties',
      icon: Building2,
      color: 'from-purple-600 to-purple-700'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
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
          <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
          <p className="text-gray-600 mt-2">Join us to find or list your perfect property</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Role Selection */}
            <div className="md:w-1/3 bg-gradient-to-br from-purple-800 to-purple-900 p-8 text-white">
              <h3 className="text-xl font-bold mb-6">I want to...</h3>
              <div className="space-y-4">
                {roles.map((role) => {
                  const Icon = role.icon
                  return (
                    <button
                      key={role.id}
                      onClick={() => setFormData({ ...formData, role: role.id })}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                        formData.role === role.id
                          ? 'bg-white text-purple-900 shadow-lg'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className={`w-5 h-5 ${formData.role === role.id ? 'text-purple-900' : 'text-white'}`} />
                        <span className="font-semibold">{role.label}</span>
                      </div>
                      <p className={`text-sm ${formData.role === role.id ? 'text-purple-700' : 'text-white/80'}`}>
                        {role.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Signup Form */}
            <div className="md:w-2/3 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <UserCircle className="w-4 h-4 mr-2 text-purple-700" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.name ? 'border-red-300' : 'border-purple-100 focus:border-purple-800'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

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
                    <Phone className="w-4 h-4 mr-2 text-purple-700" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-300' : 'border-purple-100 focus:border-purple-800'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
                    placeholder="Create a password"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-purple-700" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.confirmPassword ? 'border-red-300' : 'border-purple-100 focus:border-purple-800'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 gradient-purple text-white rounded-xl font-bold text-lg hover:shadow-purple-lg transition-all duration-300"
                >
                  Create Account
                </button>

                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-purple-800 font-semibold hover:text-purple-900">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

