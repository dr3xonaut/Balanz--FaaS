"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Check,
} from "lucide-react"

interface AddBudgetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Sample category options
const categoryOptions = [
  { id: "housing", name: "Housing", icon: Home, color: "bg-blue-100 text-blue-600" },
  { id: "groceries", name: "Groceries", icon: ShoppingBag, color: "bg-green-100 text-green-600" },
  { id: "dining", name: "Dining Out", icon: Utensils, color: "bg-orange-100 text-orange-600" },
  { id: "transportation", name: "Transportation", icon: Car, color: "bg-purple-100 text-purple-600" },
  { id: "entertainment", name: "Entertainment", icon: Tv, color: "bg-red-100 text-red-600" },
  { id: "utilities", name: "Utilities", icon: Smartphone, color: "bg-yellow-100 text-yellow-600" },
  { id: "healthcare", name: "Healthcare", icon: Heart, color: "bg-pink-100 text-pink-600" },
  { id: "education", name: "Education", icon: GraduationCap, color: "bg-indigo-100 text-indigo-600" },
  { id: "gifts", name: "Gifts", icon: Gift, color: "bg-rose-100 text-rose-600" },
  { id: "other", name: "Other", icon: CreditCard, color: "bg-gray-100 text-gray-600" },
]

export function AddBudgetDialog({ open, onOpenChange }: AddBudgetDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [amount, setAmount] = useState("")

  const handleSubmit = () => {
    // In a real app, this would save the new budget
    console.log("Creating budget:", { category: selectedCategory, amount: Number.parseFloat(amount) })

    // Reset form and close dialog
    setSelectedCategory(null)
    setAmount("")
    onOpenChange(false)
  }

  const isValid = selectedCategory && amount && !isNaN(Number.parseFloat(amount)) && Number.parseFloat(amount) > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>Set a monthly budget for a specific category.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Select Category</Label>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border ${
                    selectedCategory === category.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-muted"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={`p-1.5 rounded-full ${category.color}`}>
                    <category.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm">{category.name}</span>
                  {selectedCategory === category.id && <Check className="h-4 w-4 text-primary ml-auto" />}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-amount">Budget Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                id="budget-amount"
                type="number"
                placeholder="0.00"
                className="pl-7"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Create Budget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
