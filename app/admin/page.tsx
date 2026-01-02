'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  Clock,
  CheckCircle2,
  Users,
  Eye,
  Check,
  X,
  TrendingUp,
  DollarSign,
  MapPin,
  User,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

interface Property {
  id: number
  image: string
  sellerName: string
  price: string
  location: string
  status: 'pending' | 'approved' | 'rejected'
  type: string
  description: string
}

export default function AdminPanel() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      image: '/prop1.jpg',
      sellerName: 'John Smith',
      price: '$450,000',
      location: 'Downtown District',
      status: 'pending',
      type: 'Apartment',
      description: 'Modern luxury apartment with stunning city views, 3 bedrooms, 2 bathrooms, fully furnished.'
    },
    {
      id: 2,
      image: '/prop2.jpg',
      sellerName: 'Sarah Johnson',
      price: '$680,000',
      location: 'Suburban Area',
      status: 'pending',
      type: 'House',
      description: 'Spacious family home with large backyard, 4 bedrooms, 3 bathrooms, recently renovated.'
    },
    {
      id: 3,
      image: '/prop3.jpg',
      sellerName: 'Michael Brown',
      price: '$320,000',
      location: 'City Outskirts',
      status: 'approved',
      type: 'Land',
      description: 'Prime development land, 5 acres, zoned for residential, great investment opportunity.'
    },
    {
      id: 4,
      image: '/prop4.jpg',
      sellerName: 'Emily Davis',
      price: '$280,000',
      location: 'City Center',
      status: 'pending',
      type: 'Apartment',
      description: 'Cozy studio apartment in the heart of the city, perfect for young professionals.'
    },
  ])

  const stats = [
    { label: 'Total Listings', value: '1,247', icon: Home, bgColor: 'bg-purple-100', iconColor: 'text-purple-800' },
    { label: 'Pending Approvals', value: '23', icon: Clock, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { label: 'Approved Properties', value: '1,189', icon: CheckCircle2, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Active Users', value: '3,456', icon: Users, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  ]

  const handleApprove = (id: number) => {
    setProperties(properties.map(p => p.id === id ? { ...p, status: 'approved' as const } : p))
  }

  const handleReject = (id: number) => {
    setProperties(properties.map(p => p.id === id ? { ...p, status: 'rejected' as const } : p))
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Approved</span>
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">Pending</span>
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Rejected</span>
    }
  }

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
                Dean Homes Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-purple-800 transition-colors font-medium flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-purple-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900">Seller Submissions</h2>
            <p className="text-gray-600 mt-1">Review and manage property listings</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.map((property) => (
                  <motion.tr
                    key={property.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-purple-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Home className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{property.type}</div>
                          <button
                            onClick={() => setSelectedProperty(property)}
                            className="text-purple-800 hover:text-purple-900 text-sm font-medium flex items-center space-x-1 mt-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">{property.sellerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-purple-500" />
                        <span className="font-semibold text-gray-900">{property.price}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-700">{property.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(property.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApprove(property.id)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(property.id)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Property Preview Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProperty(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-purple-100 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Property Details</h3>
              <button
                onClick={() => setSelectedProperty(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-6 flex items-center justify-center">
                <Home className="w-24 h-24 text-purple-400" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Property Type</h4>
                  <p className="text-gray-900 font-medium">{selectedProperty.type}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedProperty.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Price</h4>
                    <p className="text-2xl font-bold text-purple-800">{selectedProperty.price}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Location</h4>
                    <p className="text-gray-900">{selectedProperty.location}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Seller</h4>
                  <p className="text-gray-900">{selectedProperty.sellerName}</p>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => {
                      handleApprove(selectedProperty.id)
                      setSelectedProperty(null)
                    }}
                    className="flex-1 px-6 py-3 gradient-purple text-white rounded-xl font-semibold hover:shadow-purple-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Approve Property</span>
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedProperty.id)
                      setSelectedProperty(null)
                    }}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Reject Property</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      </div>
    </ProtectedRoute>
  )
}

