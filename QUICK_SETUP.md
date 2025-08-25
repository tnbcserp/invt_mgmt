# ⚡ Quick Setup Guide

## 🎯 Get Your System Live in 15 Minutes

### Step 1: Google Sheets Setup (5 minutes)
1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project: `inventory-management`
   - Enable Google Sheets API

2. **Create Service Account**:
   - Go to "APIs & Services" → "Credentials"
   - Create Service Account: `inventory-service`
   - Download JSON key file

3. **Create Google Sheet**:
   - Go to [Google Sheets](https://sheets.google.com)
   - Create new spreadsheet: "Raw Material Inventory"
   - Copy spreadsheet ID from URL
   - Share with service account email

### Step 2: Deploy Backend to Render (5 minutes)
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Create Web Service:
   - Repository: `tnbcserp/invt_mgmt`
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Set Environment Variables**:
   ```
   GOOGLE_SHEETS_CREDS=<paste entire JSON content>
   SPREADSHEET_ID=<your-spreadsheet-id>
   RAW_MATERIAL_SHEET=Raw Material Master
   STOCK_IN_SHEET=Stock In
   STOCK_OUT_SHEET=Stock Out
   API_HOST=0.0.0.0
   API_PORT=$PORT
   DEBUG=False
   ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app"]
   ```

### Step 3: Deploy Frontend to Vercel (5 minutes)
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import project: `tnbcserp/invt_mgmt`
4. Configure:
   - Root Directory: `frontend`
   - Framework: Next.js

5. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
   NEXT_PUBLIC_APP_ENV=production
   ```

## 🔄 Automatic Triggering Flow

```
User visits Vercel URL
    ↓
Frontend loads instantly
    ↓
Frontend calls Render backend APIs
    ↓
Backend fetches data from Google Sheets
    ↓
Dashboard displays real-time data
```

## 🎉 What You Get
- **Live Dashboard**: `https://your-project.vercel.app`
- **Real-time Data**: From Google Sheets
- **Smart Alerts**: Low stock notifications
- **Mobile Responsive**: Works on all devices
- **Dark/Light Mode**: Theme switching
- **Interactive Charts**: Stock trends
- **Search & Filter**: Easy data navigation

## 🚨 Quick Troubleshooting
- **Backend not working**: Check Render logs
- **Frontend not loading**: Check Vercel build logs
- **No data showing**: Verify Google Sheets credentials
- **CORS errors**: Check ALLOWED_ORIGINS setting

## 📞 Need Help?
1. Check the detailed guides in this repository
2. Verify all environment variables are set
3. Test backend health endpoint first
4. Check browser console for errors

---
**Your inventory system will be live and fully functional! 🚀**
