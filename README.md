# Dean Homes - Real Estate Platform

> Latest deployment: Fixed build errors and ready for production

A modern, premium real estate website platform with Paystack payment integration, featuring:
- **Landing Page**: Beautiful property search and listing interface with image galleries
- **Seller Dashboard**: Professional property submission with minimum 4-image requirement
- **Admin Portal**: Comprehensive property approval and management system with real-time statistics
- **Property Details**: Full property pages with scrollable image galleries
- **Payment Integration**: Paystack payment gateway for contact details (₦2,000)

## Features

### Landing Page
- Large hero section with bold typography
- Advanced search bar with filters (location, property type, price range)
- Three action cards: Buy Property, Rent Apartment, Buy Land (with filtering)
- Property listing cards with images, prices, and location details
- "Get More Info" button linking to detailed property pages
- Smooth animations and transitions
- Fully responsive design

### Property Detail Pages
- Scrollable image gallery (minimum 4 images required)
- Left/right navigation arrows
- Image indicators
- Full property description
- Contact information unlock via Paystack payment (₦2,000)
- Different contact types: Owner (Land/House) or Agent (Apartment)

### Seller Dashboard
- Clean sidebar navigation
- Property submission form with all required fields
- Image upload interface (minimum 4 images required)
- Property status tracking (Pending, Approved, Rejected)
- My Properties view
- Pending Approvals section
- Real-time property sync

### Admin Portal
- Dashboard with **real-time statistics**:
  - Total Listings (actual count)
  - Pending Approvals (real count)
  - Approved Properties (real count)
  - Active Users (real count)
- Comprehensive property management table
- Approve/Reject functionality
- Detailed property preview modal
- Refresh button for manual updates
- Professional enterprise UI

### Payment System
- Paystack integration for contact details
- Payment required for all property types (₦2,000)
- Secure payment processing
- Contact unlock after successful payment
- Payment state persistence

## Design System

- **Colors**: Clean white backgrounds with elegant purple accents and gradients
- **Typography**: Modern sans-serif (Inter font family)
- **Style**: Minimalist, professional fintech-style UI with premium SaaS aesthetic
- **Animations**: Smooth transitions using Framer Motion
- **Icons**: Lucide React icon library

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Routes

- `/` - Splash page
- `/home` - Main landing page with property listings
- `/property/[id]` - Property detail page with image gallery
- `/seller` - Seller dashboard
- `/admin-portal/login` - Admin login (requires access key)
- `/admin-portal/dashboard` - Admin dashboard
- `/login` - User login
- `/signup` - User registration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Payment**: Paystack Integration
- **State Management**: React Context API
- **Storage**: LocalStorage (for demo purposes)

## Project Structure

```
deanhomes/
├── app/
│   ├── page.tsx          # Landing page
│   ├── seller/
│   │   └── page.tsx      # Seller dashboard
│   ├── admin/
│   │   └── page.tsx      # Admin panel
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Navbar.tsx        # Navigation component
│   ├── PropertyCard.tsx  # Property card component
│   └── SearchBar.tsx     # Search bar component
└── package.json
```

## Build for Production

```bash
npm run build
npm start
```

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions on:
- Pushing to GitHub
- Deploying to Vercel
- Setting up Paystack
- Environment variables configuration

## Payment Setup

See [PAYSTACK_SETUP.md](./PAYSTACK_SETUP.md) for Paystack integration details.

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` file with your Paystack key:
   ```
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_key_here
   ```
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## License

This project is created for Dean Homes real estate platform.

