"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coffee, ShoppingBag, Utensils, Car, Smartphone, Gift } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { InvestmentRecommendations } from "@/components/investment-recommendations"

export function RecommendationsView() {
  // Sample data - in a real app, this would come from your backend
  const savingsRecommendations = [
    {
      id: "s1",
      category: "Coffee",
      title: "Reduce coffee shop visits",
      description: "Making coffee at home could save you $15 per week",
      potentialSavings: 60,
      icon: Coffee,
    },
    {
      id: "s2",
      category: "Shopping",
      title: "Subscription audit",
      description: "You have 3 unused subscriptions costing $35 monthly",
      potentialSavings: 35,
      icon: ShoppingBag,
    },
    {
      id: "s3",
      category: "Food",
      title: "Meal planning",
      description: "Planning meals could reduce your food spending by 20%",
      potentialSavings: 120,
      icon: Utensils,
    },
    {
      id: "s4",
      category: "Transportation",
      title: "Carpool opportunities",
      description: "Carpooling twice a week could save on gas and parking",
      potentialSavings: 80,
      icon: Car,
    },
  ]

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recommendations</h1>
        <p className="text-muted-foreground">Smart ways to save and grow your money</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Savings Opportunities</CardTitle>
          <CardDescription>Potential monthly savings: {formatCurrency(295)}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {savingsRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <recommendation.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{recommendation.title}</div>
                    <Badge variant="outline" className="ml-auto">
                      Save {formatCurrency(recommendation.potentialSavings)}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{recommendation.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Investment Opportunities</CardTitle>
          <CardDescription>Ways to grow your savings</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <InvestmentRecommendations />
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Smart Features</CardTitle>
          <CardDescription>Enhance your financial experience</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Connect SMS Notifications</div>
                <div className="text-xs text-muted-foreground">Automatically track expenses from bank alerts</div>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                Connect <ArrowRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Gift className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Invite Friends</div>
                <div className="text-xs text-muted-foreground">Get $10 for each friend who joins</div>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                Invite <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
