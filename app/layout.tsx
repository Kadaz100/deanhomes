import type { Metadata } from 'next'
import './globals.css'
import AuthProviderWrapper from '@/components/AuthProviderWrapper'
import { PropertyProvider } from '@/contexts/PropertyContext'
import { PaymentProvider } from '@/contexts/PaymentContext'
import { UserStorageProvider } from '@/contexts/UserStorageContext'

export const metadata: Metadata = {
  title: 'Dean Homes - Find Your Perfect Home',
  description: 'Find, Buy, Sell, or Rent Your Perfect Home',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </head>
      <body>
        <AuthProviderWrapper>
          <UserStorageProvider>
            <PropertyProvider>
              <PaymentProvider>
                {children}
              </PaymentProvider>
            </PropertyProvider>
          </UserStorageProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  )
}

