"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, ArrowUp, ArrowDown, Calendar } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

interface StockMovementsTableProps {
  stockIn: any[]
  stockOut: any[]
}

export function StockMovementsTable({ stockIn, stockOut }: StockMovementsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const combinedMovements = useMemo(() => {
    const movements = []

    // Add stock in movements
    stockIn.forEach(item => {
      movements.push({
        ...item,
        type: 'in',
        quantity: item['Quantity In'] || 0,
        date: item['Date'] || 'Unknown',
        productName: item['Product Name'] || item['Product ID'] || 'Unknown',
        remarks: item['Remarks'] || ''
      })
    })

    // Add stock out movements
    stockOut.forEach(item => {
      movements.push({
        ...item,
        type: 'out',
        quantity: item['Quantity Out'] || 0,
        date: item['Date'] || 'Unknown',
        productName: item['Product Name'] || item['Product ID'] || 'Unknown',
        remarks: item['Remarks'] || item['Distributed To'] || ''
      })
    })

    // Sort by date (newest first)
    return movements
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20) // Show last 20 movements
  }, [stockIn, stockOut])

  const filteredMovements = combinedMovements.filter(item =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item['Product ID']?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (combinedMovements.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <div className="text-center">
          <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No stock movement data available</p>
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
          placeholder="Search movements..."
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
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm">
                    {item.date}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium">
                        {item.productName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item['Product ID'] || '-'}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {item.type === 'in' ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.type === 'in'
                          ? 'text-green-600 bg-green-100 dark:bg-green-900/20'
                          : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                      }`}>
                        {item.type === 'in' ? 'Stock In' : 'Stock Out'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {formatNumber(item.quantity)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
                    {item.remarks || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredMovements.length} of {combinedMovements.length} recent movements
      </div>
    </div>
  )
}
