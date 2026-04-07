"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlusIcon, AlertTriangle, TrendingDown, TrendingUp, MoreHorizontal } from "lucide-react"
import { BudgetCategoryList } from "@/components/budget/budget-category-list"
import { BudgetSummary } from "@/components/budget/budget-summary"
import { BudgetHistory } from "@/components/budget/budget-history"
import { AddBudgetDialog } from "@/components/budget/add-budget-dialog"
import { formatCurrency } from "@/lib/utils"

export function BudgetView() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddBudget, setShowAddBudget] = useState(false)

  // Sample data for overall budget
  const totalBudget = 3500
  const totalSpent = 2180
  const remainingDays = 12
  const dailyBudget = (totalBudget - totalSpent) / remainingDays
  const percentSpent = (totalSpent / totalBudget) * 100
  const isOverBudget = percentSpent > 100

  // Sample alerts
  const alerts = [
    {
      id: "a1",
      category: "Dining Out",
      message: "You've spent 90% of your dining budget with 12 days remaining",
      severity: "warning",
      icon: AlertTriangle,
    },
    {
      id: "a2",
      category: "Entertainment",
      message: "You've exceeded your entertainment budget by $25",
      severity: "critical",
      icon: TrendingUp,
    },
    {
      id: "a3",
      category: "Groceries",
      message: "You're under budget for groceries by 15%",
      severity: "positive",
      icon: TrendingDown,
    },
  ]

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Budget</h1>
          <p className="text-muted-foreground">Track and manage your spending</p>
        </div>
        <Button size="icon" variant="outline" className="rounded-full" onClick={() => setShowAddBudget(true)}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Monthly Budget</CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Total Budget</span>
                <span>
                  {formatCurrency(totalSpent)} of {formatCurrency(totalBudget)}
                </span>
              </div>
              <Progress
                value={percentSpent}
                className={`h-2 ${isOverBudget ? "bg-red-200 dark:bg-red-950" : ""}`}
                indicatorClassName={isOverBudget ? "bg-red-500" : undefined}
              />
              <div className="flex justify-between text-xs mt-1">
                <span className={isOverBudget ? "text-red-500 font-medium" : "text-muted-foreground"}>
                  {isOverBudget
                    ? `Over budget by ${formatCurrency(totalSpent - totalBudget)}`
                    : `${Math.round(percentSpent)}% of monthly budget used`}
                </span>
                <span className="text-muted-foreground">{remainingDays} days remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className="text-xl font-bold">{formatCurrency(totalBudget - totalSpent)}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Daily Budget</p>
                <p className="text-xl font-bold">{formatCurrency(dailyBudget)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {alerts.length > 0 && (
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Budget Alerts</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    alert.severity === "critical"
                      ? "bg-red-50 text-red-800"
                      : alert.severity === "warning"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-green-50 text-green-800"
                  }`}
                >
                  <div
                    className={`p-1 rounded-full ${
                      alert.severity === "critical"
                        ? "bg-red-100"
                        : alert.severity === "warning"
                          ? "bg-amber-100"
                          : "bg-green-100"
                    }`}
                  >
                    <alert.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.category}</p>
                    <p className="text-xs">{alert.message}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 h-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <BudgetSummary />
        </TabsContent>

        <TabsContent value="categories" className="mt-4 space-y-4">
          <BudgetCategoryList />
        </TabsContent>

        <TabsContent value="history" className="mt-4 space-y-4">
          <BudgetHistory />
        </TabsContent>
      </Tabs>

      <AddBudgetDialog open={showAddBudget} onOpenChange={setShowAddBudget} />
    </div>
  )
}
