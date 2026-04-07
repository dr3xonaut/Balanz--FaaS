"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { formatCurrency } from "@/lib/utils"

// Sample budget data for the summary
const budgetData = [
  { name: "Housing", value: 1500, color: "#3B82F6" }, // blue
  { name: "Food", value: 800, color: "#10B981" }, // green (groceries + dining)
  { name: "Transport", value: 200, color: "#8B5CF6" }, // purple
  { name: "Entertain", value: 150, color: "#EC4899" }, // pink
  { name: "Utilities", value: 300, color: "#F59E0B" }, // amber
  { name: "Other", value: 550, color: "#6B7280" }, // gray
]

// Sample spending data
const spendingData = [
  { name: "Housing", value: 1500, color: "#3B82F6" },
  { name: "Food", value: 590, color: "#10B981" },
  { name: "Transport", value: 180, color: "#8B5CF6" },
  { name: "Entertain", value: 175, color: "#EC4899" },
  { name: "Utilities", value: 0, color: "#F59E0B" },
  { name: "Other", value: 135, color: "#6B7280" },
]

// Calculate totals
const totalBudget = budgetData.reduce((sum, item) => sum + item.value, 0)
const totalSpent = spendingData.reduce((sum, item) => sum + item.value, 0)

export function BudgetSummary() {
  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-lg shadow-sm text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
          <p className="text-xs text-muted-foreground">
            {Math.round((payload[0].value / (payload[0].name === "Budget" ? totalBudget : totalSpent)) * 100)}% of total
          </p>
        </div>
      )
    }
    return null
  }

  // Custom legend renderer to make it more compact
  const renderLegend = (props: any) => {
    const { payload } = props

    return (
      <div className="grid grid-cols-3 gap-2 text-xs mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="truncate">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="border-none shadow-sm rounded-xl">
      <CardContent className="p-4">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
            </div>
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie data={budgetData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value" nameKey="name">
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-budget-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#82ca9d"
                  dataKey="value"
                  nameKey="name"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-spent-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend content={renderLegend} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Budget Breakdown</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {budgetData.map((category, index) => {
                const spent = spendingData.find((item) => item.name === category.name)?.value || 0
                const percentSpent = (spent / category.value) * 100

                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="text-sm">
                      <span className={percentSpent > 100 ? "text-red-600 font-medium" : ""}>
                        {Math.round(percentSpent)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
