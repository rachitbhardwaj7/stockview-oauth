# OAuth 2.0 Flow Diagram for StockView

## How Google OAuth Works in This App

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. USER VISITS APP                                         │
│     └─> http://localhost:3000                              │
│     └─> Sees: "Sign in with Google" button                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  2. USER CLICKS BUTTON                                      │
│     └─> Redirects to: /auth/google                         │
│     └─> Passport triggers Google auth request              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  3. REDIRECTED TO GOOGLE                                    │
│     └─> User sees Google login page                        │
│     └─> User enters email & password                       │
│     └─> User grants app permissions                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  4. GOOGLE REDIRECTS BACK                                   │
│     └─> To: http://localhost:3000/auth/google/callback    │
│     └─> With authorization code                           │
│     └─> Server exchanges code for access token            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  5. USER AUTHENTICATED                                      │
│     └─> Session created                                    │
│     └─> User profile fetched                               │
│     └─> Redirected to: /dashboard                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  6. DASHBOARD LOADED                                        │
│     └─> User info displayed (from Google)                  │
│     └─> Stock data shown                                   │
│     └─> Can access protected routes                        │
│     └─> Can logout                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Server-Side Flow

```
StockView App (localhost:3000)
    │
    ├─ Route: / (index)
    │   └─ Unauthenticated: Show login page
    │   └─ Authenticated: Redirect to /dashboard
    │
    ├─ Route: /auth/google
    │   └─ Trigger: passport.authenticate('google')
    │   └─ Request scope: profile, email
    │   └─ Redirect to Google OAuth server
    │
    ├─ Route: /auth/google/callback
    │   └─ Google sends back: authorization code
    │   └─ Server exchanges for: access token + user info
    │   └─ Create session
    │   └─ Redirect to: /dashboard
    │
    ├─ Route: /dashboard (PROTECTED)
    │   └─ Check: if req.user (authenticated?)
    │   └─ If yes: Show stock dashboard
    │   └─ If no: Redirect to /
    │
    ├─ Route: /api/stocks-data (PROTECTED)
    │   └─ Returns: Mock stock data
    │   └─ Only if authenticated
    │
    └─ Route: /logout
        └─ Destroy session
        └─ Redirect to: /
```

## Key Components

### 1. Passport.js
- Handles authentication strategy
- Manages user serialization/deserialization
- Handles session

### 2. Express-Session
- Creates HTTP sessions
- Stores user data between requests
- Auto-managed cookies

### 3. dotenv
- Loads environment variables from .env
- Keeps secrets safe

### 4. Google API
- Provides OAuth authorization
- Returns user profile data
- Manages tokens

## Data Flow

```
┌──────────────────────┐
│   .env file          │
│ (CLIENT_ID, SECRET)  │
└──────────────────────┘
          ▼
┌──────────────────────────────┐
│   server.js                  │
│ (Express + Passport setup)   │
└──────────────────────────────┘
          ▼
┌──────────────────────────────┐
│   Public folder              │
│ (HTML, CSS, JS)              │
└──────────────────────────────┘
          ▼
┌──────────────────────────────┐
│   User's Browser             │
│ (Rendered web pages)         │
└──────────────────────────────┘
```

## Security Checklist

✅ **Implemented:**
- OAuth 2.0 protocol
- Session management
- Protected routes (authentication check)
- Environment variables for secrets

⚠️ **Add in Production:**
- HTTPS/SSL
- CSRF protection
- Database encryption
- Rate limiting
- Secure cookies (httpOnly, secure flags)
- Refresh token rotation

## Testing Checklist

1. [ ] Server starts without errors
2. [ ] Home page loads and shows login button
3. [ ] Click login button
4. [ ] Redirected to Google login
5. [ ] Login with Google account
6. [ ] Granted permissions
7. [ ] Redirected back to app
8. [ ] Dashboard loads with user info
9. [ ] Stock table populates
10. [ ] Logout works
11. [ ] Try accessing /dashboard without login - should redirect
12. [ ] API returns 401 when not authenticated

---

**Your LocalHost URLs:**

For Google Cloud Console → "Authorized redirect URIs":
```
http://localhost:3000
http://localhost:3000/auth/google/callback
```

For local testing:
- App: http://localhost:3000
- Callback: http://localhost:3000/auth/google/callback
- Dashboard: http://localhost:3000/dashboard
