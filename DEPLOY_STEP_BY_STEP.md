# 🚀 DEPLOY TO GOOGLE CLOUD - VISUAL STEP-BY-STEP

Perfect for showing your teacher a LIVE app! 🌐

---

## 📋 What You'll Have After This

```
BEFORE: http://localhost:3000
        ↓
AFTER:  https://stockview-xxx.run.app ← Everyone can access!
```

---

## 🎯 Pre-Deployment Checklist (5 min)

- [ ] Google Cloud Account created (cloud.google.com)
- [ ] Google Cloud SDK installed
- [ ] OAuth credentials ready in Google Console
- [ ] App tested locally (npm start works)

---

## STEP 1: Install Google Cloud SDK (5 min)

### Windows Users:

**Download & Install:**
1. Go to: https://cloud.google.com/sdk/docs/install
2. Download "Cloud SDK installer for Windows"
3. Run installer (GoogleCloudSDKInstaller.exe)
4. Click "Install"
5. Let it finish

**Open PowerShell & Test:**
```powershell
gcloud --version
```

Should show:
```
Google Cloud SDK 456.0.0
```

**Authenticate:**
```powershell
gcloud init
```

Then:
```powershell
gcloud auth application-default login
```

---

## STEP 2: Create Google Cloud Project (3 min)

**Option A: Using Console**

1. Go to: https://console.cloud.google.com
2. Top left → Click project dropdown
3. Click "NEW PROJECT"
4. Name: `StockView-OAuth-Lab`
5. Click "CREATE"
6. Switch to it

**Option B: Using CLI**

```powershell
gcloud projects create stockview-oauth-lab
gcloud config set project stockview-oauth-lab
```

---

## STEP 3: Enable Required APIs (2 min)

```powershell
# Enable Cloud Run
gcloud services enable run.googleapis.com

# Enable Cloud Build
gcloud services enable cloudbuild.googleapis.com
```

Or manually in console:
1. Search bar: "Cloud Run API"
2. Click "ENABLE"
3. Search bar: "Cloud Build API"
4. Click "ENABLE"

---

## STEP 4: Update Google OAuth Credentials (3 min)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find: `StockView App` (your OAuth credential)
3. Click edit (pencil icon)
4. Scroll to "Authorized redirect URIs"
5. **Add TWO new URLs:**
   ```
   https://stockview-oauth.run.app
   https://stockview-oauth.run.app/auth/google/callback
   ```
   *(Replace stockview-oauth with your chosen name)*
6. Click "SAVE"

✅ Now Google will accept redirects from your cloud app!

---

## STEP 5: Update .env File (2 min)

Navigate to your project folder:

```powershell
cd d:\cc_lab\google-oauth-stock-app
```

Edit `.env` file. Change these:

```
GOOGLE_CLIENT_ID=your_client_id_from_step_4
GOOGLE_CLIENT_SECRET=your_client_secret_from_step_4
SESSION_SECRET=random-secret-key-here
PORT=8080
NODE_ENV=production
CALLBACK_URL=https://stockview-oauth.run.app/auth/google/callback
```

**Save and close.**

---

## STEP 6: Deploy to Cloud Run (3 min)

```powershell
cd d:\cc_lab\google-oauth-stock-app

gcloud run deploy stockview-oauth `
  --source . `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --set-env-vars GOOGLE_CLIENT_ID=your_id,GOOGLE_CLIENT_SECRET=your_secret,SESSION_SECRET=your_secret,NODE_ENV=production,CALLBACK_URL=https://stockview-oauth.run.app/auth/google/callback
```

**Wait 2-3 minutes...**

---

## ✅ SUCCESS! 🎉

You'll see:

```
Service URL: https://stockview-oauth-xxxxx.run.app
```

**This is your LIVE app URL!**

Copy it:
```
https://stockview-oauth-xxxxx.run.app
```

---

## 🎬 Step 7: Test Your App (2 min)

**Open browser:**
```
https://stockview-oauth-xxxxx.run.app
```

**You should see:**
- ✅ Login page loads
- ✅ "Sign in with Google" button visible
- ✅ Website is HTTPS (secure lock icon)

**Click "Sign in with Google":**
- ✅ Redirected to Google login
- ✅ Login with your Google account
- ✅ Grant permissions

**After login:**
- ✅ Dashboard loads
- ✅ Your name shows (from Google)
- ✅ Your email shows (from Google)
- ✅ Stock data displays
- ✅ Logout button works

---

## 🌐 Step 8: Share with Your Teacher

Copy this link:

```
📈 StockView - Google OAuth Live Demo
https://stockview-oauth-xxxxx.run.app

✅ Deployed to Google Cloud
✅ Real Google OAuth 2.0
✅ Everyone can access!
```

**Send to teacher:**
- Email link
- WhatsApp link
- Slack link
- Discord link
- Print QR code

---

## 📊 Architecture Summary

```
Your Computer (Local)
    ↓ (code)
    ↓ (gcloud deploy)
    ↓
Google Cloud Run
    ↓
Internet
    ↓
Your Teacher's Browser ← Can access from anywhere! ✅
Your Classmates' Devices ← Can also access! ✅
```

---

## 🔄 Made Changes? Redeploy in 10 Seconds

```powershell
# Edit code locally
# Then redeploy:
gcloud run deploy stockview-oauth --source .

# Your app updates live! ✅
```

---

## 💰 Cost Status

**Free Tier Included:**
- ✅ 2 million requests/month
- ✅ 180,000 vCPU-seconds/month
- ✅ For your lab: **COMPLETELY FREE** 🎉

No credit card charges! (unless you go way over limits for a lab app)

---

## 🚨 Common Issues & Fixes

### Issue: "Redirect URI mismatch" ❌
```
Fix: 
1. Check your actual cloud URL
2. Update Google Console with correct URL
3. Update CALLBACK_URL in .env
4. Redeploy
```

### Issue: "Build failed" ❌
```
Fix: Check logs
gcloud run logs read stockview-oauth --limit 20
```

### Issue: "503 Service Error" ❌
```
Fix: Give it more time to start
Wait 30 seconds and refresh
```

---

## 📝 What to Tell Your Teacher

> "I built a Stock Market Dashboard with Google OAuth 2.0 authentication.
>
> Initially I tested it locally on localhost:3000, but for the final demo, I deployed it to Google Cloud Run using Docker. Now it's accessible from anywhere on the internet!
>
> Here's the live link: https://stockview-oauth-xxxxx.run.app
>
> Features demonstrated:
> - Real Google OAuth authentication
> - User profile display
> - Protected routes (requires login)
> - Live to the internet
> - Production deployment to Google Cloud
>
> Try it yourself!"

---

## ✅ Final Checklist

- [ ] Google Cloud SDK installed
- [ ] Google Cloud project created
- [ ] APIs enabled (Cloud Run, Cloud Build)
- [ ] Google OAuth credentials updated
- [ ] .env file updated
- [ ] Deployment command run successfully
- [ ] App URL received
- [ ] App tested (login works)
- [ ] URL shared with teacher
- [ ] Teacher can access it

---

## 🎓 Now You Have:

✅ Local development (localhost:3000)
✅ Production deployment (Google Cloud Run)
✅ Professional setup
✅ Live URL to share
✅ Everyone can test it

---

## 📱 Show Your Teacher This!

```
"Hey Ma'am, here's the live Google OAuth app
deployed to Google Cloud. You can access it
from anywhere:

https://stockview-oauth-xxxxx.run.app

It uses real Google authentication, and anyone
with the link can test it!" 📈
```

---

**Congratulations! Your app is now live on the internet! 🚀**

