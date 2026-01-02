'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Home, 
  Clock, 
  MessageSquare, 
  Upload, 
  MapPin, 
  DollarSign, 
  FileText,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Menu,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useProperties } from '@/contexts/PropertyContext'

export default function SellerDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { addProperty } = useProperties()
  const [activeTab, setActiveTab] = useState('add-listing')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleLogout = () => {
    logout()
    router.push('/')
  }
  const [formData, setFormData] = useState({
    price: '',
    location: '',
    propertyType: '',
    description: '',
    contact: '',
    email: ''
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const imageUrls: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          imageUrls.push(reader.result as string)
          if (imageUrls.length === files.length) {
            setUploadedImages(prev => [...prev, ...imageUrls])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('Please log in to submit a property')
      return
    }

    // Validation
    if (!formData.price || !formData.location || !formData.propertyType || !formData.description) {
      alert('Please fill in all required fields (Price, Location, Property Type, Description)')
      return
    }

    // Validate minimum 4 images
    if (uploadedImages.length < 4) {
      alert('Please upload at least 4 images of the property')
      return
    }

    const newProperty = {
      title: `${formData.propertyType} in ${formData.location}`,
      price: formData.price,
      location: formData.location,
      propertyType: formData.propertyType,
      description: formData.description,
      contact: formData.contact || '',
      email: formData.email || '',
      images: uploadedImages,
      sellerName: user.name
    }
    
    console.log('Submitting property:', newProperty)
    addProperty(newProperty)
    console.log('Property added to context')

    // Reset form
    setFormData({
      price: '',
      location: '',
      propertyType: '',
      description: '',
      contact: '',
      email: ''
    })
    setUploadedImages([])
    
    // Show success message and switch to pending tab
    alert('Property submitted successfully! Waiting for admin approval.')
    setActiveTab('pending')
  }

  const menuItems = [
    { id: 'add-listing', label: 'Add Listing', icon: Plus },
    { id: 'my-properties', label: 'My Properties', icon: Home },
    { id: 'pending', label: 'Pending Approval', icon: Clock },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ]

  const { properties: allProperties } = useProperties()
  const userProperties = allProperties.filter(p => p.sellerName === user?.name)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Approved</span>
          </span>
        )
      case 'pending':
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>Pending Review</span>
          </span>
        )
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center space-x-1">
            <XCircle className="w-4 h-4" />
            <span>Rejected</span>
          </span>
        )
    }
  }

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 bg-white shadow-lg min-h-screen fixed left-0 top-0 z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
          <div className="p-6 border-b border-purple-100">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
                Dean Homes
              </span>
            </div>
            <p className="text-sm text-gray-600">Seller Dashboard</p>
          </div>

          <nav className="p-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-purple-50 text-purple-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Link
              href="/home"
              className="block w-full text-center px-4 py-2 text-gray-600 hover:text-purple-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
          {activeTab === 'add-listing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Add New Property Listing</h1>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-purple-500" />
                        Price (₦)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter price in Naira (e.g., 500000 or 500k)"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Home className="w-4 h-4 mr-2 text-purple-500" />
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select property type</option>
                        <option value="land">Land</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-purple-500" />
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter contact number"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-purple-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-purple-500" />
                      Description
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Enter property description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Upload className="w-4 h-4 mr-2 text-purple-500" />
                      Upload Images
                    </label>
                    <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500 mb-2">PNG, JPG, GIF up to 10MB</p>
                        <p className="text-sm font-semibold text-purple-700">
                          Minimum 4 images required ({uploadedImages.length}/4 uploaded)
                        </p>
                      </label>
                      {uploadedImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {uploadedImages.map((img, idx) => (
                            <div key={idx} className="relative">
                              <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-20 object-cover rounded-lg" />
                              <button
                                type="button"
                                onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== idx))}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 gradient-purple text-white rounded-xl font-bold text-lg hover:shadow-purple-lg transition-all duration-300"
                  >
                    Submit for Approval
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'my-properties' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">My Properties</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-purple-lg transition-all duration-300">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                      {property.images && property.images.length > 0 ? (
                        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                      ) : (
                        <Home className="w-16 h-16 text-purple-400" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-2xl font-bold text-purple-800 mb-4">{property.price}</p>
                    {getStatusBadge(property.status)}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Pending Approvals</h1>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="space-y-4">
                  {userProperties.filter(p => p.status === 'pending').map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border-2 border-purple-100 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                          <Home className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{property.title}</h3>
                          <p className="text-purple-800 font-semibold">{property.price}</p>
                        </div>
                      </div>
                      {getStatusBadge(property.status)}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Messages</h1>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                  <p className="text-gray-600">No messages yet</p>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
      </div>
    </ProtectedRoute>
  )
}

