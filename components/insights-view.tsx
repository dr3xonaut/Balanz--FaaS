"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryChart } from "@/components/category-chart"
import { TimeAnalysisChart } from "@/components/time-analysis-chart"
import { SpendingTrends } from "@/components/spending-trends"

export function InsightsView() {
  const [timeframe, setTimeframe] = useState("month")
  const [analysisType, setAnalysisType] = useState("categories")

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground">Analyze your spending patterns</p>
      </div>

      <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
        <TabsList className="grid grid-cols-3 h-9">
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Spending by Category</CardTitle>
          <CardDescription>See where your money goes</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <CategoryChart timeframe={timeframe} />
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-base font-medium">Time Analysis</CardTitle>
              <CardDescription>When you spend the most</CardDescription>
            </div>
            <Tabs value={analysisType} onValueChange={setAnalysisType} className="w-auto">
              <TabsList className="h-8 p-1">
                <TabsTrigger value="hours" className="text-xs px-2 py-1">
                  Hours
                </TabsTrigger>
                <TabsTrigger value="days" className="text-xs px-2 py-1">
                  Days
                </TabsTrigger>
                <TabsTrigger value="weeks" className="text-xs px-2 py-1">
                  Weeks
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <TimeAnalysisChart timeframe={timeframe} analysisType={analysisType} />
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Spending Trends</CardTitle>
          <CardDescription>How your habits are changing</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <SpendingTrends timeframe={timeframe} />
        </CardContent>
      </Card>
    </div>
  )
}
