"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ExpenseChartProps {
  timeframe: string
}

export function ExpenseChart({ timeframe }: ExpenseChartProps) {
  // Sample data - in a real app, this would come from your backend
  const weekData = [
    { day: "Mon", amount: 120 },
    { day: "Tue", amount: 240 },
    { day: "Wed", amount: 180 },
    { day: "Thu", amount: 320 },
    { day: "Fri", amount: 460 },
    { day: "Sat", amount: 280 },
    { day: "Sun", amount: 120 },
  ]

  const monthData = [
    { day: "Week 1", amount: 1200 },
    { day: "Week 2", amount: 940 },
    { day: "Week 3", amount: 1180 },
    { day: "Week 4", amount: 1320 },
  ]

  const yearData = [
    { day: "Jan", amount: 2200 },
    { day: "Feb", amount: 2400 },
    { day: "Mar", amount: 1800 },
    { day: "Apr", amount: 2900 },
    { day: "May", amount: 3200 },
    { day: "Jun", amount: 2800 },
    { day: "Jul", amount: 3100 },
    { day: "Aug", amount: 2600 },
    { day: "Sep", amount: 2400 },
    { day: "Oct", amount: 2900 },
    { day: "Nov", amount: 3400 },
    { day: "Dec", amount: 3800 },
  ]

  const data = timeframe === "week" ? weekData : timeframe === "month" ? monthData : yearData

  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} dy={10} />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={50}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="amount" strokeWidth={2} activeDot={{ r: 6, strokeWidth: 0 }} dot={{ r: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
