# 🚀 Render.com Deployment Guide

## Alternative to Railway (Free Tier Available)

### Step 1: Sign Up for Render
1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account
3. Create a new account

### Step 2: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `tnbcserp/invt_mgmt`
3. Configure the service:
   - **Name**: `inventory-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: `backend`

### Step 3: Set Environment Variables
Add these in Render dashboard:
```
GOOGLE_SHEETS_CREDS=<your-json-credentials>
SPREADSHEET_ID=<your-spreadsheet-id>
RAW_MATERIAL_SHEET=Raw Material Master
STOCK_IN_SHEET=Stock In
STOCK_OUT_SHEET=Stock Out
API_HOST=0.0.0.0
API_PORT=$PORT
DEBUG=False
ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app"]
```

### Step 4: Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Import repository: `tnbcserp/invt_mgmt`
3. Configure:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 5: Set Frontend Environment Variables
```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
NEXT_PUBLIC_GOOGLE_FORM_URL=<your-google-form-url>
NEXT_PUBLIC_APP_ENV=production
```

## Advantages of Render
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Easy environment variables
- ✅ GitHub integration
- ✅ Auto-deploy on push

## Your URLs After Deployment
- **Backend**: `https://your-backend-name.onrender.com`
- **Frontend**: `https://your-project.vercel.app`

## Testing
1. Test backend: `https://your-backend-name.onrender.com/health`
2. Test frontend: Visit your Vercel URL
3. Check if data loads from Google Sheets

---
**This approach gives you a fully functional inventory system for free! 🎉**
