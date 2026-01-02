'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Lock,
  User,
  Building2
} from 'lucide-react'
import { useProperties, Property } from '@/contexts/PropertyContext'
import { usePayment } from '@/contexts/PaymentContext'
import PaymentModal from '@/components/PaymentModal'
import RoleBasedNavbar from '@/components/RoleBasedNavbar'

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { properties } = useProperties()
  const { hasPaidForProperty, markPropertyAsPaid } = usePayment()
  const [property, setProperty] = useState<Property | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    const propertyId = parseInt(params.id as string)
    const foundProperty = properties.find(p => p.id === propertyId)
    setProperty(foundProperty || null)
  }, [params.id, properties])

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <RoleBasedNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Property not found</p>
            <button
              onClick={() => router.push('/home')}
              className="px-6 py-2 gradient-purple text-white rounded-lg font-semibold hover:shadow-purple transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const hasPaid = hasPaidForProperty(property.id)
  const propertyTypeLabel = property.propertyType.toLowerCase() === 'apartment' ? 'Agent' : 'Owner'

  const handleGetContact = () => {
    if (hasPaid) {
      // Already paid, show contact
      setShowContact(true)
    } else {
      // Require payment for all property types
      setShowPaymentModal(true)
    }
  }

  const handlePaymentSuccess = () => {
    markPropertyAsPaid(property.id)
    setShowContact(true)
    setShowPaymentModal(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <RoleBasedNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </button>

        {/* Image Gallery */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <div className="relative h-[500px] bg-gradient-to-br from-purple-100 to-purple-200">
            {property.images && property.images.length > 0 ? (
              <>
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-purple-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-purple-800" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {property.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 className="w-24 h-24 text-purple-400" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-4">
                  {property.propertyType}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2 text-purple-700" />
                  <span className="text-lg">{property.location}</span>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-purple-800">
                    {property.price.startsWith('₦') ? property.price : property.price.startsWith('$') ? `₦${property.price.replace('$', '').trim()}` : `₦${property.price}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              {showContact ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      {property.propertyType.toLowerCase() === 'apartment' ? (
                        <Building2 className="w-6 h-6 text-green-700" />
                      ) : (
                        <User className="w-6 h-6 text-green-700" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {propertyTypeLabel} Details
                        </p>
                        <p className="text-sm text-gray-600">{property.sellerName}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-green-700" />
                        <span className="text-gray-900 font-medium">{property.contact || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-green-700" />
                        <span className="text-gray-900">{property.email || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-700 mb-2">
                      To view {propertyTypeLabel.toLowerCase()} contact details for this {property.propertyType.toLowerCase()}, please make a payment of ₦2,000.
                    </p>
                  </div>
                  <button
                    onClick={handleGetContact}
                    className="w-full py-4 gradient-purple text-white rounded-xl font-bold text-lg hover:shadow-purple-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {hasPaid ? (
                      <>
                        <User className="w-5 h-5" />
                        <span>View {propertyTypeLabel} Contact</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        <span>Get {propertyTypeLabel} Contact - ₦2,000</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          propertyId={property.id}
          propertyTitle={property.title}
          amount={2000}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}

