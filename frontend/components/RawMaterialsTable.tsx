"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Package } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface RawMaterialsTableProps {
  data: any[]
}

export function RawMaterialsTable({ data }: RawMaterialsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter(item =>
    item['Product Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item['RM ID']?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <div className="text-center">
          <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No raw materials data available</p>
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
          placeholder="Search raw materials..."
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
                <th className="px-4 py-3 text-left text-sm font-medium">RM ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Product Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Unit</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Avg. Cost</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Cost/Unit</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Reorder Level</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium">
                    {item['RM ID'] || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item['Product Name'] || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {item['Unit'] || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item['Avg. Cost per Unit'] ? formatCurrency(item['Avg. Cost per Unit']) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item['Cost per Unit'] ? formatCurrency(item['Cost per Unit']) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item['Reorder Level'] || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {data.length} raw materials
      </div>
    </div>
  )
}
