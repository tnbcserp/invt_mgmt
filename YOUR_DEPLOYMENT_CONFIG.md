# 🎯 Your Specific Deployment Configuration

## 📊 Your Google Sheets
- **Spreadsheet URL**: https://docs.google.com/spreadsheets/d/1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24/edit
- **Spreadsheet ID**: `1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24`

## 🚀 Backend Deployment to Render

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: `inventory-management`
3. Enable Google Sheets API

### Step 2: Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Create Service Account: `inventory-service`
3. Download JSON key file
4. Copy the entire JSON content

### Step 3: Share Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24/edit
2. Click "Share" button
3. Add your service account email (from JSON file)
4. Give "Editor" access
5. Click "Send"

### Step 4: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Create Web Service:
   - Repository: `tnbcserp/invt_mgmt`
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Step 5: Set Environment Variables in Render
Add these exact environment variables:

```
GOOGLE_SHEETS_CREDS={"type":"service_account","project_id":"your-project","private_key_id":"key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n","client_email":"service-account@project.iam.gserviceaccount.com","client_id":"client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/service-account%40project.iam.gserviceaccount.com","universe_domain":"googleapis.com"}

SPREADSHEET_ID=1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24

RAW_MATERIAL_SHEET=Raw Material Master
STOCK_IN_SHEET=Stock In
STOCK_OUT_SHEET=Stock Out

API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False
ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app"]
```

**Note**: Render will automatically set the `PORT` environment variable, so you don't need to set `API_PORT` manually.

## 🎨 Frontend Deployment to Vercel

### Step 1: Deploy Frontend
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import repository: `tnbcserp/invt_mgmt`
4. Configure:
   - Root Directory: `frontend`
   - Framework: Next.js

### Step 2: Set Environment Variables in Vercel
```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
NEXT_PUBLIC_APP_ENV=production
```

## 🔍 Verify Your Google Sheets Structure

Your sheet should have these tabs:
1. **Raw Material Master** - Product master data
2. **Stock In** - Inward stock entries
3. **Stock Out** - Outward stock entries

## 🧪 Test Your Deployment

### Test Backend
1. Visit: `https://your-backend-name.onrender.com/health`
2. Should return: `{"status": "healthy", "message": "Inventory API is running"}`

### Test API Endpoints
- `/api/v1/raw-materials` - Get your raw materials
- `/api/v1/stock-in` - Get stock in data
- `/api/v1/stock-out` - Get stock out data
- `/api/v1/dashboard` - Get dashboard KPIs

### Test Frontend
1. Visit your Vercel URL
2. Dashboard should load with data from your Google Sheets
3. Test all features: alerts, charts, tables, theme switching

## 🎯 Expected Result
- **Backend**: `https://your-backend-name.onrender.com`
- **Frontend**: `https://your-project.vercel.app`
- **Data Source**: Your Google Sheets (ID: 1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24)

## 🚨 Troubleshooting
- **No data showing**: Check if service account has access to your sheet
- **CORS errors**: Update ALLOWED_ORIGINS with your Vercel domain
- **API errors**: Check Render logs for detailed error messages

---
**Your inventory system will connect to your specific Google Sheets! 🚀**
