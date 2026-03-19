require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    const user = {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
      accessToken: accessToken
    };
    return done(null, user);
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes

// Home page
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Google OAuth login
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// Dashboard (Protected route)
app.get('/dashboard', (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('dashboard', { user: req.user });
});

// API endpoint for stock data
app.get('/api/stocks-data', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Mock stock data
  const mockStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.45, change: 2.35, changePercent: 1.31 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 145.78, change: -1.22, changePercent: -0.83 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 5.45, changePercent: 1.46 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.43, change: 3.12, changePercent: 1.77 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.84, change: -8.76, changePercent: -3.48 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 895.34, change: 12.45, changePercent: 1.41 }
  ];

  res.json(mockStocks);
});

// Logout
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// User profile API
app.get('/api/user', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json(req.user);
});

// Start server
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`\n⚠️  Make sure to add these URLs to Google Cloud Console:`);
    console.log(`   - http://localhost:${PORT}`);
    console.log(`   - http://localhost:${PORT}/auth/google/callback`);
  } else {
    console.log(`\n✅ Production server running on port ${PORT}`);
    console.log(`🌐 Cloud Run URL: https://your-app-name.run.app`);
    console.log(`📍 Make sure these URLs are in Google Cloud Console:`);
    console.log(`   - https://your-app-name.run.app`);
    console.log(`   - https://your-app-name.run.app/auth/google/callback`);
  }
});
