"use client"

import React, { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { formatNumber } from '@/lib/utils'

interface StockTrendsChartProps {
  stockIn: any[]
  stockOut: any[]
}

export function StockTrendsChart({ stockIn, stockOut }: StockTrendsChartProps) {
  const chartData = useMemo(() => {
    // Group data by date and calculate totals
    const dateMap = new Map()

    // Process stock in data
    stockIn.forEach(item => {
      const date = item.Date || 'Unknown'
      if (!dateMap.has(date)) {
        dateMap.set(date, { date, stockIn: 0, stockOut: 0 })
      }
      dateMap.get(date).stockIn += Number(item['Quantity In'] || 0)
    })

    // Process stock out data
    stockOut.forEach(item => {
      const date = item.Date || 'Unknown'
      if (!dateMap.has(date)) {
        dateMap.set(date, { date, stockIn: 0, stockOut: 0 })
      }
      dateMap.get(date).stockOut += Number(item['Quantity Out'] || 0)
    })

    // Convert to array and sort by date
    return Array.from(dateMap.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10) // Show last 10 entries
  }, [stockIn, stockOut])

  const totalIn = stockIn.reduce((sum, item) => sum + Number(item['Quantity In'] || 0), 0)
  const totalOut = stockOut.reduce((sum, item) => sum + Number(item['Quantity Out'] || 0), 0)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatNumber(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p>No stock movement data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {formatNumber(totalIn)}
          </div>
          <div className="text-sm text-muted-foreground">Total Stock In</div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {formatNumber(totalOut)}
          </div>
          <div className="text-sm text-muted-foreground">Total Stock Out</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              className="text-xs"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatNumber(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="stockIn"
              stroke="#10b981"
              strokeWidth={2}
              name="Stock In"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="stockOut"
              stroke="#ef4444"
              strokeWidth={2}
              name="Stock Out"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
