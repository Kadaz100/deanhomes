# Fix: Vercel Project Name Error

## The Problem

You're trying to use `deanhomes.xyz` as the **Project Name**, but Vercel doesn't allow dots (.) in project names.

## ✅ Solution: Use a Name Without Dots

### Change Project Name From:
❌ `deanhomes.xyz` (has a dot - not allowed)

### To One of These:
✅ `deanhomes` (simple, clean)
✅ `deanhomes-xyz` (uses hyphen instead)
✅ `deanhomes-main` (if deploying main site)
✅ `deanhomes-admin` (if deploying admin portal)

## Step-by-Step Fix

1. **In the "Project Name" field**, change:
   - From: `deanhomes.xyz`
   - To: `deanhomes` (or any name without dots)

2. **Keep everything else the same:**
   - Framework Preset: Next.js ✅
   - Root Directory: `./` ✅
   - Environment Variable: `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` ✅
   - Value: `pk_test_9d53f81ae8ba0a4945e9f67863c23c643f5e054e` ✅

3. **Click "Deploy"**

## Important: Project Name vs Domain

**Project Name** (what you're setting now):
- Used internally by Vercel
- Can't have dots
- Examples: `deanhomes`, `deanhomes-main`, `deanhomes-xyz`

**Domain** (set later):
- Your actual website URL
- Can have dots
- Examples: `deanhomes.xyz`, `www.deanhomes.xyz`
- Set this AFTER deployment in Settings → Domains

## After Deployment

Once deployed, you can add your custom domain:

1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `deanhomes.xyz`
4. Follow DNS setup instructions
5. Your site will be accessible at `deanhomes.xyz`

## Quick Fix Summary

**Change this:**
```
Project Name: deanhomes.xyz  ❌
```

**To this:**
```
Project Name: deanhomes  ✅
```

Then deploy! Your domain (`deanhomes.xyz`) can be added later in Settings → Domains.

---

## Project Name Rules

✅ **Allowed:**
- Letters (a-z, A-Z)
- Numbers (0-9)
- Hyphens (-)
- Underscores (_)
- Must start with a letter or number

❌ **Not Allowed:**
- Dots (.)
- Spaces
- Special characters

---

## Examples of Good Project Names

- `deanhomes`
- `deanhomes-main`
- `deanhomes-admin`
- `deanhomes-xyz`
- `deanhomes_realestate`
- `dean-homes`

All of these work! Just no dots. 🚀

