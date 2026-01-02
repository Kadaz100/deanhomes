'use client'

import Link from 'next/link'
import { Home, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function RoleBasedNavbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href={user?.role === 'admin' ? '/admin-portal/dashboard' : user?.role === 'buyer' ? '/home' : user?.role === 'seller' ? '/seller' : '/home'} className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
                Dean Homes
              </span>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && user?.role !== 'admin' ? (
              <>
                {/* Buyer Navigation */}
                {user?.role === 'buyer' && (
                  <>
                    <Link href="/home" className="text-gray-700 hover:text-purple-800 transition-colors font-medium">
                      Browse Properties
                    </Link>
                    <Link href="/home" className="text-gray-700 hover:text-purple-800 transition-colors font-medium">
                      Saved Properties
                    </Link>
                  </>
                )}

                {/* Seller Navigation */}
                {user?.role === 'seller' && (
                  <>
                    <Link href="/seller" className="text-gray-700 hover:text-purple-800 transition-colors font-medium">
                      My Properties
                    </Link>
                    <Link href="/home" className="text-gray-700 hover:text-purple-800 transition-colors font-medium">
                      Browse
                    </Link>
                  </>
                )}

                {/* User Info & Logout */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-700 hover:text-purple-800 transition-colors font-medium flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/home" className="text-gray-700 hover:text-purple-800 transition-colors font-medium">
                  Browse
                </Link>
                <Link href="/login" className="px-6 py-2 gradient-purple text-white rounded-lg font-semibold hover:shadow-purple transition-all duration-300">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

