# ⚡ Quick Google Cloud Deployment - 5 Steps

Deploy your StockView app to the internet in 5 minutes! 🚀

---

## Step 1: Get Google Cloud SDK

**Download & Install:**
https://cloud.google.com/sdk/docs/install

**Then authenticate:**
```bash
gcloud init
gcloud auth application-default login
```

---

## Step 2: Create Google Cloud Project

1. Go to: https://console.cloud.google.com
2. Create new project: `StockView-OAuth`
3. Enable these APIs:
   - Cloud Run API
   - Cloud Build API

---

## Step 3: Update Google OAuth URIs

1. Go to Google Cloud Console → Credentials
2. Edit your OAuth credential
3. **Add these redirect URIs:**
   ```
   https://stockview-oauth.run.app
   https://stockview-oauth.run.app/auth/google/callback
   ```
   (Replace `stockview-oauth` with your chosen name)
4. Save

---

## Step 4: Update .env for Production

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=random-secret-key
CALLBACK_URL=https://stockview-oauth.run.app/auth/google/callback
PORT=8080
NODE_ENV=production
```

---

## Step 5: Deploy!

```bash
# Navigate to project folder
cd d:\cc_lab\google-oauth-stock-app

# Deploy to Google Cloud Run
gcloud run deploy stockview-oauth \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLIENT_ID=your_id,GOOGLE_CLIENT_SECRET=your_secret,SESSION_SECRET=your_secret,CALLBACK_URL=https://stockview-oauth.run.app/auth/google/callback
```

---

## ✅ Done!

You'll see something like:

```
Service URL: https://stockview-oauth-xxxxx.run.app
```

**That's your live app!** 🎉

Share it with your teacher and classmates:
```
https://stockview-oauth-xxxxx.run.app
```

---

## 🎬 Verify It Works

1. Open the URL in browser
2. Click "Sign in with Google"
3. Login with Google account
4. Dashboard should load
5. Try logout

---

## 📊 Cost

✅ **Completely FREE** for lab demos!

- Free tier: 2 million requests/month
- Memory: 512 MB
- VCPUs: Shared

---

## 🔄 Update the App

Made changes locally?

```bash
# Redeploy (takes 2-3 minutes)
gcloud run deploy stockview-oauth --source .
```

---

## 🚨 Troubleshooting

**"Build failed":**
```bash
gcloud run logs read stockview-oauth --limit 20
```

**"Redirect URI mismatch":**
- Verify your actual Cloud Run URL
- Update Google Console
- Update CALLBACK_URL
- Redeploy

**"Port in use locally":**
```bash
# Change PORT in .env to 3001
```

---

## 📱 For Your Teacher

Share this link:
```
📈 Live StockView OAuth App
https://your-cloud-run-url.run.app

✅ Everyone can access it!
✅ Real Google OAuth authentication
✅ Deployed to Google Cloud
```

---

**That's it! Your app is now live globally! 🌍**

