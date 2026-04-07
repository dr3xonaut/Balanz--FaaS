"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"

// Sample transaction data
const transactions = [
  { id: "t1", description: "Rent payment", amount: 1500, date: "Jul 1, 2023" },
  { id: "t2", description: "Grocery shopping - Whole Foods", amount: 85.42, date: "Jul 3, 2023" },
  { id: "t3", description: "Grocery shopping - Whole Foods", amount: 85.42, date: "Jul 3, 2023" },
  { id: "t3", description: "Trader Joe's", amount: 62.18, date: "Jul 7, 2023" },
  { id: "t4", description: "Safeway", amount: 45.93, date: "Jul 10, 2023" },
  { id: "t5", description: "Farmer's Market", amount: 32.5, date: "Jul 15, 2023" },
  { id: "t6", description: "Corner Grocery", amount: 18.75, date: "Jul 18, 2023" },
  { id: "t7", description: "Whole Foods", amount: 75.22, date: "Jul 22, 2023" },
]

interface BudgetCategoryDialogProps {
  category: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BudgetCategoryDialog({ category, open, onOpenChange }: BudgetCategoryDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [editMode, setEditMode] = useState(false)
  const [budgetAmount, setBudgetAmount] = useState(category.budget.toString())

  const percentSpent = (category.spent / category.budget) * 100
  const isOverBudget = percentSpent > 100

  const handleSave = () => {
    // In a real app, this would update the budget
    console.log("Updating budget:", { category: category.id, amount: Number.parseFloat(budgetAmount) })
    setEditMode(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${category.color}`}>
              <category.icon className="h-5 w-5" />
            </div>
            <DialogTitle>{category.name} Budget</DialogTitle>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 h-9">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Monthly Budget</div>
                  {!editMode && (
                    <Button variant="ghost" size="sm" onClick={() => setEditMode(true)}>
                      Edit
                    </Button>
                  )}
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-budget-amount">Budget Amount</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <Input
                          id="edit-budget-amount"
                          type="number"
                          className="pl-7"
                          value={budgetAmount}
                          onChange={(e) => setBudgetAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Spending</span>
                      <span>
                        {formatCurrency(category.spent)} of {formatCurrency(category.budget)}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(percentSpent, 100)}
                      className={`h-2 ${isOverBudget ? "bg-red-200 dark:bg-red-950" : ""}`}
                      indicatorClassName={isOverBudget ? "bg-red-500" : undefined}
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span className={isOverBudget ? "text-red-500 font-medium" : "text-muted-foreground"}>
                        {isOverBudget
                          ? `Over budget by ${formatCurrency(category.spent - category.budget)}`
                          : `${Math.round(percentSpent)}% of budget used`}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Remaining</p>
                  <p className="text-xl font-bold">
                    {isOverBudget
                      ? `-${formatCurrency(category.spent - category.budget)}`
                      : formatCurrency(category.budget - category.spent)}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Average Per Day</p>
                  <p className="text-xl font-bold">{formatCurrency(category.spent / 20)}</p>
                  <p className="text-xs text-muted-foreground">Based on spending so far</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Spending Trend</p>
                <div className="h-[100px] bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Spending trend chart would go here</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="pt-4">
            <div className="space-y-4">
              <div className="text-sm font-medium">Recent Transactions</div>
              <div className="divide-y max-h-[300px] overflow-auto">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
