# Google Sheets Setup Guide

## Quick Setup Steps

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name: `inventory-management`
4. Click "Create"

### 2. Enable Google Sheets API
1. Go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 3. Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name: `inventory-service-account`
4. Click "Create and Continue"
5. Skip role assignment, click "Continue"
6. Click "Done"

### 4. Generate Service Account Key
1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON"
5. Download the file
6. Copy the entire JSON content

### 5. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet
3. Name it: "Raw Material Inventory"
4. Copy the spreadsheet ID from URL (between /d/ and /edit)

### 6. Set Up Sheet Structure
Create 3 sheets with these headers:

#### Sheet 1: "Raw Material Master"
| RM ID | Product Name | Unit | Avg. Cost per Unit | Cost per Unit | Reorder Level |
|-------|--------------|------|-------------------|---------------|---------------|
| TIL1  | TIL SAMRAT   | Kg   | ₹160              | ₹160          | 50            |
| SARW2 | SARWAR TANDOOR MUSHROOM 800GM TIN | Pcs | ₹135 | ₹135 | 20 |
| FRUI3 | FRUIT COCKTAIL TIN | Pcs | ₹95 | ₹95 | 30 |

#### Sheet 2: "Stock In"
| Date | Product ID | Product Name | Quantity In | Cost per Unit | Remarks |
|------|------------|--------------|-------------|---------------|---------|
| 2024-01-15 | TIL1 | TIL SAMRAT | 100 | ₹160 | Initial stock |

#### Sheet 3: "Stock Out"
| Date | Product ID | Product Name | Quantity Out | Remarks | Distributed To | Current Stock |
|------|------------|--------------|--------------|---------|----------------|---------------|
| 2024-01-17 | TIL1 | TIL SAMRAT | 20 | | Kitchen A | 80 |

### 7. Share Sheet with Service Account
1. Click "Share" button
2. Add your service account email (from JSON file)
3. Give "Editor" access
4. Click "Send"

### 8. Create Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create new form: "Stock Entry Form"
3. Add fields for stock entry
4. Copy the form URL

## Environment Variables

### For Railway (Backend)
```
GOOGLE_SHEETS_CREDS=<paste entire JSON content here>
SPREADSHEET_ID=<your-spreadsheet-id>
```

### For Vercel (Frontend)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_GOOGLE_FORM_URL=<your-google-form-url>
```

## Test Your Setup

1. **Test Backend**: Visit `https://your-backend-url.railway.app/health`
2. **Test Frontend**: Visit your Vercel URL
3. **Test Data**: Check if dashboard loads data from Google Sheets

## Troubleshooting

- **Permission Denied**: Make sure service account has editor access
- **API Not Enabled**: Enable Google Sheets API in Cloud Console
- **Invalid Credentials**: Check JSON format and content
- **Sheet Not Found**: Verify spreadsheet ID and sheet names
