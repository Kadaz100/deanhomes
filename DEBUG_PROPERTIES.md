# Debugging Property Submission

## To Check if Properties are Being Stored:

1. **Open Browser Console** (F12)
2. **Go to Application/Storage tab**
3. **Check localStorage**
4. **Look for key: `properties`**
5. **You should see your submitted properties there**

## If Properties Don't Show in Admin Portal:

1. **Refresh the admin portal page** (F5)
2. **Check browser console for errors**
3. **Verify you're logged in as admin**
4. **Check that PropertyContext is working**

## Quick Test:

1. Submit a property as seller
2. Open browser console (F12)
3. Type: `localStorage.getItem('properties')`
4. You should see your property in JSON format
5. If you see it, the issue is with the admin portal reading it
6. If you don't see it, the issue is with the seller submission

