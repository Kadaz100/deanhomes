# Deployment Guide for Dean Homes

## Step 1: Push to GitHub

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in with your account (Kadaz100)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `deanhomes` (or any name you prefer)
4. Description: "Modern real estate platform with Paystack payment integration"
5. Choose **Public** or **Private** (your choice)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

### 2. Push Your Code to GitHub

Run these commands in your terminal (in the DeanHomes directory):

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME with Kadaz100)
git remote add origin https://github.com/Kadaz100/deanhomes.git

# Rename main branch if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You'll be prompted for your GitHub username and password/token. If you have 2FA enabled, use a Personal Access Token instead of password.

### 3. Create Personal Access Token (if needed)

If you need a token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "DeanHomes Deployment"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. Copy the token and use it as your password when pushing

---

## Step 2: Deploy to Vercel (Recommended for Next.js)

### Why Vercel?
- Free hosting for Next.js
- Automatic deployments from GitHub
- Built-in SSL certificates
- Easy environment variable management
- Perfect for Paystack integration

### Deployment Steps:

1. **Go to [Vercel](https://vercel.com)**
   - Sign up/Log in with your GitHub account (Kadaz100)
   - This allows automatic deployments

2. **Import Your Repository**
   - Click **"Add New Project"**
   - Select your `deanhomes` repository
   - Click **"Import"**

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Click **"Deploy"**

4. **Add Environment Variables**
   - After deployment, go to **Project Settings** → **Environment Variables**
   - Add: `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - Value: Your Paystack public key (from Paystack dashboard)
   - Click **"Save"**
   - **Redeploy** the project (click "Redeploy" button)

5. **Get Your Live URL**
   - Vercel will give you a URL like: `deanhomes.vercel.app`
   - You can also add a custom domain later

---

## Step 3: Set Up Paystack

### 1. Get Your Paystack Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Sign up or log in
3. Navigate to **Settings** → **API Keys & Webhooks**

### 2. For Testing (Development)
- Copy your **Test Public Key** (starts with `pk_test_...`)
- Add it to Vercel environment variables as `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- Test payments won't charge real money

### 3. For Production (Live)
- After testing, switch to **Live Mode** in Paystack
- Copy your **Live Public Key** (starts with `pk_live_...`)
- Update the environment variable in Vercel
- Redeploy

### 4. Test Payments
- Use test cards from Paystack dashboard
- Test successful and failed payments
- Verify contact details unlock correctly

---

## Step 4: Update Paystack Webhook (Optional)

For production, you may want to verify payments on your backend:

1. In Paystack Dashboard → **Settings** → **API Keys & Webhooks**
2. Add webhook URL: `https://your-vercel-url.vercel.app/api/webhook` (if you create one)
3. This allows Paystack to notify your app of payment status

---

## Alternative Hosting Options

### Netlify
- Similar to Vercel
- Free tier available
- Good for Next.js
- [netlify.com](https://netlify.com)

### Railway
- Easy deployment
- Free tier available
- [railway.app](https://railway.app)

### Render
- Free tier available
- Easy setup
- [render.com](https://render.com)

---

## Post-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel (or other hosting)
- [ ] Environment variables set (Paystack key)
- [ ] Test payment flow works
- [ ] Property submission works
- [ ] Admin portal accessible
- [ ] Images upload correctly
- [ ] Contact details unlock after payment

---

## Troubleshooting

### Payment Not Working?
- Check Paystack key is set correctly in environment variables
- Verify key starts with `pk_test_` or `pk_live_`
- Check browser console for errors
- Ensure Paystack script is loaded (check Network tab)

### Build Errors?
- Check Node.js version (should be 18+)
- Run `npm install` locally first
- Check for TypeScript errors

### Images Not Uploading?
- Check file size limits
- Verify base64 encoding works
- Check browser console for errors

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test locally first with `npm run dev`

Good luck with your deployment! 🚀

