"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, DollarSign, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface InventoryOverviewProps {
  totalProducts: number
  totalStockValue: number
  lowStockCount: number
  criticalStockCount: number
  monthlyIn: number
  monthlyOut: number
}

export function InventoryOverview({
  totalProducts,
  totalStockValue,
  lowStockCount,
  criticalStockCount,
  monthlyIn,
  monthlyOut
}: InventoryOverviewProps) {
  const cards = [
    {
      title: "Total Products",
      value: formatNumber(totalProducts),
      description: "Active raw materials",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Total Stock Value",
      value: formatCurrency(totalStockValue),
      description: "Current inventory value",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Low Stock Alerts",
      value: formatNumber(lowStockCount + criticalStockCount),
      description: "Items below reorder level",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      title: "Monthly Movement",
      value: `${formatNumber(monthlyIn)} / ${formatNumber(monthlyOut)}`,
      description: "Stock in / Stock out",
      icon: monthlyIn > monthlyOut ? TrendingUp : TrendingDown,
      color: monthlyIn > monthlyOut ? "text-green-600" : "text-red-600",
      bgColor: monthlyIn > monthlyOut ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
