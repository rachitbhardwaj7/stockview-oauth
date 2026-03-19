# StockView - Google OAuth Implementation Lab

A complete stock market dashboard application with Google OAuth 2.0 authentication integration. Perfect for your lab assignment!

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm
- Google Cloud Account

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   - Copy `.env.example` to `.env`
   - Fill in your Google OAuth credentials (see below)

3. **Run the server**
   ```bash
   npm start
   ```

4. **Access the app**
   - Open: `http://localhost:3000`

---

## 🔑 Google Cloud Console Setup

### Step 1: Create OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select or create a new project
3. Go to **APIs & Services** → **OAuth consent screen**
4. Choose **External** and click **Create**
5. Fill in:
   - App name: `StockView`
   - User support email: `your-email@gmail.com`
   - Developer contact: `your-email@gmail.com`
6. Click **Save and Continue**

### Step 2: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth Client ID**
3. Choose **Web application**
4. Name it: `StockView App`
5. **IMPORTANT: Add these URLs under "Authorized redirect URIs"**:
   ```
   http://localhost:3000
   http://localhost:3000/auth/google/callback
   ```
6. Click **Create**
7. Copy the **Client ID** and **Client Secret**

### Step 3: Update .env File

Create a `.env` file in the root directory:

```
GOOGLE_CLIENT_ID=your-client-id-from-step-2
GOOGLE_CLIENT_SECRET=your-client-secret-from-step-2
SESSION_SECRET=my-super-secret-session-key
PORT=3000
CALLBACK_URL=http://localhost:3000/auth/google/callback
```

---

## 📋 URLs to Add to Google Cloud Console

**Add these exact URLs to the "Authorized redirect URIs" section:**

1. **Login Page:**
   ```
   http://localhost:3000
   ```

2. **OAuth Callback:**
   ```
   http://localhost:3000/auth/google/callback
   ```

---

## 📁 Project Structure

```
google-oauth-stock-app/
├── server.js              # Express server with OAuth setup
├── package.json           # Dependencies
├── .env.example          # Environment variables template
├── README.md             # This file
│
├── views/
│   ├── index.ejs         # Login page
│   └── dashboard.ejs     # Stock dashboard (authenticated)
│
└── public/
    ├── css/
    │   └── style.css     # Beautiful styling
    └── js/
        └── dashboard.js  # Frontend logic
```

---

## 🛣️ Routes

| Route | Method | Purpose | Authentication |
|-------|--------|---------|-----------------|
| `/` | GET | Login page | Public |
| `/auth/google` | GET | Start Google OAuth | Public |
| `/auth/google/callback` | GET | OAuth callback | Public |
| `/dashboard` | GET | Stock dashboard | Required |
| `/api/stocks-data` | GET | Get mock stock data | Required |
| `/api/user` | GET | Get current user info | Required |
| `/logout` | GET | Logout user | Required |

---

## 🎨 Features

✅ **Google OAuth 2.0 Authentication**
- Secure login with Google
- User profile display
- Session management

✅ **Stock Market Dashboard**
- Real-time stock data (mock)
- Portfolio statistics
- Market watch table
- Responsive design

✅ **Professional UI**
- Modern gradient design
- Mobile-friendly
- Dark/light theme compatible

---

## 📊 Mock Data

The app includes 6 mock stocks:

| Symbol | Company | Price | Change |
|--------|---------|-------|--------|
| AAPL | Apple Inc. | $182.45 | +2.35% |
| GOOGL | Alphabet Inc. | $145.78 | -0.83% |
| MSFT | Microsoft Corp. | $378.91 | +1.46% |
| AMZN | Amazon.com Inc. | $178.43 | +1.77% |
| TSLA | Tesla Inc. | $242.84 | -3.48% |
| NVDA | NVIDIA Corp. | $895.34 | +1.41% |

---

## 🔒 Security Notes

⚠️ **For Development Only:**
- Session secret is hardcoded (change in production)
- HTTPS is disabled locally (enable with SSL)
- No database implementation (add for production)
- Mock data only (integrate real stock API)

✅ **Production Recommendations:**
1. Use environment variables for all secrets
2. Implement database (MongoDB, PostgreSQL)
3. Add HTTPS/SSL certificates
4. Implement refresh token rotation
5. Add rate limiting
6. Store user data securely
7. Use secure session storage

---

## 🐛 Troubleshooting

### Issue: "Invalid Client ID" Error
**Solution:** 
- Check that Client ID and Secret are correct
- Verify they're copied without extra spaces

### Issue: Redirect URI Mismatch
**Solution:**
- Ensure CALLBACK_URL matches Google Console exactly
- Both must be: `http://localhost:3000/auth/google/callback`

### Issue: CORS Errors
**Solution:**
- Make sure you're accessing via `http://localhost:3000`
- Not `127.0.0.1:3000`

### Issue: "Cannot find module" Error
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Assignment Checklist

- [x] Google OAuth implementation
- [x] User authentication
- [x] Protected routes
- [x] User profile display
- [x] Session management
- [x] Stock market theme app
- [x] Responsive UI
- [x] Mock data API
- [x] Professional styling
- [x] Complete documentation

---

## 🚀 Deployment

### Deploy to Heroku

1. Create Heroku account
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create your-app-name
   heroku config:set GOOGLE_CLIENT_ID=your_id
   heroku config:set GOOGLE_CLIENT_SECRET=your_secret
   git push heroku main
   ```

4. Update Google Console with Heroku URL:
   ```
   https://your-app-name.herokuapp.com/auth/google/callback
   ```

---

## 📞 Support

For issues:
1. Check Google Cloud Console setup
2. Verify .env file configuration
3. Check server console for error messages
4. Ensure port 3000 is not in use

---

## 📜 License

This is a lab assignment demo. Feel free to modify and use for educational purposes.

---

**Happy Coding! 🎉**

For your lab submission, include:
1. Screenshots of Google Cloud Console setup
2. Screenshots of working login
3. Screenshots of dashboard after login
4. Brief explanation of OAuth flow implemented
