# 🚀 Quick Deploy to Git & Vercel

## Immediate Steps to Deploy

### 1. Run the Deployment Script
```bash
./deploy.sh
```

This will:
- Initialize Git repository
- Create initial commit
- Set up GitHub remote
- Push code to GitHub
- Test frontend build
- Create deployment instructions

### 2. Deploy Backend to Railway

1. **Go to [Railway](https://railway.app/)**
2. **Sign up/Login with GitHub**
3. **Create New Project** → **Deploy from GitHub repo**
4. **Select your repository**
5. **Set Environment Variables:**
   ```
   GOOGLE_SHEETS_CREDS={"type":"service_account","project_id":"your-project","private_key_id":"key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n","client_email":"service-account@project.iam.gserviceaccount.com","client_id":"client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/service-account%40project.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
   SPREADSHEET_ID=your-spreadsheet-id
   RAW_MATERIAL_SHEET=Raw Material Master
   STOCK_IN_SHEET=Stock In
   STOCK_OUT_SHEET=Stock Out
   API_HOST=0.0.0.0
   API_PORT=8000
   DEBUG=False
   ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app"]
   ```
6. **Deploy and copy the generated URL**

### 3. Deploy Frontend to Vercel

1. **Go to [Vercel](https://vercel.com/)**
2. **Sign up/Login with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. **Set Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
   NEXT_PUBLIC_APP_ENV=production
   ```
7. **Deploy**

### 4. Set Up Google Sheets

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project

2. **Enable Google Sheets API**
   - Navigate to APIs & Services > Library
   - Search for "Google Sheets API"
   - Enable the API

3. **Create Service Account**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "Service Account"
   - Download the JSON key file

4. **Create Google Sheet**
   - Create new Google Sheet
   - Share with service account email
   - Copy spreadsheet ID from URL

5. **Set up Sheet Structure**
   - Use the structure from `sample_sheets_structure.md`
   - Create 3 sheets: Raw Material Master, Stock In, Stock Out

### 5. Create Google Form

1. **Create Google Form for stock entry**
2. **Copy form URL**
3. **Update `NEXT_PUBLIC_GOOGLE_FORM_URL` in Vercel**

## 🔧 Environment Variables Summary

### Backend (Railway)
```
GOOGLE_SHEETS_CREDS=your-service-account-json
SPREADSHEET_ID=your-spreadsheet-id
RAW_MATERIAL_SHEET=Raw Material Master
STOCK_IN_SHEET=Stock In
STOCK_OUT_SHEET=Stock Out
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False
ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app"]
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
NEXT_PUBLIC_APP_ENV=production
```

## 🎯 What You'll Get

After deployment, you'll have:

- **Live Dashboard**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.railway.app`
- **Real-time Data**: Connected to your Google Sheets
- **Smart Alerts**: Automatic low stock notifications
- **Google Form Integration**: Direct restock buttons
- **Mobile Responsive**: Works on all devices
- **Dark/Light Mode**: Beautiful theme switching

## 🚨 Quick Troubleshooting

### Frontend Issues
- Check Vercel build logs
- Verify environment variables
- Test build locally: `cd frontend && npm run build`

### Backend Issues
- Check Railway logs
- Verify Google Sheets credentials
- Test API: `curl https://your-backend-url.railway.app/health`

### Data Issues
- Check Google Sheets permissions
- Verify service account access
- Test API endpoints manually

## 📞 Need Help?

1. **Check logs** in Vercel/Railway dashboards
2. **Verify environment variables** are set correctly
3. **Test API endpoints** manually
4. **Review detailed setup** in `README.md`
5. **Check deployment guide** in `DEPLOYMENT.md`

---

**Your inventory system will be live in minutes! 🚀**
