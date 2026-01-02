# Running Admin Portal and Main Website Separately

## Current Setup (Same App)
Currently, both the main website and admin portal run from the same Next.js application:
- **Main Website**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3000/admin-portal/login`

To start: `npm run dev`

## Option 1: Different Ports (Same App)
You can run the same app on different ports, but they'll still be the same codebase.

## Option 2: Separate Applications (Recommended for Production)

### Step 1: Create Separate Admin App

1. Create a new Next.js app for admin:
```bash
npx create-next-app@latest admin-portal --typescript --tailwind --app
cd admin-portal
```

2. Copy admin files:
- Copy `app/admin-portal/*` to the new app's `app/*`
- Copy shared components and contexts
- Set up the same dependencies

3. Update package.json scripts:
```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  }
}
```

### Step 3: Run Both Apps

**Terminal 1 (Main Website):**
```bash
cd DeanHomes
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 (Admin Portal):**
```bash
cd admin-portal
npm run dev
# Runs on http://localhost:3001
```

## Option 3: Use Environment Variables for Different Configs

You can use different `.env` files to configure them differently while keeping them in the same app.

## Quick Access Guide

### Main Website Routes:
- `/` - Splash page
- `/signup` - Signup
- `/login` - Login
- `/home` - Property listings
- `/seller` - Seller dashboard

### Admin Portal Routes:
- `/admin-portal/login` - Admin login
- `/admin-portal/dashboard` - Admin dashboard

## Recommended Approach

For development: Keep them together (current setup)
- Easier to manage
- Shared code and components
- Single deployment

For production: Consider separating if:
- You want different domains (e.g., `deanhomes.com` and `admin.deanhomes.com`)
- Different security requirements
- Different scaling needs

