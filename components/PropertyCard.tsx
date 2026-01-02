'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

interface PropertyCardProps {
  image: string
  title: string
  location: string
  price: string
  type: string
  propertyId?: number
}

export default function PropertyCard({ image, title, location, price, type, propertyId }: PropertyCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    if (propertyId) {
      router.push(`/property/${propertyId}`)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg hover:shadow-purple-lg transition-all duration-300 overflow-hidden group cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          {image && image.startsWith('data:image') ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <span className="text-purple-400 text-4xl font-bold">{type === 'Apartment' ? '🏢' : type === 'House' ? '🏠' : '🏞️'}</span>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-sm font-semibold text-purple-800">{type}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <button 
              onClick={handleViewDetails}
              className="bg-white text-purple-800 px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2 text-purple-700" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-purple-800">
              {price.startsWith('₦') ? price : price.startsWith('$') ? `₦${price.replace('$', '').trim()}` : `₦${price}`}
            </span>
          </div>
          
          <button
            onClick={handleViewDetails}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-purple-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Get More Info</span>
          </button>
        </div>
      </motion.div>
    </>
  )
}
