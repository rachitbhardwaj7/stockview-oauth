# 📋 Lab Assignment Presentation - Google OAuth Implementation
## Steps to Show Your Teacher

---

## 🎯 Part 1: Project Setup (Show these steps)

### Step 1.1: Navigate to Project Folder
```bash
cd d:\cc_lab\google-oauth-stock-app
```

### Step 1.2: Verify Dependencies Installed
```bash
npm install
```

### Step 1.3: Show Project Structure
```
google-oauth-stock-app/
├── server.js                 # Main Express server
├── package.json              # Dependencies
├── .env                       # Configuration (hidden from teacher)
├── README.md                 # Documentation
│
├── views/
│   ├── index.ejs             # Login page
│   └── dashboard.ejs         # Stock dashboard
│
└── public/
    ├── css/style.css         # Styling
    └── js/dashboard.js       # Frontend logic
```

---

## 🔐 Part 2: Google Cloud Console Setup (Show these steps)

### Step 2.1: Create Google OAuth Project
**Path:** https://console.cloud.google.com

1. Click "Create Project"
2. Name: `StockView-OAuth`
3. Click "Create"

### Step 2.2: Enable OAuth Consent Screen
**Path:** APIs & Services → OAuth consent screen

1. Select "External"
2. Click "Create"
3. Fill in:
   - **App name:** StockView
   - **User support email:** your-email@gmail.com
   - **Developer contact:** your-email@gmail.com
4. Click "Save and Continue"

### Step 2.3: Create OAuth Credentials
**Path:** APIs & Services → Credentials

1. Click "Create Credentials" 
2. Select "OAuth Client ID"
3. Choose "Web application"
4. Name: `StockView App`
5. **Add Authorized redirect URIs:**
   ```
   http://localhost:3000
   http://localhost:3000/auth/google/callback
   ```
6. Click "Create"
7. **Copy & Save:**
   - Client ID
   - Client Secret

**⚠️ IMPORTANT POINTS TO MENTION:**
- ✅ Using `http://localhost:3000` for local development
- ✅ Callback URL must match exactly
- ✅ Credentials are secure in .env file

---

## ⚙️ Part 3: Configuration (Show these steps)

### Step 3.1: Create .env File
```bash
copy .env.example .env
```

### Step 3.2: Edit .env with Credentials
**Open .env file and fill:**
```
GOOGLE_CLIENT_ID=your_client_id_from_google
GOOGLE_CLIENT_SECRET=your_client_secret_from_google
SESSION_SECRET=my-secret-key-123
PORT=3000
CALLBACK_URL=http://localhost:3000/auth/google/callback
```

**Points to explain:**
- CLIENT_ID and CLIENT_SECRET from Google Console
- SESSION_SECRET for secure sessions
- CALLBACK_URL must match Google Console

---

## 🚀 Part 4: Running the Application

### Step 4.1: Start the Server
```bash
npm start
```

**Expected Output:**
```
Server running on http://localhost:3000

⚠️  Make sure to add these URLs to Google Cloud Console:
   - http://localhost:3000
   - http://localhost:3000/auth/google/callback
```

### Step 4.2: Open in Browser
- URL: `http://localhost:3000`

---

## ✅ Part 5: Demonstrate OAuth Flow to Teacher

### 5.1: Show Login Page
**What to show:**
- ✅ Homepage with "Sign in with Google" button
- ✅ Beautiful UI with gradient background
- ✅ Professional stock market theme

### 5.2: Click "Sign in with Google"
**What happens:**
1. Redirects to Google login page
2. User selects their Google account
3. Grants permissions

### 5.3: After Login - Show Dashboard
**What to show:**
- ✅ User profile picture (from Google)
- ✅ User's name and email
- ✅ Portfolio statistics
- ✅ Stock market data table
- ✅ OAuth session information

**Key points to explain:**
```
Welcome, [User's Name]!
- Data from: Google OAuth
- Email: [Google email]
- Session Status: Active ✓
- Portfolio: $128,450.50
- 6 Stocks tracked: AAPL, GOOGL, MSFT, AMZN, TSLA, NVDA
```

### 5.4: Show Protected Routes
**Try accessing without login:**
```bash
# In new browser tab, try:
http://localhost:3000/dashboard
```
**Expected:** Redirected to login page (protection working ✓)

### 5.5: Show Logout
- Click "Logout" button
- Verify redirected to home page
- Try accessing dashboard - should require login again

---

## 📊 Part 6: Technical Explanation (What to explain)

