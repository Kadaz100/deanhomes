'use client'

import Link from 'next/link'
import { Home, User, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
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
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
                Dean Homes
              </span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-gray-700 hover:text-purple-800 transition-colors font-medium">
              Home
            </Link>
            <Link href="/seller" className="text-gray-700 hover:text-purple-800 transition-colors font-medium">
              Seller Dashboard
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-purple-800 transition-colors font-medium">
              Admin Panel
            </Link>
            <button className="px-6 py-2 gradient-purple text-white rounded-lg font-semibold hover:shadow-purple transition-all duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

