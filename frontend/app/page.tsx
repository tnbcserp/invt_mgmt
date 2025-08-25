"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { AlertSystem } from '@/components/AlertSystem'
import { InventoryOverview } from '@/components/InventoryOverview'
import { StockTrendsChart } from '@/components/StockTrendsChart'
import { RawMaterialsTable } from '@/components/RawMaterialsTable'
import { CurrentStockTable } from '@/components/CurrentStockTable'
import { StockMovementsTable } from '@/components/StockMovementsTable'
import { Package, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Types
interface DashboardData {
  total_products: number
  total_stock_value: number
  low_stock_count: number
  critical_stock_count: number
  monthly_in: number
  monthly_out: number
  low_stock_items: any[]
  critical_stock_items: any[]
}

interface AlertItem {
  id: string
  type: 'critical' | 'warning' | 'success'
  title: string
  message: string
  productId?: string
  productName?: string
  currentStock?: number
  reorderLevel?: number
  timestamp: string
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [rawMaterials, setRawMaterials] = useState([])
  const [currentStock, setCurrentStock] = useState([])
  const [stockIn, setStockIn] = useState([])
  const [stockOut, setStockOut] = useState([])
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Google Form URL - Replace with your actual form URL
  const GOOGLE_FORM_URL = "https://forms.google.com/your-form-id"

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all data in parallel
      const [dashboardRes, rawMaterialsRes, currentStockRes, stockInRes, stockOutRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/dashboard`),
        fetch(`${API_BASE_URL}/api/v1/raw-materials`),
        fetch(`${API_BASE_URL}/api/v1/current-stock`),
        fetch(`${API_BASE_URL}/api/v1/stock-in`),
        fetch(`${API_BASE_URL}/api/v1/stock-out`)
      ])

      if (!dashboardRes.ok || !rawMaterialsRes.ok || !currentStockRes.ok || !stockInRes.ok || !stockOutRes.ok) {
        throw new Error('Failed to fetch data from API')
      }

      const [dashboard, rawMaterialsData, currentStockData, stockInData, stockOutData] = await Promise.all([
        dashboardRes.json(),
        rawMaterialsRes.json(),
        currentStockRes.json(),
        stockInRes.json(),
        stockOutRes.json()
      ])

      setDashboardData(dashboard)
      setRawMaterials(rawMaterialsData)
      setCurrentStock(currentStockData)
      setStockIn(stockInData)
      setStockOut(stockOutData)

      // Generate alerts from dashboard data
      const generatedAlerts: AlertItem[] = []

      // Critical stock alerts
      dashboard.critical_stock_items.forEach((item: any) => {
        generatedAlerts.push({
          id: `critical-${item['RM ID']}`,
          type: 'critical',
          title: 'Critical Stock Level',
          message: `${item['Product Name']} is critically low on stock`,
          productId: item['RM ID'],
          productName: item['Product Name'],
          currentStock: item['Current Stock'],
          reorderLevel: item['Reorder Level'],
          timestamp: new Date().toISOString()
        })
      })

      // Warning stock alerts
      dashboard.low_stock_items.forEach((item: any) => {
        if (!dashboard.critical_stock_items.find((critical: any) => critical['RM ID'] === item['RM ID'])) {
          generatedAlerts.push({
            id: `warning-${item['RM ID']}`,
            type: 'warning',
            title: 'Low Stock Alert',
            message: `${item['Product Name']} is running low on stock`,
            productId: item['RM ID'],
            productName: item['Product Name'],
            currentStock: item['Current Stock'],
            reorderLevel: item['Reorder Level'],
            timestamp: new Date().toISOString()
          })
        }
      })

      setAlerts(generatedAlerts)

    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load dashboard data. Please check your API connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRefresh = () => {
    fetchData()
  }

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>Loading dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="flex items-center justify-center h-64">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Error Loading Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={handleRefresh} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Raw Material Inventory</h1>
                <p className="text-sm text-muted-foreground">Real-time inventory management dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Alerts Section */}
          {alerts.length > 0 && (
            <AlertSystem
              alerts={alerts}
              onDismiss={handleDismissAlert}
              googleFormUrl={GOOGLE_FORM_URL}
            />
          )}

          {/* Overview Cards */}
          {dashboardData && (
            <InventoryOverview
              totalProducts={dashboardData.total_products}
              totalStockValue={dashboardData.total_stock_value}
              lowStockCount={dashboardData.low_stock_count}
              criticalStockCount={dashboardData.critical_stock_count}
              monthlyIn={dashboardData.monthly_in}
              monthlyOut={dashboardData.monthly_out}
            />
          )}

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Stock Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StockTrendsChart stockIn={stockIn} stockOut={stockOut} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Stock Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <CurrentStockTable data={currentStock} />
              </CardContent>
            </Card>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Raw Materials Master</CardTitle>
              </CardHeader>
              <CardContent>
                <RawMaterialsTable data={rawMaterials} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Stock Movements</CardTitle>
              </CardHeader>
              <CardContent>
                <StockMovementsTable stockIn={stockIn} stockOut={stockOut} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
