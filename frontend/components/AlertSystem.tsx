"use client"

import React, { useState, useEffect } from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, AlertCircle, CheckCircle, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  dismissed?: boolean
}

interface AlertSystemProps {
  alerts: AlertItem[]
  onDismiss?: (alertId: string) => void
  googleFormUrl?: string
}

export function AlertSystem({ alerts, onDismiss, googleFormUrl }: AlertSystemProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]))
    onDismiss?.(alertId)
  }

  const handleRestock = (productId?: string, productName?: string) => {
    if (googleFormUrl) {
      // Pre-fill form with product information if available
      const formUrl = productId && productName
        ? `${googleFormUrl}?entry.1234567890=${encodeURIComponent(productName)}&entry.0987654321=${encodeURIComponent(productId)}`
        : googleFormUrl

      window.open(formUrl, '_blank')
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />
      case 'warning':
        return <AlertCircle className="h-4 w-4" />
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive' as const
      case 'warning':
      case 'success':
      default:
        return 'default' as const
    }
  }

  const activeAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id))
  const criticalAlerts = activeAlerts.filter(alert => alert.type === 'critical')
  const warningAlerts = activeAlerts.filter(alert => alert.type === 'warning')

  if (activeAlerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            No Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            All inventory levels are within normal ranges.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Alert Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Stock Alerts</span>
            <div className="flex items-center gap-2">
              {criticalAlerts.length > 0 && (
                <span className="flex items-center gap-1 text-sm text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                  {criticalAlerts.length} Critical
                </span>
              )}
              {warningAlerts.length > 0 && (
                <span className="flex items-center gap-1 text-sm text-yellow-600">
                  <AlertCircle className="h-4 w-4" />
                  {warningAlerts.length} Warning
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <Alert
                key={alert.id}
                variant={getAlertVariant(alert.type)}
                className={cn(
                  "relative transition-all duration-200",
                  dismissedAlerts.has(alert.id) && "opacity-50"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertTitle>{alert.title}</AlertTitle>
                      <AlertDescription className="mt-1">
                        {alert.message}
                        {alert.currentStock !== undefined && alert.reorderLevel !== undefined && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Current Stock:</span> {alert.currentStock} |
                            <span className="font-medium ml-2">Reorder Level:</span> {alert.reorderLevel}
                          </div>
                        )}
                      </AlertDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {googleFormUrl && alert.type !== 'success' && (
                      <Button
                        size="sm"
                        onClick={() => handleRestock(alert.productId, alert.productName)}
                        className="h-8 px-3"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Stock
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDismiss(alert.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleString()}
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
