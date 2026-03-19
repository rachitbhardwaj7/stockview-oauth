# 🚀 Deploy to Google Cloud - Complete Guide

## Overview

Deploy your StockView OAuth app to **Google Cloud Run** (free tier available!) so it's accessible to everyone.

---

## ✅ Prerequisites

- Google Cloud Account (create at: https://cloud.google.com)
- Google Cloud SDK (Install from: https://cloud.google.com/sdk/docs/install)
- Your OAuth app already created in Google Console

---

## 📋 Step-by-Step Deployment

### Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com
2. Click on project dropdown (top left)
3. Click "NEW PROJECT"
4. **Project name:** `StockView-OAuth`
5. Click "CREATE"
6. Switch to this new project

### Step 2: Enable Required APIs

In Google Cloud Console, search for and enable:

1. Click search bar at top
2. Search: **Cloud Run API**
3. Click it → **ENABLE**
4. Search: **Cloud Build API**
5. Click it → **ENABLE**

### Step 3: Install Google Cloud SDK

**On Windows:**
```bash
# Download and install from:
https://cloud.google.com/sdk/docs/install-gcloud-sdk

# Then run:
gcloud init
gcloud auth application-default login
```

### Step 4: Create Production Files

#### 4.1: Create `app.yaml`

```bash
# Navigate to your project
cd d:\cc_lab\google-oauth-stock-app
```

**Create file:** `app.yaml`

```yaml
runtime: nodejs18

env: standard

instance_class: F1

env_variables:
  PORT: "8080"

handlers:
- url: /.*
  script: auto

automatic_scaling:
  min_instances: 1
  max_instances: 10
```

#### 4.2: Create `Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

ENV PORT=8080

CMD ["node", "server.js"]
```

#### 4.3: Update `server.js` for Production

Change the port line to:
```javascript
const PORT = process.env.PORT || 8080;
```

#### 4.4: Create `.env.production`

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=change-this-to-random-secret
PORT=8080
CALLBACK_URL=https://your-app-name.run.app/auth/google/callback
NODE_ENV=production
```

---

## 🌐 Update Google OAuth Credentials

### Step 5: Update Google Console Redirect URIs

1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth credential (StockView App)
3. Edit it
4. **Add** these redirect URIs:
   ```
   https://your-app-name.run.app
   https://your-app-name.run.app/auth/google/callback
   ```
5. Click "SAVE"

---

## 🚀 Step 6: Deploy to Google Cloud Run

### Option A: Using gcloud CLI (Recommended)

```bash
# Set your project
gcloud config set project your-project-id

# Deploy directly
gcloud run deploy stockview-app \
  --source . \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLIENT_ID=your_client_id,GOOGLE_CLIENT_SECRET=your_client_secret,SESSION_SECRET=your_session_secret,CALLBACK_URL=https://stockview-app.run.app/auth/google/callback
```

### Option B: Using Google Cloud Console

1. Go to: https://console.cloud.google.com/run/create
2. Click "Deploy one off"
3. Select "Container image URL"
4. Container image: `gcr.io/your-project-id/stockview:latest`
5. Service name: `stockview-app`
6. Region: `us-central1`
7. Click "Deploy"

---

## 📊 Step 7: Get Your Live App URL

After deployment, you'll see:

```
Service URL: https://stockview-app-xxxxx.run.app
```

**This is your live app URL!** 🎉

Share this with everyone:
```
https://stockview-app-xxxxx.run.app
```

---

## ✅ Verify Deployment

1. Open: `https://your-app-url.run.app`
2. Test "Sign in with Google"
3. Verify dashboard loads
4. Test logout
5. Test protected routes

---

## 📝 Environment Variables (Cloud Run)

Set these in Google Cloud Run configuration:

| Variable | Value |
|----------|-------|
| `GOOGLE_CLIENT_ID` | From Google Console |
| `GOOGLE_CLIENT_SECRET` | From Google Console |
| `SESSION_SECRET` | Random secret string |
| `CALLBACK_URL` | `https://your-app-url.run.app/auth/google/callback` |
| `PORT` | `8080` |
| `NODE_ENV` | `production` |

---

## 🔒 Additional Security for Production

### Enable HTTPS
- ✅ Google Cloud Run automatically uses HTTPS
- ✅ All traffic is encrypted

### Add Security Headers

Add to `server.js`:

```javascript
const helmet = require('helmet');
app.use(helmet());
```

Install:
```bash
npm install helmet
```

### Update Session Settings

```javascript
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true,        // HTTPS only
    httpOnly: true,      // No JavaScript access
    sameSite: 'lax',     // CSRF protection
    maxAge: 24 * 60 * 60 * 1000
  }
}));
```

---

## 📊 Cost Estimate (Google Cloud Run)

- **Free tier:** 2 million requests/month
- **Compute time:** 180,000 vCPU-seconds/month
- **Memory:** 512 MB
- **Perfect for:** Lab demo & small scale

For your lab, this is **completely free** ✅

---

## 🚨 Troubleshooting Deployment

### Issue: "Build failed"
**Solution:**
```bash
# Check logs
gcloud run logs read stockview-app --limit 50

# Redeploy
gcloud run deploy stockview-app --source .
```

### Issue: "Redirect URI mismatch"
**Solution:**
- Update Google Console with actual cloud URL
- Update CALLBACK_URL in environment variables
- Redeploy

### Issue: "Application Error"
**Solution:**
```bash
# Check logs
gcloud logs read

# Verify .env variables are set
gcloud run services describe stockview-app
```

### Issue: "Cold start taking too long"
**Solution:**
- Upgrade memory in Cloud Run settings
- Or keep 1 minimum instance running (paid)

---

## 🎯 Final Checklist

Before presenting:
- [ ] App deployed to Google Cloud Run
- [ ] Live URL working
- [ ] OAuth login working
- [ ] Dashboard displays correctly
- [ ] All classmates can access
- [ ] Google Console updated with production URLs
- [ ] Environment variables set in Cloud Run

---

## 📱 Share with Class

Create a link to share:

```
📈 StockView - Google OAuth Demo
https://your-app-name.run.app

Try logging in with your Google account!
```

---

## 🔄 Updates & Redeployment

To update the app later:

```bash
# Make changes locally
# Test with: npm start

# Then redeploy:
gcloud run deploy stockview-app --source .
```

---

## 💡 Production Best Practices

✅ Environment variables for secrets
✅ HTTPS encryption (automatic in Cloud Run)
✅ Session security
✅ Protected routes
✅ Error logging
✅ Monitoring

❌ Not using localhost
❌ Not hardcoding secrets
❌ Not using HTTP

---

## 🎉 You Now Have a Live Web App!

Everyone can access:
```
https://your-app-name.run.app
```

Share the URL with your teacher and classmates! 🚀

---

## 📞 Quick Reference

**Deploy command:**
```bash
gcloud run deploy stockview-app --source .
```

**View logs:**
```bash
gcloud run logs read
```

**Get URL:**
```bash
gcloud run services describe stockview-app
```

**Set environment variables:**
```bash
gcloud run deploy stockview-app \
  --set-env-vars KEY=VALUE
```

