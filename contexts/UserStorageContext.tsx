'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface StoredUser {
  name: string
  email: string
  password: string
  role: 'buyer' | 'seller' | 'admin'
}

interface UserStorageContextType {
  saveUser: (user: StoredUser) => void
  getUserByEmail: (email: string) => StoredUser | null
  verifyUser: (email: string, password: string) => StoredUser | null
  storedUsers: StoredUser[]
}

const UserStorageContext = createContext<UserStorageContextType | undefined>(undefined)

export function UserStorageProvider({ children }: { children: ReactNode }) {
  const [storedUsers, setStoredUsers] = useState<StoredUser[]>([])

  useEffect(() => {
    const users = getStoredUsers()
    setStoredUsers(users)
  }, [])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(storedUsers))
  }, [storedUsers])

  const getStoredUsers = (): StoredUser[] => {
    const stored = localStorage.getItem('users')
    return stored ? JSON.parse(stored) : []
  }

  const saveUser = (user: StoredUser) => {
    setStoredUsers(prev => {
      const existingIndex = prev.findIndex(u => u.email === user.email)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = user
        return updated
      } else {
        return [...prev, user]
      }
    })
  }

  const getUserByEmail = (email: string): StoredUser | null => {
    return storedUsers.find(u => u.email === email) || null
  }

  const verifyUser = (email: string, password: string): StoredUser | null => {
    const user = getUserByEmail(email)
    if (user && user.password === password) {
      return user
    }
    return null
  }

  return (
    <UserStorageContext.Provider value={{ saveUser, getUserByEmail, verifyUser, storedUsers }}>
      {children}
    </UserStorageContext.Provider>
  )
}

export function useUserStorage() {
  const context = useContext(UserStorageContext)
  if (context === undefined) {
    throw new Error('useUserStorage must be used within a UserStorageProvider')
  }
  return context
}

