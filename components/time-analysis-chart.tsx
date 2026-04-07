"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TimeAnalysisChartProps {
  timeframe: string
  analysisType: string
}

export function TimeAnalysisChart({ timeframe, analysisType }: TimeAnalysisChartProps) {
  // Sample data - in a real app, this would come from your backend
  const hourlyData = [
    { time: "6am", amount: 20 },
    { time: "8am", amount: 80 },
    { time: "10am", amount: 40 },
    { time: "12pm", amount: 120 },
    { time: "2pm", amount: 60 },
    { time: "4pm", amount: 30 },
    { time: "6pm", amount: 180 },
    { time: "8pm", amount: 90 },
    { time: "10pm", amount: 40 },
  ]

  const dailyData = [
    { time: "Mon", amount: 120 },
    { time: "Tue", amount: 90 },
    { time: "Wed", amount: 110 },
    { time: "Thu", amount: 140 },
    { time: "Fri", amount: 210 },
    { time: "Sat", amount: 180 },
    { time: "Sun", amount: 80 },
  ]

  const weeklyData = [
    { time: "Week 1", amount: 520 },
    { time: "Week 2", amount: 480 },
    { time: "Week 3", amount: 640 },
    { time: "Week 4", amount: 580 },
  ]

  let data
  switch (analysisType) {
    case "hours":
      data = hourlyData
      break
    case "days":
      data = dailyData
      break
    case "weeks":
      data = weeklyData
      break
    default:
      data = dailyData
  }

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
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} dy={10} />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={50}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]} fill="var(--color-amount)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
