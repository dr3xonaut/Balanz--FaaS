"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ShoppingBag,
  Utensils,
  Home,
  Car,
  Tv,
  Smartphone,
  Heart,
  GraduationCap,
  Gift,
  CreditCard,
  ChevronRight,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { BudgetCategoryDialog } from "@/components/budget/budget-category-dialog"

// Sample budget categories data
const budgetCategories = [
  {
    id: "c1",
    name: "Housing",
    icon: Home,
    budget: 1500,
    spent: 1500,
    color: "bg-blue-100 text-blue-600",
    transactions: 2,
  },
  {
    id: "c2",
    name: "Groceries",
    icon: ShoppingBag,
    budget: 500,
    spent: 320,
    color: "bg-green-100 text-green-600",
    transactions: 8,
  },
  {
    id: "c3",
    name: "Dining Out",
    icon: Utensils,
    budget: 300,
    spent: 270,
    color: "bg-orange-100 text-orange-600",
    transactions: 12,
  },
  {
    id: "c4",
    name: "Transportation",
    icon: Car,
    budget: 200,
    spent: 180,
    color: "bg-purple-100 text-purple-600",
    transactions: 15,
  },
  {
    id: "c5",
    name: "Entertainment",
    icon: Tv,
    budget: 150,
    spent: 175,
    color: "bg-red-100 text-red-600",
    transactions: 6,
  },
  {
    id: "c6",
    name: "Utilities",
    icon: Smartphone,
    budget: 300,
    spent: 0,
    color: "bg-yellow-100 text-yellow-600",
    transactions: 0,
  },
  {
    id: "c7",
    name: "Healthcare",
    icon: Heart,
    budget: 200,
    spent: 50,
    color: "bg-pink-100 text-pink-600",
    transactions: 1,
  },
  {
    id: "c8",
    name: "Education",
    icon: GraduationCap,
    budget: 100,
    spent: 0,
    color: "bg-indigo-100 text-indigo-600",
    transactions: 0,
  },
  {
    id: "c9",
    name: "Gifts",
    icon: Gift,
    budget: 50,
    spent: 25,
    color: "bg-rose-100 text-rose-600",
    transactions: 1,
  },
  {
    id: "c10",
    name: "Other",
    icon: CreditCard,
    budget: 200,
    spent: 60,
    color: "bg-gray-100 text-gray-600",
    transactions: 3,
  },
]

export function BudgetCategoryList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleCloseDialog = () => {
    setSelectedCategory(null)
  }

  const selectedCategoryData = selectedCategory ? budgetCategories.find((cat) => cat.id === selectedCategory) : null

  return (
    <>
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y">
            {budgetCategories.map((category) => {
              const percentSpent = (category.spent / category.budget) * 100
              const isOverBudget = percentSpent > 100

              return (
                <div
                  key={category.id}
                  className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className={`p-2 rounded-full ${category.color}`}>
                    <category.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">{category.name}</p>
                      <div className="flex items-center gap-1">
                        <p className={`text-sm ${isOverBudget ? "text-red-600 font-medium" : ""}`}>
                          {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                        </p>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <Progress
                      value={Math.min(percentSpent, 100)}
                      className={`h-1.5 ${isOverBudget ? "bg-red-200 dark:bg-red-950" : ""}`}
                      indicatorClassName={isOverBudget ? "bg-red-500" : undefined}
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span className={isOverBudget ? "text-red-500" : "text-muted-foreground"}>
                        {isOverBudget
                          ? `Over budget by ${formatCurrency(category.spent - category.budget)}`
                          : `${Math.round(percentSpent)}% used`}
                      </span>
                      <span className="text-muted-foreground">
                        {category.transactions} transaction{category.transactions !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedCategoryData && (
        <BudgetCategoryDialog
          category={selectedCategoryData}
          open={!!selectedCategory}
          onOpenChange={handleCloseDialog}
        />
      )}
    </>
  )
}
