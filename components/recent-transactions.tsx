"use client"

import {
  Coffee,
  ShoppingBag,
  Utensils,
  Car,
  Home,
  CreditCard,
  Briefcase,
  Gift,
  Smartphone,
  BookOpen,
  Heart,
  DollarSign,
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

// Sample transaction data - in a real app, this would come from your backend
const sampleTransactions = [
  {
    id: "t1",
    title: "Starbucks",
    amount: -4.5,
    date: new Date(2023, 3, 15, 9, 30),
    category: "food",
    icon: Coffee,
  },
  {
    id: "t2",
    title: "Amazon",
    amount: -67.99,
    date: new Date(2023, 3, 14, 14, 20),
    category: "shopping",
    icon: ShoppingBag,
  },
  {
    id: "t3",
    title: "Restaurant",
    amount: -42.8,
    date: new Date(2023, 3, 13, 20, 15),
    category: "food",
    icon: Utensils,
  },
  {
    id: "t4",
    title: "Gas Station",
    amount: -38.65,
    date: new Date(2023, 3, 12, 16, 45),
    category: "transportation",
    icon: Car,
  },
  {
    id: "t5",
    title: "Rent",
    amount: -1200.0,
    date: new Date(2023, 3, 1, 0, 0),
    category: "housing",
    icon: Home,
  },
  {
    id: "t6",
    title: "Salary",
    amount: 3200.0,
    date: new Date(2023, 3, 1, 9, 0),
    category: "income",
    icon: CreditCard,
  },
]

// Map of category to icon
const categoryIcons: Record<string, any> = {
  food: Utensils,
  shopping: ShoppingBag,
  transportation: Car,
  housing: Home,
  income: DollarSign,
  entertainment: Gift,
  utilities: Smartphone,
  healthcare: Heart,
  personal: Briefcase,
  education: BookOpen,
  gifts: Gift,
  other: CreditCard,
}

interface RecentTransactionsProps {
  newTransactions?: any[]
}

export function RecentTransactions({ newTransactions = [] }: RecentTransactionsProps) {
  // Combine sample transactions with new transactions
  const allTransactions = [...newTransactions, ...sampleTransactions]

  // Sort by date (newest first)
  const sortedTransactions = [...allTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="space-y-4">
      {sortedTransactions.map((transaction) => {
        // Determine which icon to use
        const IconComponent = transaction.icon || categoryIcons[transaction.category] || CreditCard

        return (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${transaction.amount < 0 ? "bg-red-100" : "bg-green-100"}`}>
                <IconComponent className={`h-4 w-4 ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`} />
              </div>
              <div>
                <div className="font-medium">{transaction.title}</div>
                <div className="text-xs text-muted-foreground">
                  {transaction.category && categoryIcons[transaction.category]
                    ? transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)
                    : "Other"}{" "}
                  • {formatDate(transaction.date)}
                </div>
              </div>
            </div>
            <div className={`font-medium ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
