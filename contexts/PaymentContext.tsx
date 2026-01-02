'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface PaymentRecord {
  propertyId: number
  userId: string
  amount: number
  paidAt: string
  status: 'completed'
}

interface PaymentContextType {
  paidProperties: number[]
  makePayment: (propertyId: number, amount: number) => Promise<boolean>
  hasPaidForProperty: (propertyId: number) => boolean
  markPropertyAsPaid: (propertyId: number) => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [paidProperties, setPaidProperties] = useState<number[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('paidProperties')
    if (stored) {
      setPaidProperties(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('paidProperties', JSON.stringify(paidProperties))
  }, [paidProperties])

  const makePayment = async (propertyId: number, amount: number): Promise<boolean> => {
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        setPaidProperties(prev => [...prev, propertyId])
        resolve(true)
      }, 1500) // Simulate 1.5 second payment processing
    })
  }

  const hasPaidForProperty = (propertyId: number): boolean => {
    return paidProperties.includes(propertyId)
  }

  const markPropertyAsPaid = (propertyId: number) => {
    setPaidProperties(prev => {
      if (!prev.includes(propertyId)) {
        return [...prev, propertyId]
      }
      return prev
    })
  }

  return (
    <PaymentContext.Provider value={{ paidProperties, makePayment, hasPaidForProperty, markPropertyAsPaid }}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}

