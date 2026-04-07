"use client"

import { ArrowRight, TrendingUp, Briefcase, LineChart, PiggyBank } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InvestmentRecommendations() {
  // Sample data - in a real app, this would come from your backend
  const investments = [
    {
      id: "i1",
      name: "Robo-Advisor",
      description: "Automated investing with low fees",
      riskLevel: "Low-Medium",
      expectedReturn: "5-8%",
      icon: TrendingUp,
    },
    {
      id: "i2",
      name: "Index Funds",
      description: "Diversified market exposure",
      riskLevel: "Medium",
      expectedReturn: "7-10%",
      icon: LineChart,
    },
    {
      id: "i3",
      name: "High-Yield Savings",
      description: "FDIC insured with better rates",
      riskLevel: "Very Low",
      expectedReturn: "3-4%",
      icon: PiggyBank,
    },
    {
      id: "i4",
      name: "401(k)/IRA",
      description: "Tax-advantaged retirement accounts",
      riskLevel: "Varies",
      expectedReturn: "6-9%",
      icon: Briefcase,
    },
  ]

  const handleExplore = (id: string) => {
    // In a real app, this would navigate to the investment details page
    console.log(`Exploring investment: ${id}`)
  }

  return (
    <div className="space-y-4">
      {investments.map((investment) => (
        <div key={investment.id} className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100">
            <investment.icon className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium">{investment.name}</div>
            <div className="text-xs text-muted-foreground">{investment.description}</div>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{investment.riskLevel} risk</span>
              <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{investment.expectedReturn} return</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleExplore(investment.id)}>
            Explore <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
}
