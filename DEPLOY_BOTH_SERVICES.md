# 🚀 Deploy Backend (Render) + Frontend (Vercel)

## Step-by-Step Deployment Guide

### Phase 1: Deploy Backend to Render.com

#### 1.1 Sign Up for Render
1. Go to [Render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account
4. Complete the registration

#### 1.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `tnbcserp/invt_mgmt`
3. Configure the service:
   - **Name**: `inventory-backend`
   - **Environment**: `Python 3`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

#### 1.3 Set Environment Variables
In Render dashboard, add these environment variables:
```
GOOGLE_SHEETS_CREDS={"type":"service_account","project_id":"your-project","private_key_id":"key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n","client_email":"service-account@project.iam.gserviceaccount.com","client_id":"client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/service-account%40project.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
SPREADSHEET_ID=your-spreadsheet-id
RAW_MATERIAL_SHEET=Raw Material Master
STOCK_IN_SHEET=Stock In
STOCK_OUT_SHEET=Stock Out
API_HOST=0.0.0.0
API_PORT=$PORT
DEBUG=False
ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app"]
```

#### 1.4 Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Copy your backend URL: `https://inventory-backend-xxxx.onrender.com`

### Phase 2: Deploy Frontend to Vercel

#### 2.1 Sign Up for Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your repositories

#### 2.2 Import Project
1. Click "New Project"
2. Import repository: `tnbcserp/invt_mgmt`
3. Configure project:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### 2.3 Set Environment Variables
Add these in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://inventory-backend-xxxx.onrender.com
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
NEXT_PUBLIC_APP_ENV=production
```

#### 2.4 Deploy Frontend
1. Click "Deploy"
2. Wait for deployment (1-2 minutes)
3. Copy your frontend URL: `https://your-project.vercel.app`

### Phase 3: Test Integration

#### 3.1 Test Backend
1. Visit: `https://inventory-backend-xxxx.onrender.com/health`
2. Should return: `{"status": "healthy", "message": "Inventory API is running"}`

#### 3.2 Test Frontend
1. Visit your Vercel URL
2. The frontend should automatically fetch data from the backend
3. Check browser console for any errors

#### 3.3 Test Data Flow
1. Open browser developer tools (F12)
2. Go to Network tab
3. Refresh the page
4. You should see API calls to your Render backend

### Phase 4: Automatic Triggering

#### 4.1 How It Works
- When someone visits your Vercel frontend
- The frontend automatically makes API calls to your Render backend
- Backend fetches data from Google Sheets
- Data is displayed in the dashboard

#### 4.2 Verify Integration
1. Visit your Vercel URL
2. Check if dashboard loads with data
3. Test dark/light mode toggle
4. Test alert system
5. Test responsive design

## 🔗 Your Live URLs
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://inventory-backend-xxxx.onrender.com`
- **GitHub**: `https://github.com/tnbcserp/invt_mgmt`

## 🎯 Expected Behavior
1. User visits Vercel URL
2. Frontend loads instantly
3. Frontend automatically calls Render backend APIs
4. Backend fetches data from Google Sheets
5. Dashboard displays real-time inventory data
6. All features work: alerts, charts, tables, theme switching

## 🚨 Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify environment variables
- Test backend health endpoint

### Frontend Issues
- Check Vercel build logs
- Verify API URL in environment variables
- Check browser console for errors

### Integration Issues
- Ensure CORS is configured correctly
- Verify API endpoints are accessible
- Check network connectivity

## 🎉 Success Indicators
- ✅ Backend health check passes
- ✅ Frontend loads without errors
- ✅ Dashboard displays data
- ✅ All interactive features work
- ✅ Mobile responsive design
- ✅ Dark/light mode switching

---
**Your inventory system is now live and fully functional! 🚀**
