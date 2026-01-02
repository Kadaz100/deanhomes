'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Property {
  id: number
  title: string
  price: string
  location: string
  propertyType: string
  description: string
  contact: string
  email: string
  images: string[]
  sellerName: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

interface PropertyContextType {
  properties: Property[]
  addProperty: (property: Omit<Property, 'id' | 'status' | 'createdAt'>) => void
  updatePropertyStatus: (id: number, status: 'pending' | 'approved' | 'rejected') => void
  getApprovedProperties: () => Property[]
  getPendingProperties: () => Property[]
  loadPropertiesFromLocalStorage: () => void
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    // Load properties from localStorage on mount
    const loadProperties = () => {
      const stored = localStorage.getItem('properties')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          console.log('Loading properties from localStorage:', parsed)
          setProperties(parsed)
        } catch (e) {
          console.error('Error parsing properties:', e)
          setProperties([])
        }
      } else {
        console.log('No properties found in localStorage')
        setProperties([])
      }
    }
    
    loadProperties()
    
    // Listen for storage events (when properties are added from another tab/page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'properties') {
        console.log('Storage event detected! Reloading properties...')
        loadProperties()
      }
    }
    
    // Listen for custom storage events (same tab)
    const handleCustomStorage = () => {
      console.log('Custom storage event detected! Reloading properties...')
      loadProperties()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('storage', handleCustomStorage)
    
    // Poll for changes every 1 second (in case properties are added from another tab/page)
    const interval = setInterval(() => {
      const stored = localStorage.getItem('properties')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setProperties(prev => {
            // Only update if different (to avoid unnecessary re-renders)
            if (JSON.stringify(prev) !== JSON.stringify(parsed)) {
              console.log('Properties changed, updating state')
              return parsed
            }
            return prev
          })
        } catch (e) {
          console.error('Error parsing properties:', e)
        }
      } else {
        // If localStorage is empty but we have properties, clear them
        setProperties(prev => {
          if (prev.length > 0) {
            console.log('localStorage cleared, clearing properties')
            return []
          }
          return prev
        })
      }
    }, 1000)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('storage', handleCustomStorage)
    }
  }, [])

  useEffect(() => {
    // Save to localStorage whenever properties change
    localStorage.setItem('properties', JSON.stringify(properties))
  }, [properties])

  const addProperty = (propertyData: Omit<Property, 'id' | 'status' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    console.log('Adding property to context:', newProperty)
    setProperties(prev => {
      const updated = [...prev, newProperty]
      console.log('Updated properties array:', updated)
      console.log('Updated properties count:', updated.length)
      // Force localStorage update immediately
      try {
        localStorage.setItem('properties', JSON.stringify(updated))
        console.log('Properties saved to localStorage successfully')
        // Trigger storage event for other tabs
        window.dispatchEvent(new Event('storage'))
      } catch (e) {
        console.error('Error saving to localStorage:', e)
      }
      return updated
    })
  }

  const updatePropertyStatus = (id: number, status: 'pending' | 'approved' | 'rejected') => {
    setProperties(prev =>
      prev.map(p => p.id === id ? { ...p, status } : p)
    )
  }

  const getApprovedProperties = () => {
    return properties.filter(p => p.status === 'approved')
  }

  const getPendingProperties = () => {
    return properties.filter(p => p.status === 'pending')
  }

  const loadPropertiesFromLocalStorage = () => {
    const stored = localStorage.getItem('properties')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        console.log('Manually loading properties from localStorage:', parsed)
        setProperties(parsed)
      } catch (e) {
        console.error('Error parsing properties:', e)
        setProperties([])
      }
    } else {
      console.log('No properties found in localStorage')
      setProperties([])
    }
  }

  return (
    <PropertyContext.Provider value={{
      properties,
      addProperty,
      updatePropertyStatus,
      getApprovedProperties,
      getPendingProperties,
      loadPropertiesFromLocalStorage
    }}>
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperties() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider')
  }
  return context
}

