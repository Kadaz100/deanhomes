'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, CreditCard, CheckCircle2, Loader } from 'lucide-react'
import { usePayment } from '@/contexts/PaymentContext'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  propertyId: number
  propertyTitle: string
  amount: number
  onSuccess: () => void
}

export default function PaymentModal({ isOpen, onClose, propertyId, propertyTitle, amount, onSuccess }: PaymentModalProps) {
  const { makePayment } = usePayment()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Initialize Paystack payment
    if (typeof window !== 'undefined' && (window as any).PaystackPop) {
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxx', // Replace with your Paystack public key
        email: 'buyer@example.com', // You can get this from user context
        amount: amount * 100, // Convert to kobo (Paystack uses kobo)
        currency: 'NGN',
        ref: `property_${propertyId}_${Date.now()}`,
        metadata: {
          propertyId: propertyId.toString(),
          propertyTitle: propertyTitle,
        },
        callback: function(response: any) {
          // Payment successful
          setIsProcessing(false)
          setIsSuccess(true)
          makePayment(propertyId, amount) // Mark as paid in context
          setTimeout(() => {
            onSuccess()
            onClose()
            setIsSuccess(false)
          }, 2000)
        },
        onClose: function() {
          // User closed payment modal
          setIsProcessing(false)
          alert('Payment cancelled')
        }
      })
      handler.openIframe()
    } else {
      // Fallback: Simulate payment if Paystack not loaded
      const success = await makePayment(propertyId, amount)
      setIsProcessing(false)
      
      if (success) {
        setIsSuccess(true)
        setTimeout(() => {
          onSuccess()
          onClose()
          setIsSuccess(false)
        }, 2000)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Unlock Contact Information</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {!isSuccess ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">Get contact details for:</p>
              <p className="text-lg font-semibold text-gray-900 mb-4">{propertyTitle}</p>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Payment Amount:</span>
                  <span className="text-2xl font-bold text-purple-800">₦{amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">What you'll get:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Agent contact number</li>
                  <li>✓ Agent email address</li>
                  <li>✓ Full property details</li>
                </ul>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 gradient-purple text-white rounded-xl font-bold text-lg hover:shadow-purple-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay ₦{amount.toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">Contact information unlocked</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

