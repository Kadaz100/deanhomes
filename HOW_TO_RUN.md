# How to Run Dean Homes

## ✅ Recommended: Single Command (Easiest)

**You don't need to run them separately!** They're already separate routes in the same app:

```bash
npm run dev
```

Then access:
- **Main Website**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3000/admin-portal/login`

This is the **simplest and recommended** approach.

---

## Alternative: Different Ports (If You Really Want)

If you want them on different ports (not necessary, but possible):

**Terminal 1:**
```bash
npm run dev:main
# Main site on http://localhost:3000
```

**Terminal 2:**
```bash
npm run dev:admin
# Admin on http://localhost:3001
```

**Note:** If you get "port already in use" error:
1. Find the process: `netstat -ano | findstr :3001`
2. Kill it: `taskkill /PID <process_id> /F`
3. Or use a different port in package.json

---

## 🎯 Quick Access

### Main Website Routes:
- `/` - Splash page
- `/signup` - Signup (Buyer/Seller)
- `/login` - Login (Buyer/Seller)
- `/home` - Browse properties
- `/seller` - Seller dashboard

### Admin Portal Routes:
- `/admin-portal/login` - Admin login (requires access key)
- `/admin-portal/dashboard` - Admin dashboard

**Admin Access Key:** `DEANHOMES_ADMIN_2025` (change in `app/admin-portal/login/page.tsx`)

---

## 💡 Why Single Command is Better

- ✅ One process to manage
- ✅ Shared code and components
- ✅ Easier development
- ✅ Already completely separate (different routes, no cross-links)
- ✅ Same security (admin requires access key)

The admin portal is **already private and separate** - it just runs from the same server, which is actually better for development!

