"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface SpendingTrendsProps {
  timeframe: string
}

export function SpendingTrends({ timeframe }: SpendingTrendsProps) {
  // Sample data - in a real app, this would come from your backend
  const trends = [
    {
      category: "Food & Drink",
      currentAmount: 450,
      previousAmount: 380,
      change: 18.4,
    },
    {
      category: "Shopping",
      currentAmount: 300,
      previousAmount: 350,
      change: -14.3,
    },
    {
      category: "Transportation",
      currentAmount: 200,
      previousAmount: 220,
      change: -9.1,
    },
    {
      category: "Entertainment",
      currentAmount: 150,
      previousAmount: 120,
      change: 25.0,
    },
  ]

  return (
    <div className="space-y-4">
      {trends.map((trend) => (
        <div key={trend.category} className="flex items-center justify-between">
          <div>
            <div className="font-medium">{trend.category}</div>
            <div className="text-sm text-muted-foreground">{formatCurrency(trend.currentAmount)}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className={`flex items-center text-sm ${trend.change > 0 ? "text-red-600" : "text-green-600"}`}>
              {trend.change > 0 ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
              {Math.abs(trend.change)}%
            </div>
            <div className="text-xs text-muted-foreground">vs last {timeframe}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
