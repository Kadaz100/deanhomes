# Quick Start Guide - Dean Homes

## 🚀 Starting the Application

### Single Command (Both Together)
```bash
npm run dev
```
- Main Website: `http://localhost:3000`
- Admin Portal: `http://localhost:3000/admin-portal/login`

### Separate Ports (If Needed)

**Terminal 1 - Main Website:**
```bash
npm run dev:main
```
- Runs on: `http://localhost:3000`

**Terminal 2 - Admin Portal (Same App, Different Port):**
```bash
npm run dev:admin
```
- Runs on: `http://localhost:3001`
- Note: This still uses the same codebase, just different port

## 📍 Access Points

### Main Website (Public)
- **Splash Page**: `http://localhost:3000/`
- **Signup**: `http://localhost:3000/signup`
- **Login**: `http://localhost:3000/login`
- **Property Listings**: `http://localhost:3000/home`
- **Seller Dashboard**: `http://localhost:3000/seller`

### Admin Portal (Private)
- **Admin Login**: `http://localhost:3000/admin-portal/login`
- **Admin Dashboard**: `http://localhost:3000/admin-portal/dashboard`
- **Access Key**: `DEANHOMES_ADMIN_2025` (change in `app/admin-portal/login/page.tsx`)

## 🔐 Admin Access

1. Go to: `http://localhost:3000/admin-portal/login`
2. Enter:
   - Email: `admin@deanhomes.com` (or any email)
   - Password: (any password - not validated in demo)
   - Access Key: `DEANHOMES_ADMIN_2025`

## 💡 Tips

- The admin portal is completely separate from the main site
- No admin links appear on the main website
- Admin portal requires access key for security
- Both run from the same codebase for easier development

