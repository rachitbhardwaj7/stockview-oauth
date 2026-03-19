# 🔑 Google Cloud Console Setup - Quick Reference

## URLs You MUST Add to Google Cloud Console

When setting up OAuth credentials in Google Cloud Console, add these **exact** URLs:

### Step 1: OAuth Consent Screen
- Go to: **APIs & Services** > **OAuth consent screen**
- Create external consent screen

### Step 2: Create OAuth Credentials  
- Go to: **APIs & Services** > **Credentials**
- Click: **Create Credentials** > **OAuth Client ID**
- Choose: **Web application**
- Name: `StockView App`

### Step 3: ADD THESE REDIRECT URIs ⚠️

**Copy these URLs exactly into "Authorized redirect URIs":**

```
http://localhost:3000
http://localhost:3000/auth/google/callback
```

### Step 4: Copy Your Credentials

After creating, you'll see:
- **Client ID:** Copy this
- **Client Secret:** Copy this

Create a `.env` file and paste:
```
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

---

## ✅ Quick Testing

After setup:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   - Copy `.env.example` to `.env`
   - Paste your Client ID and Secret

3. **Start server:**
   ```bash
   npm start
   ```

4. **Open browser:**
   ```
   http://localhost:3000
   ```

5. **Click "Sign in with Google"** and login!

---

## 🚀 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Invalid Client ID" | Check copy-paste, no extra spaces |
| "Redirect URI mismatch" | Ensure URLs match exactly, including http:// |
| Can't connect to localhost:3000 | Port 3000 might be in use, change in .env |
| Blank page after clicking Sign In | Check browser console for errors, check .env setup |

---

**Your app will:**
- Show login page at `http://localhost:3000`
- Redirect to Google when you click "Sign in"
- Redirect back to dashboard after login
- Display stock market data
- Show your Google profile info

Good luck with your lab! 📈
