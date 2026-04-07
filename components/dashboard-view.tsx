"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseChart } from "@/components/expense-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { useToast } from "@/components/ui/use-toast"

export function DashboardView() {
  const [timeframe, setTimeframe] = useState("week")
  const [isAddingTransaction, setIsAddingTransaction] = useState(false)
  const [transactions, setTransactions] = useState([])
  const { toast } = useToast()

  const handleAddTransaction = (transaction: any) => {
    // In a real app, you would send this to your backend
    // For now, we'll just show a toast notification

    const newTransaction = {
      id: `t${transactions.length + 1}`,
      title: transaction.title,
      amount: transaction.type === "expense" ? -transaction.amount : transaction.amount,
      date: transaction.date,
      category: transaction.category,
      notes: transaction.notes,
    }

    // Add to transactions state
    setTransactions([newTransaction, ...transactions])

    // Show success toast
    toast({
      title: "Transaction added",
      description: `${transaction.title} for ${formatCurrency(transaction.amount)} has been added.`,
    })
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track your finances at a glance</p>
        </div>
        <Button size="icon" variant="outline" className="rounded-full" onClick={() => setIsAddingTransaction(true)}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(12458.23)}</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              8.2%
            </div>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xl font-bold">{formatCurrency(4250)}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              12%
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xl font-bold">{formatCurrency(2180)}</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownIcon className="h-3 w-3 mr-1" />
              3%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-medium">Spending Overview</CardTitle>
            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
              <TabsList className="h-8 p-1">
                <TabsTrigger value="week" className="text-xs px-2 py-1">
                  Week
                </TabsTrigger>
                <TabsTrigger value="month" className="text-xs px-2 py-1">
                  Month
                </TabsTrigger>
                <TabsTrigger value="year" className="text-xs px-2 py-1">
                  Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ExpenseChart timeframe={timeframe} />
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
          <CardDescription>Your latest spending activity</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentTransactions newTransactions={transactions} />
        </CardContent>
      </Card>

      <AddTransactionDialog
        open={isAddingTransaction}
        onOpenChange={setIsAddingTransaction}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  )
}