### 6.1: OAuth 2.0 Flow
```
User clicks "Sign in" 
    ↓
Redirects to Google Login
    ↓
Google authenticates user
    ↓
Google redirects back with authorization code
    ↓
Server exchanges code for access token
    ↓
Fetch user profile (name, email, photo)
    ↓
Create session
    ↓
Redirect to Dashboard (authenticated)
```

### 6.2: Key Technologies
- **Node.js + Express:** Backend server
- **Passport.js:** OAuth handling
- **Express-Session:** Session management
- **EJS:** Template rendering
- **CSS:** Responsive design

### 6.3: Security Features Implemented
- ✅ OAuth 2.0 protocol
- ✅ Secure session management
- ✅ Protected routes (authentication required)
- ✅ Environment variables for secrets
- ✅ HttpOnly cookies
- ✅ CSRF protection

---

## 📁 Part 7: Show Code Files to Teacher

### 7.1: Server.js Highlights
**Show these parts:**
```javascript
// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  }, ...)

// Protected route example
app.get('/dashboard', (req, res) => {
  if (!req.user) return res.redirect('/');
  res.render('dashboard', { user: req.user });
});
```

### 7.2: Routes Overview
| Route | Purpose | Protected |
|-------|---------|-----------|
| `/` | Login page | ❌ No |
| `/auth/google` | Start login | ❌ No |
| `/auth/google/callback` | OAuth callback | ❌ No |
| `/dashboard` | Stock dashboard | ✅ Yes |
| `/logout` | Logout | ✅ Yes |
| `/api/stocks-data` | Stock data API | ✅ Yes |

### 7.3: View Files
- **index.ejs:** Login page with Google button
- **dashboard.ejs:** Dashboard with user info and stocks

---

## 🎓 Part 8: Learning Outcomes Summary

**Explain what was learned:**

1. ✅ **OAuth 2.0 Protocol**
   - How OAuth handles authentication
   - Authorization flow
   - Token management

2. ✅ **Google OAuth Implementation**
   - Creating OAuth credentials
   - Configuring redirect URIs
   - Handling callbacks

3. ✅ **Session Management**
   - Storing user sessions
   - Authentication middleware
   - Protected routes

4. ✅ **Full-Stack Development**
   - Backend: Node.js + Express + Passport
   - Frontend: EJS templates + CSS
   - Integration between layers

5. ✅ **Security Best Practices**
   - Protecting routes
   - Storing secrets safely
   - Session security

---

## 🎬 Quick Demo Script (2 minutes)

### Say this to your teacher:

> "I've built a Stock Market Dashboard with Google OAuth 2.0 authentication. 
> 
> Let me show you:
> 
> 1. **The app is running** on localhost:3000
> 2. **This is the login page** - users can sign in with their Google account
> 3. **I'm clicking the Google button** - notice it redirects to Google's login
> 4. **After login**, we're redirected back with the user's profile data
> 5. **The dashboard shows** the user's name, email, and a stock market feed
> 6. **The logout button** ends the session and returns to login
> 7. **If we try accessing the dashboard directly** without logging in, we get redirected - the route is protected
> 
> The app uses:
> - Passport.js for OAuth handling
> - Express-Session for session management
> - Google OAuth 2.0 for secure authentication
> 
> All user data comes from Google, and the session is managed server-side."

---

## 📸 Screenshots to Prepare

Take screenshots and save them for presentation:

1. **Google Cloud Console - Credentials setup**
   - Show Client ID and redirect URIs
   
2. **Login Page**
   - Show the "Sign in with Google" button
   
3. **Google Login Prompt**
   - Show Google's authentication dialog
   
4. **Dashboard After Login**
   - Show user profile + stock data
   
5. **Logout & Protection Demo**
   - Show redirect to login after logout

---

## ✅ Presentation Checklist

Before showing to teacher:
- [ ] npm installation complete (no errors)
- [ ] .env file created with real credentials
- [ ] Google OAuth credentials obtained
- [ ] Server running without errors
- [ ] Login redirects to Google
- [ ] Dashboard loads after login
- [ ] User profile displays correctly
- [ ] Stock data loads
- [ ] Logout works
- [ ] Protected routes work (redirect if not logged in)

---

## 🚨 If Something Goes Wrong

| Problem | Quick Fix |
|---------|-----------|
| "Invalid Client ID" | Check .env - credentials copied correctly? |
| "Redirect URI mismatch" | Check Google Console - URLs match exactly? |
| Port error (3000 in use) | Change port in .env to 3001 |
| npm install error | Delete node_modules, run: `npm install` again |
| Blank page after login | Check browser console (F12) for errors |

---

## 🎉 You're Ready to Present!

**Good luck with your lab assignment! 📈**

Remember to explain:
- Why you chose stock market theme
- How OAuth works
- Security benefits
- Potential improvements (real API, database, etc.)

