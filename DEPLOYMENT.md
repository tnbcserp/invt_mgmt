# Deployment Guide

This guide will help you deploy the Raw Material Inventory Management System to Git and Vercel.

## 🚀 Quick Deployment Steps

### 1. Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Raw Material Inventory Management System"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/inventory-system.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy Backend (Railway/Google Cloud Run)

#### Option A: Railway (Recommended)
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Create new project from GitHub repo
4. Set environment variables in Railway dashboard:
   ```
   GOOGLE_SHEETS_CREDS={"type":"service_account",...}
   SPREADSHEET_ID=your-spreadsheet-id
   RAW_MATERIAL_SHEET=Raw Material Master
   STOCK_IN_SHEET=Stock In
   STOCK_OUT_SHEET=Stock Out
   API_HOST=0.0.0.0
   API_PORT=8000
   DEBUG=False
   ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app"]
   ```
5. Deploy automatically

#### Option B: Google Cloud Run
```bash
# Build and deploy
gcloud run deploy inventory-api \
  --source ./backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="SPREADSHEET_ID=your-spreadsheet-id"
```

### 3. Deploy Frontend to Vercel

#### Automatic Deployment
1. Go to [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Environment Variables in Vercel
Set these environment variables in Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
NEXT_PUBLIC_APP_ENV=production
```

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy to Vercel
vercel --prod
```

## 📋 Pre-Deployment Checklist

### Backend Setup
- [ ] Google Cloud Project created
- [ ] Google Sheets API enabled
- [ ] Service account created and credentials downloaded
- [ ] Google Sheet created with proper structure
- [ ] Service account email shared with Google Sheet
- [ ] Environment variables configured

### Frontend Setup
- [ ] Google Form created for stock entry
- [ ] API URL configured
- [ ] Google Form URL configured
- [ ] Environment variables set

### Git Setup
- [ ] Repository initialized
- [ ] All files committed
- [ ] Remote repository added
- [ ] Code pushed to GitHub

## 🔧 Environment Variables

### Backend (.env)
```env
GOOGLE_SHEETS_CREDS='{"type":"service_account","project_id":"your-project","private_key_id":"key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n","client_email":"service-account@project.iam.gserviceaccount.com","client_id":"client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/service-account%40project.iam.gserviceaccount.com","universe_domain":"googleapis.com"}'
SPREADSHEET_ID="your-spreadsheet-id"
RAW_MATERIAL_SHEET="Raw Material Master"
STOCK_IN_SHEET="Stock In"
STOCK_OUT_SHEET="Stock Out"
API_HOST="0.0.0.0"
API_PORT=8000
DEBUG=False
ALLOWED_ORIGINS=["https://your-frontend-domain.vercel.app"]
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
NEXT_PUBLIC_APP_ENV=production
```

## 🌐 Domain Configuration

### Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `ALLOWED_ORIGINS` in backend environment variables

## 🔒 Security Considerations

### Production Security
- [ ] Use HTTPS for all communications
- [ ] Set `DEBUG=False` in production
- [ ] Configure proper CORS origins
- [ ] Use environment variables for all secrets
- [ ] Enable Vercel security headers
- [ ] Regular dependency updates

### Google Sheets Security
- [ ] Service account has minimal required permissions
- [ ] Google Sheet is shared only with service account
- [ ] Regular audit of access permissions

## 📊 Monitoring and Analytics

### Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor performance metrics
3. Set up alerts for errors

### Backend Monitoring
1. Use Railway/Google Cloud monitoring
2. Set up health check endpoints
3. Monitor API response times
4. Set up error logging

## 🔄 Continuous Deployment

### Automatic Deployments
- **Frontend**: Automatically deploys on push to main branch
- **Backend**: Automatically deploys on push to main branch (Railway)

### Manual Deployments
```bash
# Frontend
cd frontend
vercel --prod

# Backend (Railway)
# Deploy through Railway dashboard or CLI
```

## 🚨 Troubleshooting

### Common Issues

#### Frontend Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for TypeScript errors

#### Backend Deployment Issues
- Verify environment variables are set correctly
- Check Google Sheets API permissions
- Ensure service account has access to spreadsheet

#### API Connection Issues
- Verify CORS configuration
- Check API URL in frontend environment
- Ensure backend is running and accessible

### Debug Commands
```bash
# Check frontend build locally
cd frontend
npm run build

# Check backend locally
cd backend
python run.py

# Test API endpoints
curl https://your-backend-url.railway.app/health
```

## 📞 Support

If you encounter issues:
1. Check the logs in Vercel/Railway dashboards
2. Verify environment variables are correct
3. Test API endpoints manually
4. Check Google Sheets permissions
5. Review the main README.md for setup instructions

## 🎯 Post-Deployment

After successful deployment:
1. Test all dashboard features
2. Verify Google Sheets integration
3. Test alert system functionality
4. Check mobile responsiveness
5. Monitor performance metrics
6. Set up regular backups of Google Sheets data

---

**Happy Deploying! 🚀**
