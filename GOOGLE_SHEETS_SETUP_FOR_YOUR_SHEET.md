# 📊 Google Sheets Setup for Your Inventory System

## 🎯 Your Specific Sheet
- **URL**: https://docs.google.com/spreadsheets/d/1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24/edit
- **ID**: `1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24`

## 🚀 Step-by-Step Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name: `inventory-management`
4. Click "Create"

### Step 2: Enable Google Sheets API
1. Go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### Step 3: Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name: `inventory-service-account`
4. Click "Create and Continue"
5. Skip role assignment, click "Continue"
6. Click "Done"

### Step 4: Generate Service Account Key
1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON"
5. Download the file
6. **Copy the entire JSON content** (you'll need this for Render)

### Step 5: Share Your Google Sheet
1. Open your sheet: https://docs.google.com/spreadsheets/d/1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24/edit
2. Click "Share" button (top right)
3. Add your service account email (from the JSON file, looks like: `inventory-service@project-id.iam.gserviceaccount.com`)
4. Give "Editor" access
5. Click "Send"

### Step 6: Verify Sheet Structure
Your sheet should have these tabs:

#### Tab 1: "Raw Material Master"
| RM ID | Product Name | Unit | Avg. Cost per Unit | Cost per Unit | Reorder Level |
|-------|--------------|------|-------------------|---------------|---------------|
| TIL1  | TIL SAMRAT   | Kg   | ₹160              | ₹160          | 50            |
| SARW2 | SARWAR TANDOOR MUSHROOM 800GM TIN | Pcs | ₹135 | ₹135 | 20 |

#### Tab 2: "Stock In"
| Date | Product ID | Product Name | Quantity In | Cost per Unit | Remarks |
|------|------------|--------------|-------------|---------------|---------|
| 2024-01-15 | TIL1 | TIL SAMRAT | 100 | ₹160 | Initial stock |

#### Tab 3: "Stock Out"
| Date | Product ID | Product Name | Quantity Out | Remarks | Distributed To | Current Stock |
|------|------------|--------------|--------------|---------|----------------|---------------|
| 2024-01-17 | TIL1 | TIL SAMRAT | 20 | | Kitchen A | 80 |

## 🔧 Environment Variables for Render

Use these exact values in your Render deployment:

```
GOOGLE_SHEETS_CREDS=<paste entire JSON content from Step 4>
SPREADSHEET_ID=1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24
RAW_MATERIAL_SHEET=Raw Material Master
STOCK_IN_SHEET=Stock In
STOCK_OUT_SHEET=Stock Out
```

## 🧪 Test Your Setup

### Test API Access
1. Deploy your backend to Render
2. Visit: `https://your-backend-url.onrender.com/health`
3. Should return: `{"status": "healthy"}`

### Test Data Access
1. Visit: `https://your-backend-url.onrender.com/api/v1/raw-materials`
2. Should return your raw materials data

## 🚨 Common Issues

### "Permission Denied" Error
- Make sure you shared the sheet with the service account email
- Check that the service account has "Editor" access
- Verify the email address is correct

### "Sheet Not Found" Error
- Verify the spreadsheet ID: `1G_q_d4Kg35PWBWb49f5FWmoYAnA4k0TYAg4QzIM4N24`
- Check that sheet names match exactly: "Raw Material Master", "Stock In", "Stock Out"

### "Invalid Credentials" Error
- Check that the JSON credentials are copied completely
- Verify the service account is active
- Ensure Google Sheets API is enabled

## 🎉 Success Indicators
- ✅ Service account can access your sheet
- ✅ API endpoints return data
- ✅ No permission errors in logs
- ✅ Dashboard displays your inventory data

---
**Your Google Sheets is now ready to power your inventory dashboard! 📊**
