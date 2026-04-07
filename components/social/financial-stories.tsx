"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Share2, TrendingDown, TrendingUp, BarChart2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Sample data for financial stories
const stories = [
  {
    id: "s1",
    title: "Monthly Savings Milestone",
    description:
      "This month, you saved $120 on dining out compared to last month! That's 30% better than similar users in your area.",
    type: "savings",
    amount: 120,
    change: 30,
    icon: TrendingUp,
    iconColor: "text-green-600",
    benchmark: "30% better than similar users",
    shared: false,
  },
  {
    id: "s2",
    title: "Spending Insight",
    description: "Your coffee spending is down 45% since joining the No Coffee Challenge. You've saved $45 this month!",
    type: "challenge",
    amount: 45,
    change: -45,
    icon: TrendingDown,
    iconColor: "text-green-600",
    benchmark: "45% reduction since challenge start",
    shared: true,
  },
  {
    id: "s3",
    title: "Weekly Insight",
    description:
      "You spend most on Fridays - 35% of your weekly expenses happen on this day. Consider planning ahead to reduce impulse spending.",
    type: "insight",
    amount: null,
    change: 35,
    icon: BarChart2,
    iconColor: "text-blue-600",
    benchmark: "35% of weekly spending on Fridays",
    shared: false,
  },
]

export function FinancialStories() {
  const [myStories, setMyStories] = useState(stories)

  const handleShare = (storyId: string) => {
    setMyStories(myStories.map((story) => (story.id === storyId ? { ...story, shared: !story.shared } : story)))
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Financial Stories</CardTitle>
        <CardDescription>Your personalized financial insights</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {myStories.map((story) => (
            <div key={story.id} className="border rounded-lg p-4">
              <div className="flex gap-3">
                <div className={`p-2 rounded-full bg-muted ${story.iconColor}`}>
                  <story.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{story.title}</h3>
                  <p className="text-sm mt-1">{story.description}</p>

                  {story.amount !== null && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm font-medium">
                        {story.type === "savings" ? "Saved" : "Amount"}: {formatCurrency(story.amount)}
                      </span>
                      <div
                        className={`flex items-center text-xs ${story.change < 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {story.change < 0 ? (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(story.change)}%
                      </div>
                    </div>
                  )}

                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>{story.benchmark}</span>
                  </div>

                  <div className="flex justify-end mt-3">
                    <Button
                      variant={story.shared ? "default" : "outline"}
                      size="sm"
                      className="gap-1"
                      onClick={() => handleShare(story.id)}
                    >
                      <Share2 className="h-4 w-4" />
                      {story.shared ? "Shared" : "Share Story"}
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
