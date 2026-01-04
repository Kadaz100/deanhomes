# How to Add Environment Variable in Vercel

## The Error You're Seeing

If you see: *"the name contains invalid characters. Only letters, digits, and underscores are allowed"*

This means you're trying to use an invalid name for the environment variable.

## ✅ Correct Setup

### Environment Variable Name (What Vercel Asks For):
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
```

**NOT:**
- ❌ `deanhomes.xyz` (this is your domain, not the variable name)
- ❌ `paystack key`
- ❌ `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.deanhomes.xyz`
- ❌ Any name with dots, spaces, or special characters

### Environment Variable Value (What You Paste):
```
pk_test_your_actual_paystack_key_here
```

This is the Paystack public key you copied from the dashboard.

---

## Step-by-Step in Vercel

### 1. Go to Your Project Settings
- In Vercel dashboard, click on your project
- Click **"Settings"** (top menu)
- Click **"Environment Variables"** (left sidebar)

### 2. Add New Variable
- Click **"Add New"** button
- In the **"Name"** field, type exactly:
  ```
  NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  ```
- In the **"Value"** field, paste your Paystack key:
  ```
  pk_test_1234567890abcdefghijklmnopqrstuvwxyz
  ```
- Select environments: Check **Production**, **Preview**, and **Development**
- Click **"Save"**

### 3. Redeploy
- After saving, click **"Deployments"** tab
- Find your latest deployment
- Click the **"..."** menu → **"Redeploy"**
- Or push a new commit to trigger redeploy

---

## Visual Guide

```
Vercel Project Settings
└── Environment Variables
    └── Add New
        ├── Name: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY  ← Use this exact name
        ├── Value: pk_test_xxxxxxxxxxxxx            ← Your Paystack key
        └── Environments: [✓] Production [✓] Preview [✓] Development
```

---

## Common Mistakes

### ❌ Wrong: Using Domain as Name
```
Name: deanhomes.xyz
Value: pk_test_...
```
**Problem**: Dots (.) are not allowed in environment variable names

### ❌ Wrong: Using Spaces
```
Name: Paystack Public Key
Value: pk_test_...
```
**Problem**: Spaces are not allowed

### ❌ Wrong: Using Special Characters
```
Name: NEXT_PUBLIC_PAYSTACK_KEY@deanhomes
Value: pk_test_...
```
**Problem**: Special characters (@) are not allowed

### ✅ Correct: Using Underscores Only
```
Name: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
Value: pk_test_1234567890abcdefghijklmnopqrstuvwxyz
```
**Perfect!** Only letters, numbers, and underscores

---

## Environment Variable Naming Rules

✅ **Allowed:**
- Letters (a-z, A-Z)
- Numbers (0-9)
- Underscores (_)
- Must start with a letter or underscore

❌ **Not Allowed:**
- Dots (.)
- Spaces
- Hyphens (-)
- Special characters (@, #, $, %, etc.)
- Starting with a number

---

## Your Domain vs Environment Variable

**Your Domain (deanhomes.xyz):**
- This is your website URL
- Set in Vercel → Settings → Domains
- Not related to environment variables

**Environment Variable:**
- Used to store configuration (like API keys)
- Name must follow naming rules
- Value can be anything (your Paystack key)

---

## Quick Checklist

- [ ] Go to Vercel → Project → Settings → Environment Variables
- [ ] Click "Add New"
- [ ] Name: `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` (exact, no spaces, no dots)
- [ ] Value: Your Paystack key (starts with `pk_test_...` or `pk_live_...`)
- [ ] Select all environments
- [ ] Click "Save"
- [ ] Redeploy your project

---

## Still Having Issues?

**Check:**
1. No spaces in the name
2. No dots (.) in the name
3. No special characters
4. Name starts with a letter (N, not a number)
5. Using underscores (_) to separate words

**Example of correct format:**
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
```

This follows the pattern: `NEXT_PUBLIC_` (prefix) + `PAYSTACK_PUBLIC_KEY` (descriptive name with underscores)

---

## Need Help?

If you're still getting errors:
1. Copy the exact name: `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
2. Make sure there are no extra spaces before or after
3. Don't include your domain name in the variable name
4. The domain (deanhomes.xyz) is separate - set it in Domains section, not Environment Variables

Good luck! 🚀

