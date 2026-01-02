'use client'

import { useState } from 'react'
import RoleBasedNavbar from '@/components/RoleBasedNavbar'
import SearchBar from '@/components/SearchBar'
import PropertyCard from '@/components/PropertyCard'
import { motion } from 'framer-motion'
import { Home as HomeIcon, Building2, Map } from 'lucide-react'
import { useProperties } from '@/contexts/PropertyContext'

export default function HomePage() {
  const { getApprovedProperties } = useProperties()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  let approvedProperties = getApprovedProperties()
  
  // Filter by category
  if (selectedCategory) {
    if (selectedCategory === 'buy-property') {
      approvedProperties = approvedProperties.filter(p => p.propertyType.toLowerCase() === 'house' || p.propertyType.toLowerCase() === 'apartment')
    } else if (selectedCategory === 'rent-apartment') {
      approvedProperties = approvedProperties.filter(p => p.propertyType.toLowerCase() === 'apartment')
    } else if (selectedCategory === 'buy-land') {
      approvedProperties = approvedProperties.filter(p => p.propertyType.toLowerCase() === 'land')
    }
  }
  
  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    approvedProperties = approvedProperties.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.propertyType.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    )
  }
  
  // Convert to format expected by PropertyCard
  const properties = approvedProperties.map(prop => ({
    image: prop.images[0] || '/property1.jpg',
    title: prop.title,
    location: prop.location,
    price: prop.price,
    type: prop.propertyType,
    propertyId: prop.id
  }))
  return (
    <div className="min-h-screen bg-white">
      <RoleBasedNavbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 gradient-purple-light opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Find, Buy, Sell, or Rent<br />
              <span className="bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
                Your Perfect Home
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium properties with our advanced search and seamless experience
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03, y: -3 }}
              onClick={() => setSelectedCategory(selectedCategory === 'buy-property' ? null : 'buy-property')}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-purple-lg transition-all duration-300 cursor-pointer border-2 ${selectedCategory === 'buy-property' ? 'border-purple-500' : 'border-transparent hover:border-purple-200'}`}
            >
              <div className="w-12 h-12 gradient-purple rounded-lg flex items-center justify-center mb-4">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Buy Property</h3>
              <p className="text-sm text-gray-600">Explore our curated selection of premium properties</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, y: -3 }}
              onClick={() => setSelectedCategory(selectedCategory === 'rent-apartment' ? null : 'rent-apartment')}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-purple-lg transition-all duration-300 cursor-pointer border-2 ${selectedCategory === 'rent-apartment' ? 'border-purple-500' : 'border-transparent hover:border-purple-200'}`}
            >
              <div className="w-12 h-12 gradient-purple rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rent Apartment</h3>
              <p className="text-sm text-gray-600">Find your perfect rental home in prime locations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03, y: -3 }}
              onClick={() => setSelectedCategory(selectedCategory === 'buy-land' ? null : 'buy-land')}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-purple-lg transition-all duration-300 cursor-pointer border-2 ${selectedCategory === 'buy-land' ? 'border-purple-500' : 'border-transparent hover:border-purple-200'}`}
            >
              <div className="w-12 h-12 gradient-purple rounded-lg flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Buy Land</h3>
              <p className="text-sm text-gray-600">Invest in prime land for your future development</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-gray-600 text-lg">Discover our handpicked selection of premium properties</p>
        </motion.div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            {(selectedCategory || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setSearchQuery('')
                }}
                className="mt-4 px-6 py-2 gradient-purple text-white rounded-lg font-semibold hover:shadow-purple transition-all duration-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-purple-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
              Dean Homes
            </span>
          </div>
          <p className="text-center text-gray-600">© 2024 Dean Homes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

