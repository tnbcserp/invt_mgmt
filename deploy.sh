#!/bin/bash

# Raw Material Inventory Management System Deployment Script
# This script will prepare your project for Git and Vercel deployment

set -e

echo "🚀 Preparing for Git and Vercel Deployment"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is installed
check_git() {
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    print_success "Git is installed"
}

# Initialize git repository
init_git() {
    print_status "Initializing Git repository..."

    if [ -d ".git" ]; then
        print_warning "Git repository already exists"
        return
    fi

    git init
    print_success "Git repository initialized"
}

# Create initial commit
create_commit() {
    print_status "Creating initial commit..."

    # Add all files
    git add .

    # Create commit
    git commit -m "Initial commit: Raw Material Inventory Management System"

    print_success "Initial commit created"
}

# Setup remote repository
setup_remote() {
    print_status "Setting up remote repository..."

    echo ""
    echo "Please provide your GitHub repository URL:"
    echo "Example: https://github.com/yourusername/inventory-system.git"
    read -p "GitHub URL: " github_url

    if [ -z "$github_url" ]; then
        print_warning "No GitHub URL provided. You can add it later with:"
        echo "git remote add origin YOUR_GITHUB_URL"
        return
    fi

    git remote add origin "$github_url"
    print_success "Remote repository added: $github_url"
}

# Push to GitHub
push_to_github() {
    print_status "Pushing to GitHub..."

    if git remote -v | grep -q origin; then
        git push -u origin main
        print_success "Code pushed to GitHub"
    else
        print_warning "No remote repository configured. Please add it manually:"
        echo "git remote add origin YOUR_GITHUB_URL"
        echo "git push -u origin main"
    fi
}

# Prepare for Vercel deployment
prepare_vercel() {
    print_status "Preparing for Vercel deployment..."

    # Check if frontend directory exists
    if [ ! -d "frontend" ]; then
        print_error "Frontend directory not found"
        return
    fi

    # Navigate to frontend
    cd frontend

    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in frontend directory"
        cd ..
        return
    fi

    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        print_status "Installing frontend dependencies..."
        npm install
    fi

    # Test build
    print_status "Testing frontend build..."
    npm run build

    cd ..
    print_success "Frontend is ready for Vercel deployment"
}

# Create deployment instructions
create_deployment_instructions() {
    print_status "Creating deployment instructions..."

    cat > DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# Deployment Instructions

## 🚀 Quick Deploy to Vercel

### 1. Backend Deployment (Railway)

1. Go to [Railway](https://railway.app/)
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set environment variables:
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
6. Deploy and copy the generated URL

### 2. Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com/)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
   NEXT_PUBLIC_APP_ENV=production
   ```
7. Deploy

### 3. Google Sheets Setup

1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create service account
4. Download credentials JSON
5. Create Google Sheets with structure from `sample_sheets_structure.md`
6. Share sheet with service account email

### 4. Google Form Setup

1. Create Google Form for stock entry
2. Copy form URL
3. Update `NEXT_PUBLIC_GOOGLE_FORM_URL` in Vercel

## 🔧 Environment Variables

### Backend (Railway)
- `GOOGLE_SHEETS_CREDS`: Service account JSON
- `SPREADSHEET_ID`: Your Google Sheet ID
- `ALLOWED_ORIGINS`: Your Vercel domain

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL`: Your Railway backend URL
- `NEXT_PUBLIC_GOOGLE_FORM_URL`: Your Google Form URL

## 📞 Support

If you need help:
1. Check the logs in Vercel/Railway dashboards
2. Verify environment variables
3. Test API endpoints manually
4. Review README.md for detailed setup
EOF

    print_success "Deployment instructions created in DEPLOYMENT_INSTRUCTIONS.md"
}

# Main deployment function
main() {
    echo ""
    print_status "Starting deployment preparation..."

    # Check requirements
    check_git

    # Initialize git
    init_git

    # Create commit
    create_commit

    # Setup remote
    setup_remote

    # Push to GitHub
    push_to_github

    # Prepare for Vercel
    prepare_vercel

    # Create instructions
    create_deployment_instructions

    echo ""
    print_success "Deployment preparation completed!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy backend to Railway (see DEPLOYMENT_INSTRUCTIONS.md)"
    echo "2. Deploy frontend to Vercel (see DEPLOYMENT_INSTRUCTIONS.md)"
    echo "3. Set up Google Sheets and Google Form"
    echo "4. Configure environment variables"
    echo ""
    echo "Your project is now ready for deployment! 🚀"
    echo ""
}

# Run main function
main "$@"
