"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatCurrency, formatNumber, getStatusColor } from '@/lib/utils'

interface CurrentStockTableProps {
  data: any[]
}

export function CurrentStockTable({ data }: CurrentStockTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter(item =>
    item['Product Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item['RM ID']?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStockStatus = (currentStock: number, reorderLevel: number) => {
    if (currentStock <= reorderLevel * 0.5) return 'critical'
    if (currentStock <= reorderLevel) return 'warning'
    return 'good'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case 'warning':
        return <Minus className="h-4 w-4 text-yellow-600" />
      case 'good':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <div className="text-center">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No current stock data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search current stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Current Stock</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Unit</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Stock Value</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => {
                const status = getStockStatus(
                  Number(item['Current Stock'] || 0),
                  Number(item['Reorder Level'] || 0)
                )
                return (
                  <tr
                    key={index}
                    className="border-t hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium">
                          {item['Product Name'] || '-'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item['RM ID'] || '-'}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {formatNumber(item['Current Stock'] || 0)}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {item['Unit'] || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {formatCurrency(item['Stock Value'] || 0)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status)}
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {data.length} items
      </div>
    </div>
  )
}
