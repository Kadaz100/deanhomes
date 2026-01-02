'use client'

import { useState, useEffect } from 'react'
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
  LogOut,
  Shield
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useProperties, Property } from '@/contexts/PropertyContext'
import { useUserStorage } from '@/contexts/UserStorageContext'

export default function AdminPortalDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { properties, updatePropertyStatus, getPendingProperties, loadPropertiesFromLocalStorage } = useProperties()
  const { storedUsers } = useUserStorage()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [forceRefresh, setForceRefresh] = useState(0)
  
  // Get pending properties - this will update when properties change
  const pendingProperties = properties.filter(p => p.status === 'pending')
  const approvedProperties = properties.filter(p => p.status === 'approved')
  const totalListings = properties.length
  const activeUsers = storedUsers.filter(u => u.role !== 'admin').length

  // Debug: Log properties to console
  useEffect(() => {
    console.log('=== ADMIN PORTAL DEBUG ===')
    console.log('All properties:', properties)
    console.log('Pending properties:', pendingProperties)
    console.log('Pending count:', pendingProperties.length)
    console.log('Properties array length:', properties.length)
  }, [properties, pendingProperties])

  // Listen for storage changes (when properties are added from another tab/page)
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed! Properties should update via polling...')
      // Properties will update via the polling mechanism in PropertyContext
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Manual refresh button handler
  const handleRefresh = () => {
    console.log('Manual refresh triggered')
    loadPropertiesFromLocalStorage()
    setForceRefresh(prev => prev + 1)
  }

  const stats = [
    { label: 'Total Listings', value: totalListings.toLocaleString(), icon: Home, bgColor: 'bg-purple-100', iconColor: 'text-purple-800' },
    { label: 'Pending Approvals', value: pendingProperties.length.toString(), icon: Clock, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { label: 'Approved Properties', value: approvedProperties.length.toString(), icon: CheckCircle2, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Active Users', value: activeUsers.toLocaleString(), icon: Users, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  ]

  const handleApprove = (id: number) => {
    updatePropertyStatus(id, 'approved')
  }

  const handleReject = (id: number) => {
    updatePropertyStatus(id, 'rejected')
  }

  const handleLogout = () => {
    logout()
    router.push('/admin-portal/login')
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
                Admin Portal
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
          <div className="p-6 border-b border-purple-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Seller Submissions</h2>
              <p className="text-gray-600 mt-1">Review and manage property listings</p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-semibold hover:bg-purple-200 transition-colors flex items-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Refresh</span>
            </button>
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
                {pendingProperties.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">No pending properties to review</p>
                      <p className="text-gray-400 text-sm mt-2">Properties submitted by sellers will appear here</p>
                    </td>
                  </tr>
                ) : (
                  pendingProperties.map((property) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-purple-50 transition-colors"
                    >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {property.images && property.images.length > 0 ? (
                            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                          ) : (
                            <Home className="w-8 h-8 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{property.propertyType}</div>
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
                  ))
                )}
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
              <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                {selectedProperty.images && selectedProperty.images.length > 0 ? (
                  <>
                    <img src={selectedProperty.images[0]} alt={selectedProperty.title} className="w-full h-full object-cover" />
                    {selectedProperty.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedProperty.images.length} images
                      </div>
                    )}
                  </>
                ) : (
                  <Home className="w-24 h-24 text-purple-400" />
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Property Type</h4>
                  <p className="text-gray-900 font-medium">{selectedProperty.propertyType}</p>
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

