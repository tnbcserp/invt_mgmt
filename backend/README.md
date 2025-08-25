# Raw Material Inventory Backend API

A FastAPI backend for managing raw material inventory using Google Sheets as the database.

## Features

- 🔗 Google Sheets Integration
- 📊 Real-time inventory calculations
- 🚨 Stock alerts and notifications
- 📈 Dashboard KPIs and trends
- 🔒 Secure API with CORS support
- 📝 Comprehensive API documentation

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy the environment template and configure your settings:

```bash
cp env.example .env
```

Update the `.env` file with your Google Sheets credentials:

```env
# Google Sheets API Configuration
GOOGLE_SHEETS_CREDS='{
"type": "service_account",
"project_id": "your-project-id",
"private_key_id": "your-private-key-id",
"private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
"client_email": "your-service-account@your-project.iam.gserviceaccount.com",
"client_id": "your-client-id",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com",
"universe_domain": "googleapis.com"
}'

# Google Sheets Configuration
SPREADSHEET_ID="your-spreadsheet-id"
RAW_MATERIAL_SHEET="Raw Material Master"
STOCK_IN_SHEET="Stock In"
STOCK_OUT_SHEET="Stock Out"

# API Configuration
API_HOST="0.0.0.0"
API_PORT=8000
DEBUG=True

# CORS Configuration
ALLOWED_ORIGINS=["http://localhost:3000", "https://your-frontend-domain.vercel.app"]
```

### 3. Google Sheets Setup

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account
4. Download the service account JSON
5. Share your Google Sheet with the service account email
6. Copy the spreadsheet ID from the URL

### 4. Run the Application

```bash
# Development
python run.py

# Or using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Raw Materials
- `GET /api/v1/raw-materials` - Get all raw materials
- `GET /api/v1/raw-materials/{rm_id}` - Get specific raw material

### Stock Management
- `GET /api/v1/stock-in` - Get all stock in records
- `GET /api/v1/stock-in/recent` - Get recent stock in records
- `GET /api/v1/stock-out` - Get all stock out records
- `GET /api/v1/stock-out/recent` - Get recent stock out records

### Dashboard
- `GET /api/v1/dashboard` - Get dashboard KPIs
- `GET /api/v1/current-stock` - Get current stock levels
- `GET /api/v1/alerts` - Get stock alerts
- `GET /api/v1/trends` - Get stock trends

## Documentation

- API Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically

### Google Cloud Run

```bash
# Build Docker image
docker build -t inventory-api .

# Deploy to Cloud Run
gcloud run deploy inventory-api \
  --image gcr.io/PROJECT_ID/inventory-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Docker

```bash
# Build image
docker build -t inventory-api .

# Run container
docker run -p 8000:8000 --env-file .env inventory-api
```

## Project Structure

```
backend/
├── app/
│   ├── core/
│   │   └── config.py          # Configuration settings
│   ├── routers/
│   │   ├── raw_materials.py   # Raw materials endpoints
│   │   ├── stock_in.py        # Stock in endpoints
│   │   ├── stock_out.py       # Stock out endpoints
│   │   └── dashboard.py       # Dashboard endpoints
│   ├── services/
│   │   └── google_sheets.py   # Google Sheets service
│   └── main.py                # FastAPI application
├── requirements.txt           # Python dependencies
├── run.py                     # Application runner
├── env.example               # Environment template
└── README.md                 # This file
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_SHEETS_CREDS` | Service account JSON credentials | Yes |
| `SPREADSHEET_ID` | Google Sheets spreadsheet ID | Yes |
| `RAW_MATERIAL_SHEET` | Raw materials sheet name | No |
| `STOCK_IN_SHEET` | Stock in sheet name | No |
| `STOCK_OUT_SHEET` | Stock out sheet name | No |
| `API_HOST` | API host address | No |
| `API_PORT` | API port number | No |
| `DEBUG` | Debug mode | No |
| `ALLOWED_ORIGINS` | CORS allowed origins | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
