"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface CategoryChartProps {
  timeframe: string
}

export function CategoryChart({ timeframe }: CategoryChartProps) {
  // Sample data for different timeframes
  const weekData = [
    { name: "Food & Drink", value: 180, color: "#FF6384" },
    { name: "Shopping", value: 120, color: "#36A2EB" },
    { name: "Transportation", value: 80, color: "#FFCE56" },
    { name: "Entertainment", value: 60, color: "#4BC0C0" },
    { name: "Housing", value: 350, color: "#9966FF" },
    { name: "Utilities", value: 40, color: "#FF9F40" },
  ]

  const monthData = [
    { name: "Food & Drink", value: 450, color: "#FF6384" },
    { name: "Shopping", value: 300, color: "#36A2EB" },
    { name: "Transportation", value: 200, color: "#FFCE56" },
    { name: "Entertainment", value: 150, color: "#4BC0C0" },
    { name: "Housing", value: 1200, color: "#9966FF" },
    { name: "Utilities", value: 180, color: "#FF9F40" },
  ]

  const yearData = [
    { name: "Food & Drink", value: 5400, color: "#FF6384" },
    { name: "Shopping", value: 3600, color: "#36A2EB" },
    { name: "Transportation", value: 2400, color: "#FFCE56" },
    { name: "Entertainment", value: 1800, color: "#4BC0C0" },
    { name: "Housing", value: 14400, color: "#9966FF" },
    { name: "Utilities", value: 2160, color: "#FF9F40" },
  ]

  // Select data based on timeframe
  const data = timeframe === "week" ? weekData : timeframe === "month" ? monthData : yearData

  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Custom tooltip for better display
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-background p-2 shadow-md border-none">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
          <p className="text-xs text-muted-foreground">{Math.round((payload[0].value / total) * 100)}% of total</p>
        </Card>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {data.map((category) => (
          <div key={category.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
            <div className="text-sm truncate">{category.name}</div>
            <div className="text-sm font-medium ml-auto">{formatCurrency(category.value)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
