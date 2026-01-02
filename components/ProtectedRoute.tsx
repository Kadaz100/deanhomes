'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles: ('buyer' | 'seller' | 'admin')[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait for auth to finish loading before checking
    if (isLoading) return

    if (!isAuthenticated) {
      // Redirect to appropriate login page based on route
      if (window.location.pathname.startsWith('/admin-portal')) {
        router.push('/admin-portal/login')
      } else {
        router.push('/login')
      }
      return
    }

    if (user && !allowedRoles.includes(user.role)) {
      // Redirect based on user role
      if (user.role === 'buyer') {
        router.push('/home')
      } else if (user.role === 'seller') {
        router.push('/seller')
      } else if (user.role === 'admin') {
        router.push('/admin-portal/dashboard')
      }
    }
  }, [user, isAuthenticated, allowedRoles, router, isLoading])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  if (!allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}

