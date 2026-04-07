"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Coffee, Utensils, Tag, ExternalLink } from "lucide-react"

// Sample data for merchant deals
const merchantDeals = [
  {
    id: "d1",
    merchant: "Whole Foods Market",
    category: "Groceries",
    discount: "10% cashback",
    description: "Get 10% cashback on all grocery purchases when you spend within your monthly grocery budget.",
    expiresIn: "5 days",
    icon: ShoppingBag,
    personalizedReason: "High spending category for you",
  },
  {
    id: "d2",
    merchant: "Starbucks",
    category: "Coffee",
    discount: "Buy one, get one free",
    description: "BOGO on any drink when you use our app to pay. Limited to one redemption per week.",
    expiresIn: "2 days",
    icon: Coffee,
    personalizedReason: "Based on your coffee challenge",
  },
  {
    id: "d3",
    merchant: "Local Bistro",
    category: "Dining",
    discount: "15% off your bill",
    description: "Enjoy 15% off your total bill when you dine in and pay with your linked card.",
    expiresIn: "7 days",
    icon: Utensils,
    personalizedReason: "Recommended for your date night budget",
  },
]

export function MerchantDeals() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Exclusive Deals</CardTitle>
        <CardDescription>Special offers based on your spending</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {merchantDeals.map((deal) => (
            <div key={deal.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <deal.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{deal.merchant}</h3>
                      <p className="text-xs text-muted-foreground">{deal.category}</p>
                    </div>
                    <Badge variant="outline" className="text-primary">
                      {deal.discount}
                    </Badge>
                  </div>
                  <p className="text-sm mt-2">{deal.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>{deal.personalizedReason}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-muted-foreground">Expires in {deal.expiresIn}</span>
                    <Button size="sm" className="gap-1">
                      Redeem <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
