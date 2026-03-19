# 🌐 Local vs Cloud Deployment - Complete Reference

## Overview

Your app can run in two places:

1. **Localhost** (Local Machine) - For development
2. **Google Cloud Run** (Internet) - Everyone can access

---

## ⚖️ Comparison

| Aspect | Localhost | Google Cloud Run |
|--------|-----------|------------------|
| **URL** | `http://localhost:3000` | `https://your-app.run.app` |
| **Port** | 3000 | 8080 |
| **Access** | Only you | Everyone on internet |
| **Cost** | Free | Free (first 2M requests) |
| **Setup** | npm start | gcloud deploy |
| **Time** | Instant | 2-3 minutes |
| **Best For** | Development | Production/Demo |

---

## 📍 Local Development (Localhost)

### Google OAuth Redirect URIs:
```
http://localhost:3000
http://localhost:3000/auth/google/callback
```

### .env Configuration:
```
PORT=3000
NODE_ENV=development
CALLBACK_URL=http://localhost:3000/auth/google/callback
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_secret
```

### How to Run:
```bash
cd d:\cc_lab\google-oauth-stock-app
npm install
npm start
```

### Browser Access:
```
http://localhost:3000
```

### Who Can Access:
- ❌ Only you (locally)
- ❌ Not accessible from internet
- ❌ Not accessible from phone over internet

---

## ☁️ Google Cloud Production Deployment

### Google OAuth Redirect URIs:
```
https://stockview-oauth.run.app
https://stockview-oauth.run.app/auth/google/callback
```
*(Replace `stockview-oauth` with your actual cloud run service name)*

### .env Configuration:
```
PORT=8080
NODE_ENV=production
CALLBACK_URL=https://your-app-name.run.app/auth/google/callback
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_secret
```

### How to Deploy:
```bash
gcloud run deploy stockview-oauth \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLIENT_ID=xxx,GOOGLE_CLIENT_SECRET=yyy,SESSION_SECRET=zzz,CALLBACK_URL=https://stockview-oauth.run.app/auth/google/callback
```

### Browser Access:
```
https://your-app-name.run.app
```

### Who Can Access:
- ✅ Everyone on the internet
- ✅ Your teacher
- ✅ Your classmates
- ✅ From phone/tablet
- ✅ Permanent URL

---

## 🔄 Migration Path (Local → Cloud)

### Step 1: Develop & Test Locally
```bash
# .env set to localhost:3000
npm start
# Test everything at http://localhost:3000
```

### Step 2: Prepare for Cloud
```bash
# Update .env for cloud
PORT=8080
CALLBACK_URL=https://stockview-oauth.run.app/auth/google/callback
```

### Step 3: Update Google OAuth Credentials
- Go to Google Console
- Edit OAuth credential
- Update redirect URIs to cloud URLs
- Save

### Step 4: Deploy
```bash
gcloud run deploy stockview-oauth --source .
```

### Step 5: Test Live
- Open the cloud URL in browser
- Click "Sign in with Google"
- Verify dashboard loads
- Share with classmates!

---

## 🎯 Best Practices

### For Local Development:
✅ Use `http://localhost:3000`
✅ No HTTPS needed (local only)
✅ Fast development cycle
✅ Easy debugging

### For Production (Cloud):
✅ Use `https://your-app.run.app`
✅ HTTPS automatic (Cloud Run)
✅ Run tests before deploying
✅ Monitor logs

---

## 📊 Example Scenarios

### Scenario 1: Showing to Teacher Next Class
**Use:** Google Cloud Run URL
- Teacher can access from anywhere
- Show real production deployment
- More impressive than localhost!

### Scenario 2: Quick Testing
**Use:** Localhost
- Fast development
- Easy debugging
- No deployment needed

### Scenario 3: Lab Final Submission
**Use:** Google Cloud Run URL
- Demonstrate live app
- Teacher can test it themselves
- Everyone can access

---

## 🚀 Recommended Setup for Lab

**Best Practice:**
1. Develop locally (http://localhost:3000)
2. Deploy to Cloud Run for final demo
3. Share cloud URL with teacher
4. Teacher and classmates can access without setup

---

## 🔐 Security Differences

### Localhost:
- Only you see the app
- Can use `http://` (not secure)
- Great for testing

### Google Cloud Run:
- Everyone can access
- Automatic `https://` (encrypted)
- Production-ready security
- Automatic backups

---

## 💡 Key URLs to Remember

**For Your Google Cloud Console:**

**If using Localhost:**
```
http://localhost:3000
http://localhost:3000/auth/google/callback
```

**If using Google Cloud Run:**
```
https://stockview-oauth.run.app
https://stockview-oauth.run.app/auth/google/callback
```

**These MUST match between:**
- Google Console settings
- CALLBACK_URL in .env
- Server configuration

If they don't match → "Redirect URI mismatch" error! ❌

---

## 📝 Decision Tree

```
Do you want to...?

├─ Develop & Test Locally?
│  └─ Use: localhost:3000
│
├─ Show to Teacher (impressive)?
│  └─ Use: Google Cloud Run
│
├─ Have Everyone Access It?
│  └─ Use: Google Cloud Run
│
└─ Submit Lab Assignment?
   └─ Use: Google Cloud Run
      (More professional!)
```

---

## ✅ Deployment Checklist

### Before Going Live:
- [ ] Tested locally (npm start)
- [ ] Google OAuth credentials ready
- [ ] Google Cloud SDK installed
- [ ] Decide on Cloud Run service name
- [ ] Update Google Console with cloud URLs
- [ ] .env configured for cloud
- [ ] No sensitive data in code

### After Deployment:
- [ ] Test login works
- [ ] Dashboard loads
- [ ] Stock data displays
- [ ] Logout works
- [ ] Protection works (try /dashboard without login)
- [ ] Share URL with teacher

---

## 🎓 For Your Lab Assignment

**I recommend: Deploy to Google Cloud Run**

**Why?**
- ✅ Professional appearance
- ✅ Teacher can access easily
- ✅ Show production deployment skills
- ✅ Share live link with everyone
- ✅ Works from any device
- ✅ HTTPS security

**What to say to teacher:**
> "I developed this app locally, then deployed it to Google Cloud Run to make it accessible. Here's the live link:
> 
> https://stockview-oauth.run.app
> 
> Feel free to test it yourself!" 🎉

---

**Ready to go global? Let's deploy to Cloud! 🚀**

