# Dean Homes - Real Estate Platform

A modern, premium real estate website platform with three main interfaces:
- **Landing Page**: Beautiful property search and listing interface
- **Seller Dashboard**: Professional property submission and management
- **Admin Panel**: Comprehensive property approval and management system

## Features

### Landing Page
- Large hero section with bold typography
- Advanced search bar with filters (price, location, property type, size)
- Three action cards: Buy Property, Rent Apartment, Buy Land
- Property listing cards with images, prices, and location details
- Smooth animations and transitions
- Fully responsive design

### Seller Dashboard
- Clean sidebar navigation
- Property submission form with all required fields
- Image upload interface
- Property status tracking (Pending, Approved, Rejected)
- My Properties view
- Pending Approvals section
- Messages interface

### Admin Panel
- Dashboard with key statistics (Total Listings, Pending Approvals, Approved Properties, Active Users)
- Comprehensive property management table
- Approve/Reject functionality
- Detailed property preview modal
- Professional enterprise UI

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

- `/` - Landing page
- `/seller` - Seller dashboard
- `/admin` - Admin panel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

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

## License

This project is created for Dean Homes real estate platform.

