"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { formatCurrency } from "@/lib/utils"

// Sample budget history data
const monthlyData = [
  { name: "Jan", budget: 3200, spent: 3100 },
  { name: "Feb", budget: 3200, spent: 3050 },
  { name: "Mar", budget: 3300, spent: 3400 },
  { name: "Apr", budget: 3300, spent: 3150 },
  { name: "May", budget: 3400, spent: 3250 },
  { name: "Jun", budget: 3400, spent: 3300 },
  { name: "Jul", budget: 3500, spent: 2180 }, // Current month (partial)
]

const categoryHistoryData = [
  { name: "Housing", budget: 1500, spent: 1500 },
  { name: "Groceries", budget: 500, spent: 320 },
  { name: "Dining", budget: 300, spent: 270 },
  { name: "Transport", budget: 200, spent: 180 },
  { name: "Entertain", budget: 150, spent: 175 },
  { name: "Utilities", budget: 300, spent: 0 },
  { name: "Other", budget: 550, spent: 135 },
]

export function BudgetHistory() {
  const [historyView, setHistoryView] = useState("monthly")

  const data = historyView === "monthly" ? monthlyData : categoryHistoryData

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-primary">Budget: {formatCurrency(payload[0].value)}</p>
          <p className={payload[1].value > payload[0].value ? "text-red-500" : "text-green-500"}>
            Spent: {formatCurrency(payload[1].value)}
          </p>
          <p className="text-muted-foreground text-xs">
            {payload[1].value > payload[0].value
              ? `Over by ${formatCurrency(payload[1].value - payload[0].value)}`
              : `Under by ${formatCurrency(payload[0].value - payload[1].value)}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          <Tabs value={historyView} onValueChange={setHistoryView} className="w-full">
            <TabsList className="grid grid-cols-2 h-8">
              <TabsTrigger value="monthly" className="text-xs">
                Monthly History
              </TabsTrigger>
              <TabsTrigger value="category" className="text-xs">
                By Category
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value}`} width={45} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="budget" fill="#94a3b8" name="Budget" />
                <Bar dataKey="spent" fill="#3b82f6" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {historyView === "monthly"
              ? "Budget vs. actual spending over the past 7 months"
              : "Current month's budget vs. spending by category"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
