# Raw Material Inventory Management System

A complete, production-ready inventory management system with real-time dashboard, Google Sheets integration, and smart alerts.

## 🚀 Features

- **📊 Real-time Dashboard**: Live inventory overview with KPIs and analytics
- **🔗 Google Sheets Integration**: Use Google Sheets as your database
- **🚨 Smart Alert System**: Automatic low stock alerts with Google Form integration
- **🌙 Dark/Light Mode**: Beautiful theme switching
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **📈 Interactive Charts**: Visualize stock trends and movements
- **🔍 Search & Filter**: Find items quickly with advanced search
- **⚡ Fast Performance**: Built with Next.js 14 and FastAPI

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Google Sheets │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (Database)    │
│   - Dashboard   │    │   - APIs        │    │   - Raw Mat.    │
│   - Charts      │    │   - Calculations│    │   - Stock In    │
│   - Alerts      │    │   - Auth        │    │   - Stock Out   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
inventory-system/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── core/           # Configuration
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Google Sheets service
│   │   └── main.py         # FastAPI app
│   ├── requirements.txt    # Python dependencies
│   ├── env.example        # Environment template
│   └── README.md          # Backend documentation
├── frontend/               # Next.js Frontend
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   ├── package.json       # Node dependencies
│   ├── env.example       # Environment template
│   └── README.md         # Frontend documentation
└── README.md             # This file
```

## 🛠️ Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- Google Cloud Project with Sheets API enabled
- Google Service Account credentials

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Copy environment template
cp env.example .env

# Configure your Google Sheets credentials
# Edit .env with your actual values
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Copy environment template
cp env.example .env.local

# Configure API URL and Google Form
# Edit .env.local with your actual values
```

### 3. Google Sheets Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google Sheets API**
   - Navigate to APIs & Services > Library
   - Search for "Google Sheets API"
   - Enable the API

3. **Create Service Account**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "Service Account"
   - Download the JSON key file

4. **Configure Google Sheet**
   - Create a new Google Sheet
   - Share it with your service account email
   - Copy the spreadsheet ID from the URL

5. **Set up Sheets Structure**
   - **Raw Material Master**: RM ID, Product Name, Unit, Avg. Cost per Unit, Cost per Unit, Reorder Level
   - **Stock In**: Date, Product ID, Product Name, Quantity In, Cost per Unit, Remarks
   - **Stock Out**: Date, Product ID, Product Name, Quantity Out, Remarks, Distributed To, Current Stock

### 4. Environment Configuration

#### Backend (.env)
```env
GOOGLE_SHEETS_CREDS='{"type":"service_account",...}'
SPREADSHEET_ID="your-spreadsheet-id"
RAW_MATERIAL_SHEET="Raw Material Master"
STOCK_IN_SHEET="Stock In"
STOCK_OUT_SHEET="Stock Out"
API_HOST="0.0.0.0"
API_PORT=8000
DEBUG=True
ALLOWED_ORIGINS=["http://localhost:3000"]
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
```

### 5. Run the Application

```bash
# Terminal 1 - Backend
cd backend
python run.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your dashboard!

## 🚀 Deployment

### Backend Deployment

#### Railway (Recommended)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically

#### Google Cloud Run
```bash
# Build and deploy
gcloud run deploy inventory-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Docker
```bash
# Build image
docker build -t inventory-api .

# Run container
docker run -p 8000:8000 --env-file .env inventory-api
```

### Frontend Deployment

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
   - `NEXT_PUBLIC_GOOGLE_FORM_URL`: Your Google Form URL
3. Deploy automatically

#### Netlify
1. Connect repository to Netlify
2. Set environment variables
3. Deploy with build command: `npm run build`

## 📊 Dashboard Features

### Overview Cards
- **Total Products**: Number of active raw materials
- **Total Stock Value**: Current inventory value in INR
- **Low Stock Alerts**: Items below reorder level
- **Monthly Movement**: Stock in vs stock out trends

### Interactive Charts
- **Stock Trends**: Line chart showing stock movements over time
- **Real-time Data**: Updates automatically from Google Sheets

### Data Tables
- **Raw Materials Master**: Complete product catalog with search
- **Current Stock**: Real-time stock levels with status indicators
- **Stock Movements**: Recent transactions with filtering

### Alert System
- **Smart Detection**: Automatically identifies low stock items
- **Google Form Integration**: Direct restock action buttons
- **Dismissible Alerts**: Users can manage notifications

## 🔧 API Endpoints

### Dashboard
- `GET /api/v1/dashboard` - Dashboard KPIs and overview
- `GET /api/v1/current-stock` - Current stock levels
- `GET /api/v1/alerts` - Stock alerts
- `GET /api/v1/trends` - Stock movement trends

### Raw Materials
- `GET /api/v1/raw-materials` - All raw materials
- `GET /api/v1/raw-materials/{rm_id}` - Specific material

### Stock Management
- `GET /api/v1/stock-in` - Stock in records
- `GET /api/v1/stock-in/recent` - Recent stock in
- `GET /api/v1/stock-out` - Stock out records
- `GET /api/v1/stock-out/recent` - Recent stock out

## 🎨 Customization

### Styling
- Modify `frontend/app/globals.css` for custom colors
- Update `frontend/tailwind.config.js` for theme customization
- Edit component styles in individual component files

### Google Form Integration
1. Create a Google Form for stock entry
2. Update `NEXT_PUBLIC_GOOGLE_FORM_URL` in frontend environment
3. Customize form pre-filling in `AlertSystem.tsx`

### Data Structure
- Modify sheet names in backend environment
- Update column mappings in `GoogleSheetsService`
- Adjust data processing in frontend components

## 🔒 Security

- **CORS Configuration**: Configured for production domains
- **Environment Variables**: Sensitive data stored securely
- **API Rate Limiting**: Implement rate limiting for production
- **Input Validation**: All inputs validated on backend

## 📈 Performance

- **Caching**: Implement Redis for production caching
- **Database Optimization**: Index Google Sheets for faster queries
- **CDN**: Use Vercel's global CDN for frontend
- **Monitoring**: Add logging and monitoring for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the individual README files in `backend/` and `frontend/`
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🎯 Roadmap

- [ ] User authentication and authorization
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Barcode scanning integration
- [ ] Email notifications
- [ ] Multi-location support
- [ ] Supplier management
- [ ] Purchase order automation

---

**Built with ❤️ using Next.js, FastAPI, and Google Sheets**
