# How to Get Your Paystack Public Key

## Step-by-Step Guide

### Step 1: Create a Paystack Account

1. Go to [https://dashboard.paystack.com/](https://dashboard.paystack.com/)
2. Click **"Sign Up"** (if you don't have an account)
3. Fill in your details:
   - Email address
   - Password
   - Business name
   - Phone number
4. Verify your email address (check your inbox)

### Step 2: Complete Business Setup

1. After logging in, you'll be asked to complete your business profile
2. Fill in:
   - Business type
   - Business address
   - Bank account details (for receiving payments)
3. Complete the verification process

### Step 3: Access API Keys

1. Once logged into the Paystack dashboard
2. Look at the left sidebar menu
3. Click on **"Settings"** (gear icon at the bottom)
4. In the Settings menu, click on **"API Keys & Webhooks"**

### Step 4: Get Your Public Key

You'll see two types of keys:

#### For Testing (Development):
- **Test Public Key**: Starts with `pk_test_...`
- This is for testing payments (won't charge real money)
- Use this first to test your integration
- Example: `pk_test_1234567890abcdefghijklmnopqrstuvwxyz`

#### For Production (Live):
- **Live Public Key**: Starts with `pk_live_...`
- This is for real payments (charges actual money)
- Only use this after testing is complete
- Example: `pk_live_1234567890abcdefghijklmnopqrstuvwxyz`

### Step 5: Copy Your Key

1. Click the **"Copy"** button next to the Test Public Key (for now)
2. Or click the eye icon to reveal it, then copy manually
3. **Important**: Keep this key secure! Don't share it publicly

### Step 6: Add to Vercel

1. Go to your Vercel project
2. Click on **"Settings"** → **"Environment Variables"**
3. Click **"Add New"**
4. Enter:
   - **Name**: `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - **Value**: Paste your copied key (e.g., `pk_test_...`)
5. Select environments: **Production**, **Preview**, **Development** (or just Production)
6. Click **"Save"**
7. **Important**: After adding, click **"Redeploy"** to apply the changes

---

## Visual Guide

```
Paystack Dashboard
├── Settings (left sidebar, bottom)
│   └── API Keys & Webhooks
│       ├── Test Public Key: pk_test_xxxxxxxxxxxxx [Copy]
│       ├── Test Secret Key: sk_test_xxxxxxxxxxxxx (don't use this)
│       ├── Live Public Key: pk_live_xxxxxxxxxxxxx [Copy]
│       └── Live Secret Key: sk_live_xxxxxxxxxxxxx (don't use this)
```

---

## Important Notes

### ✅ Use Public Key (NOT Secret Key)
- **Public Key**: Safe to use in frontend code (starts with `pk_`)
- **Secret Key**: NEVER use in frontend! Only for backend (starts with `sk_`)

### ✅ Start with Test Mode
- Use `pk_test_...` first
- Test payments won't charge real money
- Use test cards from Paystack dashboard

### ✅ Switch to Live Mode Later
- After testing, switch to `pk_live_...`
- Update the environment variable in Vercel
- Redeploy your project

### ✅ Test Cards (Test Mode Only)

When using test mode, you can use these cards:

**Successful Payment:**
- Card Number: `4084084084084081`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)
- PIN: Any 4 digits (e.g., 0000)

**Declined Payment:**
- Card Number: `5060666666666666666`

**Insufficient Funds:**
- Card Number: `5060666666666666667`

---

## Quick Checklist

- [ ] Created Paystack account
- [ ] Completed business verification
- [ ] Went to Settings → API Keys & Webhooks
- [ ] Copied Test Public Key (`pk_test_...`)
- [ ] Added to Vercel as `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- [ ] Redeployed Vercel project
- [ ] Tested payment flow
- [ ] Switched to Live Key when ready

---

## Troubleshooting

**Can't find API Keys?**
- Make sure you've completed business verification
- Check if you're in the correct account
- Try refreshing the page

**Key not working?**
- Make sure you copied the **Public Key** (starts with `pk_`)
- Check for extra spaces when pasting
- Verify you added it to Vercel environment variables
- Make sure you redeployed after adding

**Test payments not working?**
- Verify you're using test mode key (`pk_test_...`)
- Use the test card numbers provided above
- Check browser console for errors
- Make sure Paystack script is loaded

---

## Security Reminder

- ✅ Public keys are safe to use in frontend
- ❌ Never expose Secret keys
- ✅ Keep your keys secure
- ✅ Don't commit keys to GitHub (use environment variables)

---

## Need Help?

- Paystack Documentation: [https://paystack.com/docs](https://paystack.com/docs)
- Paystack Support: Check dashboard for support options
- Test your integration with test cards first!

Good luck! 🚀

