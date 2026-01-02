'use client'

import { Search, MapPin, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSearch = () => {
    // Combine all search criteria
    const query = `${location} ${propertyType} ${priceRange}`.trim()
    if (onSearch) {
      onSearch(query)
    }
  }

  // Also trigger search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-purple-lg p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-700" />
            <input
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-lg focus:border-purple-800 focus:outline-none transition-colors text-gray-700"
            />
          </div>
          
          <div className="flex-1 relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-700" />
            <select 
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-lg focus:border-purple-800 focus:outline-none transition-colors text-gray-700 appearance-none bg-white"
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="land">Land</option>
            </select>
          </div>
          
          <div className="flex-1 relative">
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border-2 border-purple-100 rounded-lg focus:border-purple-800 focus:outline-none transition-colors text-gray-700 appearance-none bg-white"
            >
              <option value="">Price Range</option>
              <option value="0-500000">₦0 - ₦500,000</option>
              <option value="500000-2000000">₦500,000 - ₦2,000,000</option>
              <option value="2000000-5000000">₦2,000,000 - ₦5,000,000</option>
              <option value="5000000+">₦5,000,000+</option>
            </select>
          </div>
          
          <button
            onClick={handleSearch}
            className="px-6 py-3 gradient-purple text-white rounded-lg font-semibold hover:shadow-purple transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

