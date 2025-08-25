# Raw Material Inventory Dashboard Frontend

A modern, responsive Next.js dashboard for managing raw material inventory with real-time data visualization and alerts.

## Features

- 🌙 Dark/Light Mode Support
- 📊 Real-time Dashboard with KPIs
- 📈 Interactive Charts and Analytics
- 🚨 Smart Alert System with Google Form Integration
- 🔍 Search and Filter Functionality
- 📱 Responsive Design
- ⚡ Fast Performance with Next.js 14

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes
- **TypeScript**: Full type safety

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment template and configure your settings:

```bash
cp env.example .env.local
```

Update the `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Google Form URL for stock entry
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id

# Optional: Analytics and monitoring
NEXT_PUBLIC_APP_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── input.tsx
│   ├── AlertSystem.tsx      # Stock alert system
│   ├── CurrentStockTable.tsx # Current stock levels table
│   ├── InventoryOverview.tsx # KPI overview cards
│   ├── RawMaterialsTable.tsx # Raw materials master table
│   ├── StockMovementsTable.tsx # Stock movements table
│   ├── StockTrendsChart.tsx # Stock trends chart
│   ├── ThemeProvider.tsx    # Theme context provider
│   └── ThemeToggle.tsx      # Theme toggle component
├── lib/
│   └── utils.ts             # Utility functions
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Components

### Dashboard Components

- **InventoryOverview**: Displays key performance indicators in card format
- **StockTrendsChart**: Interactive line chart showing stock in/out trends
- **CurrentStockTable**: Real-time stock levels with status indicators
- **RawMaterialsTable**: Master data table with search functionality
- **StockMovementsTable**: Recent stock transactions
- **AlertSystem**: Smart alerts with Google Form integration

### UI Components

All UI components are built using shadcn/ui for consistency and accessibility:

- **Button**: Multiple variants and sizes
- **Card**: Content containers with headers and footers
- **Alert**: Notification and warning components
- **Input**: Search and form inputs
- **DropdownMenu**: Theme toggle and navigation

## API Integration

The dashboard connects to the FastAPI backend for real-time data:

### Endpoints Used

- `GET /api/v1/dashboard` - Dashboard KPIs and overview
- `GET /api/v1/raw-materials` - Raw materials master data
- `GET /api/v1/current-stock` - Current stock levels
- `GET /api/v1/stock-in` - Stock in transactions
- `GET /api/v1/stock-out` - Stock out transactions

### Error Handling

- Graceful error states with retry functionality
- Loading states with skeleton components
- Network error detection and user feedback

## Theme System

### Dark/Light Mode

- Automatic theme detection based on system preference
- Manual theme toggle with dropdown menu
- Persistent theme selection across sessions
- Smooth transitions between themes

### Color Scheme

- **Primary**: Blue (#3b82f6) for main actions and branding
- **Success**: Green (#10b981) for positive states
- **Warning**: Yellow (#f59e0b) for caution states
- **Error**: Red (#ef4444) for critical states
- **Muted**: Gray variations for secondary content

## Alert System

### Features

- **Real-time Monitoring**: Automatically detects low stock items
- **Smart Alerts**: Critical and warning level notifications
- **Google Form Integration**: Direct restock action buttons
- **Dismissible Alerts**: Users can dismiss individual alerts
- **Context Awareness**: Pre-fills form with product information

### Alert Types

- **Critical**: Stock below 50% of reorder level
- **Warning**: Stock below reorder level
- **Success**: Stock restored to normal levels

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Environment variables for Vercel
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
```

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Connect repository and set environment variables
- **Railway**: Deploy with automatic environment detection
- **Docker**: Use the provided Dockerfile

## Performance Optimization

- **Static Generation**: Optimized for fast loading
- **Image Optimization**: Next.js built-in image optimization
- **Code Splitting**: Automatic code splitting for better performance
- **Caching**: Efficient caching strategies
- **Bundle Analysis**: Built-in bundle analyzer

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
