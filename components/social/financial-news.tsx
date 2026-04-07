"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart, Share2, TrendingUp, BarChart } from "lucide-react"

// Sample data for financial news
const newsItems = [
  {
    id: "n1",
    type: "market-update",
    title: "Market Update: Tech stocks rally as inflation cools",
    summary:
      "Technology stocks are seeing gains as the latest inflation report shows signs of cooling. This could impact your investment recommendations.",
    source: "Financial Times",
    sourceIcon: "/placeholder.svg?height=24&width=24",
    relevance: "Related to your investment interests",
    likes: 28,
    comments: 7,
    liked: false,
    timestamp: "3 hours ago",
    icon: TrendingUp,
    iconColor: "text-green-600",
  },
  {
    id: "n2",
    type: "spending-trend",
    title: "Spending Trend: Coffee shop spending up 20% in your area",
    summary:
      "Local data shows coffee spending is up 20% this month. If you're participating in the No Coffee Challenge, stay strong! You're saving more than the average person.",
    relevance: "Related to your Coffee Challenge",
    likes: 15,
    comments: 4,
    liked: true,
    timestamp: "1 day ago",
    icon: BarChart,
    iconColor: "text-blue-600",
  },
  {
    id: "n3",
    type: "app-review",
    title: "App Review: Robinhood adds new retirement account options",
    summary:
      "Robinhood has added new retirement account options with no fees. Based on your investment goals, this might be worth exploring.",
    source: "TechCrunch",
    sourceIcon: "/placeholder.svg?height=24&width=24",
    relevance: "Recommended for your retirement goals",
    likes: 42,
    comments: 12,
    liked: false,
    timestamp: "2 days ago",
    icon: TrendingUp,
    iconColor: "text-green-600",
  },
]

export function FinancialNews() {
  const [news, setNews] = useState(newsItems)

  const handleLike = (itemId: string) => {
    setNews(
      news.map((item) => {
        if (item.id === itemId) {
          const newLiked = !item.liked
          return {
            ...item,
            liked: newLiked,
            likes: newLiked ? item.likes + 1 : item.likes - 1,
          }
        }
        return item
      }),
    )
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Financial News & Trends</CardTitle>
        <CardDescription>Personalized updates for you</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex gap-3">
                <div className={`p-2 rounded-full bg-muted ${item.iconColor}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  {item.source && (
                    <div className="flex items-center gap-1 mt-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={item.sourceIcon || "/placeholder.svg"} alt={item.source} />
                        <AvatarFallback>{item.source[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {item.source} • {item.timestamp}
                      </span>
                    </div>
                  )}
                  {!item.source && <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>}

                  <p className="text-sm mt-2">{item.summary}</p>

                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <span>{item.relevance}</span>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 gap-1 ${item.liked ? "text-red-600" : ""}`}
                      onClick={() => handleLike(item.id)}
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">{item.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-xs">{item.comments}</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                      <Share2 className="h-4 w-4" />
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
