# Deploying Admin Portal and Main Site Separately

## Current Situation

Your code is already pushed to GitHub! ✅
- Repository: `https://github.com/Kadaz100/deanhomes`

Now you want to deploy them as **two separate applications**:
1. **Main Site**: Public-facing property listings
2. **Admin Portal**: Private admin dashboard

## Option 1: Two Separate Vercel Projects (Recommended)

Deploy the same GitHub repository to **two different Vercel projects** with different configurations.

### Step 1: Deploy Main Site

1. Go to [Vercel](https://vercel.com) and log in
2. Click **"Add New Project"**
3. Import your `deanhomes` repository
4. Configure:
   - **Project Name**: `deanhomes-main` (or `deanhomes`)
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variables:
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`: Your Paystack key
6. Click **"Deploy"**
7. You'll get a URL like: `deanhomes-main.vercel.app`

### Step 2: Deploy Admin Portal (Same Repo, Different Project)

1. In Vercel, click **"Add New Project"** again
2. Import the **same** `deanhomes` repository
3. Configure:
   - **Project Name**: `deanhomes-admin` (or `admin-deanhomes`)
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add Environment Variables:
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`: Your Paystack key
   - `NEXT_PUBLIC_APP_TYPE`: `admin` (optional, for future use)
5. Click **"Deploy"**
6. You'll get a URL like: `deanhomes-admin.vercel.app`

### Step 3: Configure Custom Domains (Optional)

**For Main Site:**
- Add custom domain: `deanhomes.com` or `www.deanhomes.com`
- Follow Vercel's DNS instructions

**For Admin Portal:**
- Add custom domain: `admin.deanhomes.com` or `portal.deanhomes.com`
- This keeps admin completely separate

### Step 4: Update Admin Portal Access

Since they're separate, you can:
- Main site: Access at `deanhomes-main.vercel.app` or `deanhomes.com`
- Admin portal: Access at `deanhomes-admin.vercel.app` or `admin.deanhomes.com`

Both will work independently!

---

## Option 2: Single Deployment with Path Rewrites (Simpler)

Deploy once, but configure Vercel to serve admin on a subdomain.

### Step 1: Deploy Main Site

1. Deploy to Vercel (same as Option 1, Step 1)
2. Get your main URL: `deanhomes.vercel.app`

### Step 2: Add Subdomain for Admin

1. In Vercel project settings → **Domains**
2. Add a new domain: `admin.deanhomes.com` (or use Vercel subdomain)
3. Configure DNS:
   - Add CNAME record: `admin` → `cname.vercel-dns.com`
4. Both URLs will work:
   - Main: `deanhomes.vercel.app` or `deanhomes.com`
   - Admin: `admin.deanhomes.com` → redirects to `/admin-portal/login`

**Note**: This still uses one deployment, but admin is accessible via separate domain.

---

## Option 3: Environment-Based Routing (Advanced)

Create a middleware to redirect based on domain.

### Create `middleware.ts` in root:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // If accessing via admin subdomain, ensure we're on admin routes
  if (hostname.includes('admin.') || hostname.includes('admin-')) {
    const path = request.nextUrl.pathname
    
    // Redirect to admin login if not on admin routes
    if (!path.startsWith('/admin-portal')) {
      return NextResponse.redirect(new URL('/admin-portal/login', request.url))
    }
  }
  
  // If accessing via main domain, block admin routes
  if (!hostname.includes('admin.') && !hostname.includes('admin-')) {
    const path = request.nextUrl.pathname
    
    if (path.startsWith('/admin-portal')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

Then deploy once and use subdomains.

---

## Recommended Approach: Option 1 (Two Separate Projects)

**Why?**
- ✅ Complete separation
- ✅ Independent scaling
- ✅ Different security settings
- ✅ Easier to manage
- ✅ Can have different environment variables
- ✅ Admin can be private/restricted

**Steps Summary:**
1. Deploy same repo to Vercel twice
2. Name them differently (`deanhomes-main` and `deanhomes-admin`)
3. Both get their own URLs
4. Add custom domains if needed
5. Done! ✅

---

## Quick Commands

After deploying, you'll have:
- **Main Site**: `https://deanhomes-main.vercel.app`
- **Admin Portal**: `https://deanhomes-admin.vercel.app`

Both work independently!

---

## Security Note

For the admin portal:
- Keep the Vercel project **private** (if possible)
- Use strong access keys
- Consider IP whitelisting (Vercel Pro feature)
- Use custom domain with SSL

---

## Troubleshooting

**Both deployments show same content?**
- That's normal! They're the same codebase
- Admin routes are at `/admin-portal/*` on both
- Main routes are at `/`, `/home`, etc. on both

**Want to hide admin routes on main site?**
- Use middleware (Option 3) to block `/admin-portal/*` on main domain
- Or use separate codebases (more complex)

**Different environment variables?**
- Each Vercel project has its own environment variables
- Set them separately in each project's settings

---

## Next Steps

1. ✅ Code is on GitHub (done!)
2. Deploy main site to Vercel
3. Deploy admin portal to Vercel (same repo)
4. Add Paystack keys to both
5. Test both deployments
6. Add custom domains (optional)

Good luck! 🚀

