"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusIcon, Users, Home, ShoppingBag, Utensils, Tv, Zap } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"

// Sample data for household budgeting
const householdData = {
  name: "Smith Family",
  members: [
    { name: "John", avatar: "/placeholder.svg?height=32&width=32", role: "Admin" },
    { name: "Sarah", avatar: "/placeholder.svg?height=32&width=32", role: "Member" },
    { name: "Emma", avatar: "/placeholder.svg?height=32&width=32", role: "Member" },
  ],
  monthlyBudget: 4500,
  currentSpending: 2800,
  categories: [
    { name: "Rent/Mortgage", icon: Home, budget: 1800, spent: 1800, color: "bg-blue-100 text-blue-600" },
    { name: "Groceries", icon: ShoppingBag, budget: 800, spent: 650, color: "bg-green-100 text-green-600" },
    { name: "Dining Out", icon: Utensils, budget: 400, spent: 320, color: "bg-orange-100 text-orange-600" },
    { name: "Entertainment", icon: Tv, budget: 200, spent: 30, color: "bg-purple-100 text-purple-600" },
    { name: "Utilities", icon: Zap, budget: 300, spent: 0, color: "bg-yellow-100 text-yellow-600" },
  ],
  comparison: "Your household spends 15% less on dining than similar households",
}

export function HouseholdBudgeting() {
  const [showInvite, setShowInvite] = useState(false)
  const totalProgress = (householdData.currentSpending / householdData.monthlyBudget) * 100

  return (
    <>
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Household Budget</CardTitle>
            <CardDescription>Collaborative family budgeting</CardDescription>
          </div>
          <Dialog open={showInvite} onOpenChange={setShowInvite}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Invite to Household</DialogTitle>
                <DialogDescription>Invite someone to join your household budget</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </label>
                  <Input id="email" placeholder="name@example.com" type="email" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="member">Member (can view and add expenses)</option>
                    <option value="admin">Admin (can modify budget and settings)</option>
                    <option value="viewer">Viewer (can only view, not add expenses)</option>
                  </select>
                </div>
                <Button onClick={() => setShowInvite(false)}>Send Invitation</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-medium">{householdData.name}</h3>
              </div>
              <div className="flex -space-x-2">
                {householdData.members.map((member, i) => (
                  <Avatar key={i} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Budget</span>
                <span>
                  {formatCurrency(householdData.currentSpending)} of {formatCurrency(householdData.monthlyBudget)}
                </span>
              </div>
              <Progress value={totalProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{Math.round(totalProgress)}% of monthly budget used</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Category Breakdown</h4>
              {householdData.categories.map((category, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${category.color}`}>
                    <category.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.name}</span>
                      <span>
                        {formatCurrency(category.spent)} of {formatCurrency(category.budget)}
                      </span>
                    </div>
                    <Progress value={(category.spent / category.budget) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted p-3 rounded-md text-sm">
              <p>{householdData.comparison}</p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button size="sm">Add Expense</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
