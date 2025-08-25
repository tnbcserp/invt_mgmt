#!/bin/bash

# Raw Material Inventory Management System Setup Script
# This script will help you set up the entire project

set -e

echo "🚀 Setting up Raw Material Inventory Management System"
echo "=================================================="

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

# Check if required tools are installed
check_requirements() {
    print_status "Checking system requirements..."

    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.8+"
        exit 1
    fi

    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi

    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm"
        exit 1
    fi

    print_success "All requirements are met!"
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."

    cd backend

    # Create virtual environment
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi

    # Activate virtual environment
    source venv/bin/activate

    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install -r requirements.txt

    # Create environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        print_status "Creating backend environment file..."
        cp env.example .env
        print_warning "Please edit backend/.env with your Google Sheets credentials"
    else
        print_success "Backend environment file already exists"
    fi

    cd ..
    print_success "Backend setup completed!"
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."

    cd frontend

    # Install dependencies
    print_status "Installing Node.js dependencies..."
    npm install

    # Create environment file if it doesn't exist
    if [ ! -f ".env.local" ]; then
        print_status "Creating frontend environment file..."
        cp env.example .env.local
        print_warning "Please edit frontend/.env.local with your API URL and Google Form URL"
    else
        print_success "Frontend environment file already exists"
    fi

    cd ..
    print_success "Frontend setup completed!"
}

# Create sample Google Sheets structure
create_sample_sheets() {
    print_status "Creating sample Google Sheets structure..."

    cat > sample_sheets_structure.md << 'EOF'
# Google Sheets Structure

## Raw Material Master Sheet
| RM ID | Product Name | Unit | Avg. Cost per Unit | Cost per Unit | Reorder Level |
|-------|--------------|------|-------------------|---------------|---------------|
| TIL1  | TIL SAMRAT   | Kg   | ₹160              | ₹160          | 50            |
| SARW2 | SARWAR TANDOOR MUSHROOM 800GM TIN | Pcs | ₹135 | ₹135 | 20 |
| FRUI3 | FRUIT COCKTAIL TIN | Pcs | ₹95 | ₹95 | 30 |
| MANG4 | MANGO PULP ADITI TIN | Pcs | ₹160 | ₹160 | 25 |
| WHIT5 | WHITE PEPPER | Kg | ₹100 | ₹100 | 15 |
| CHIN6 | CHINGS GREEN CHILLI SAUCE | Bottle | ₹50 | ₹50 | 40 |
| GAS7  | GAS CYL | Packet | ₹1650 | ₹1650 | 5 |

## Stock In Sheet
| Date | Product ID | Product Name | Quantity In | Cost per Unit | Remarks |
|------|------------|--------------|-------------|---------------|---------|
| 2024-01-15 | TIL1 | TIL SAMRAT | 100 | ₹160 | Initial stock |
| 2024-01-16 | SARW2 | SARWAR TANDOOR MUSHROOM 800GM TIN | 50 | ₹135 | Restock |

## Stock Out Sheet
| Date | Product ID | Product Name | Quantity Out | Remarks | Distributed To | Current Stock |
|------|------------|--------------|--------------|---------|----------------|---------------|
| 2024-01-17 | TIL1 | TIL SAMRAT | 20 | | Kitchen A | 80 |
| 2024-01-18 | SARW2 | SARWAR TANDOOR MUSHROOM 800GM TIN | 10 | | Kitchen B | 40 |
EOF

    print_success "Sample sheets structure created in sample_sheets_structure.md"
}

# Main setup function
main() {
    echo ""
    print_status "Starting setup process..."

    # Check requirements
    check_requirements

    # Setup backend
    setup_backend

    # Setup frontend
    setup_frontend

    # Create sample sheets structure
    create_sample_sheets

    echo ""
    print_success "Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Set up Google Cloud Project and enable Google Sheets API"
    echo "2. Create a service account and download credentials"
    echo "3. Create Google Sheets with the structure from sample_sheets_structure.md"
    echo "4. Edit backend/.env with your Google Sheets credentials"
    echo "5. Edit frontend/.env.local with your API URL and Google Form URL"
    echo "6. Run the application:"
    echo "   - Backend: cd backend && source venv/bin/activate && python run.py"
    echo "   - Frontend: cd frontend && npm run dev"
    echo ""
    echo "For detailed instructions, see README.md"
    echo ""
}

# Run main function
main "$@"
