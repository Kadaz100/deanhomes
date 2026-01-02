# Paystack Payment Integration Setup

## Overview
The application now includes Paystack payment integration for apartment listings. When users want to view agent contact details for apartments, they need to pay ₦2,000.

## Setup Instructions

### 1. Get Your Paystack Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Sign up or log in
3. Navigate to **Settings** → **API Keys & Webhooks**
4. Copy your **Public Key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)

### 2. Configure Environment Variables

1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add your Paystack public key:

```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
```

For production, use your live key:
```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key_here
```

### 3. Test Mode vs Live Mode

- **Test Mode**: Use `pk_test_...` keys for development and testing
- **Live Mode**: Use `pk_live_...` keys for production

### 4. Payment Flow

1. User clicks "Get More Info" on a property card
2. User is redirected to property detail page
3. For **Apartments**: User must pay ₦2,000 to view agent contact
4. For **Land/House**: Owner contact is shown directly (no payment required)
5. Payment is processed via Paystack
6. After successful payment, contact details are unlocked

### 5. Testing Payments

In test mode, you can use these test cards:

- **Successful Payment**: `4084084084084081`
- **Declined Payment**: `5060666666666666666`
- **Insufficient Funds**: `5060666666666666667`

Use any future expiry date, any CVV, and any PIN.

### 6. Webhook Setup (Optional)

For production, you may want to set up webhooks to verify payments on your backend:

1. Go to **Settings** → **API Keys & Webhooks**
2. Add a webhook URL
3. Handle payment verification on your server

## Current Implementation

- Payment modal integrated with Paystack
- Automatic payment verification
- Contact details unlock after successful payment
- Payment state persisted in localStorage
- Fallback to simulated payment if Paystack not loaded

## Notes

- The payment amount is currently set to ₦2,000 (200,000 kobo)
- Payment is only required for apartment listings
- Land and house listings show owner contact directly
- All payments are processed in NGN (Nigerian Naira)

