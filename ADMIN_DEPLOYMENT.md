# Deploying Admin Portal Separately

## Current Situation

You have **two parts** in your application:
1. **Main Site**: Public property listings (`/home`, `/property/[id]`, etc.)
2. **Admin Portal**: Private admin dashboard (`/admin-portal/login`, `/admin-portal/dashboard`)

## Option 1: Deploy Admin Portal as Separate Project (Recommended)

This gives you complete separation and different URLs.

### Step 1: Deploy Admin Portal

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **"Add New Project"**
3. Import the **same** `deanhomes` repository (from Kadaz100)
4. Configure:
   - **Project Name**: `deanhomes-admin` (or `admin-deanhomes`)
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variables:
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`: Your Paystack key (same as main site)
6. Click **"Deploy"**
7. You'll get a URL like: `deanhomes-admin.vercel.app`

### Step 2: Access Admin Portal

- **Admin Login URL**: `https://deanhomes-admin.vercel.app/admin-portal/login`
- **Admin Dashboard**: `https://deanhomes-admin.vercel.app/admin-portal/dashboard`

### Step 3: Add Custom Domain (Optional)

1. In Vercel project settings → **Domains**
2. Add domain: `admin.deanhomes.xyz` (or `portal.deanhomes.xyz`)
3. Follow DNS setup instructions
4. Admin portal will be accessible at: `https://admin.deanhomes.xyz`

---

## Option 2: Same Deployment (Current Setup)

If you deployed once, both are already included:

- **Main Site**: `https://deanhomes.vercel.app`
- **Admin Portal**: `https://deanhomes.vercel.app/admin-portal/login`

**Pros:**
- ✅ One deployment to manage
- ✅ Shared codebase
- ✅ Easier updates

**Cons:**
- ❌ Same URL base
- ❌ Can't have different domains easily

---

## Admin Portal Access Details

### Login Credentials

1. **URL**: `/admin-portal/login`
2. **Email**: Any email (e.g., `admin@deanhomes.com`)
3. **Password**: Any password
4. **Access Key**: `DEANHOMES_ADMIN_2025` (set in `app/admin-portal/login/page.tsx`)

### Change Access Key

To change the admin access key:

1. Edit `app/admin-portal/login/page.tsx`
2. Find line 21:
   ```typescript
   const ADMIN_ACCESS_KEY = 'DEANHOMES_ADMIN_2025'
   ```
3. Change to your desired key
4. Commit and push to GitHub
5. Vercel will auto-deploy

---

## Recommended Setup

### Main Site
- **Project Name**: `deanhomes` or `deanhomes-main`
- **URL**: `deanhomes.vercel.app` or `deanhomes.xyz`
- **Purpose**: Public property listings

### Admin Portal
- **Project Name**: `deanhomes-admin`
- **URL**: `deanhomes-admin.vercel.app` or `admin.deanhomes.xyz`
- **Purpose**: Private admin dashboard

---

## Security Recommendations

1. **Keep Admin Portal Private**
   - Don't link to it from main site
   - Use a strong access key
   - Consider IP whitelisting (Vercel Pro)

2. **Use Different Domains**
   - Main: `deanhomes.xyz`
   - Admin: `admin.deanhomes.xyz`
   - This makes it harder to discover

3. **Environment Variables**
   - Both projects need `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - Admin can have additional security keys if needed

---

## Quick Checklist

### For Separate Deployment:
- [ ] Deploy main site to Vercel (already done)
- [ ] Deploy admin portal to Vercel (same repo, new project)
- [ ] Add Paystack key to admin project
- [ ] Test admin login
- [ ] Add custom domain for admin (optional)
- [ ] Update access key if needed

### For Same Deployment:
- [ ] Already done! ✅
- [ ] Access admin at: `your-url.vercel.app/admin-portal/login`
- [ ] Use access key: `DEANHOMES_ADMIN_2025`

---

## Testing Admin Portal

1. Go to admin login URL
2. Enter:
   - Email: `admin@deanhomes.com`
   - Password: `anything`
   - Access Key: `DEANHOMES_ADMIN_2025`
3. Click "Sign In"
4. You should see the admin dashboard

---

## Troubleshooting

**Admin portal not accessible?**
- Check the URL includes `/admin-portal/login`
- Verify the route exists in your app
- Check Vercel deployment logs

**Access key not working?**
- Verify the key matches in `app/admin-portal/login/page.tsx`
- Check for typos (case-sensitive)
- Redeploy after changing the key

**Want to hide admin routes on main site?**
- Admin routes are already separate
- No links to admin from main site
- Consider using middleware to block `/admin-portal/*` on main domain (advanced)

---

## Summary

**Easiest**: Deploy once, access admin at `/admin-portal/login` ✅

**Most Secure**: Deploy separately with different domains 🔒

Both work! Choose based on your needs.

