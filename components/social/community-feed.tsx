"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart, Share2, ThumbsUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Sample data for community feed
const feedItems = [
  {
    id: "f1",
    type: "investment-review",
    user: {
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I've been using Robinhood for 6 months based on the app's recommendation. So far I've seen a 12% return on my investments! The app's interface is super easy to use.",
    app: "Robinhood",
    return: "12%",
    timeframe: "6 months",
    likes: 42,
    comments: 8,
    liked: false,
    timestamp: "2 hours ago",
  },
  {
    id: "f2",
    type: "challenge-update",
    user: {
      name: "Jamie Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just completed the No Coffee Shop Challenge! I saved $87 this month by making coffee at home. Using the savings to boost my emergency fund.",
    challenge: "No Coffee Shop Challenge",
    saved: 87,
    likes: 28,
    comments: 5,
    liked: true,
    timestamp: "5 hours ago",
  },
  {
    id: "f3",
    type: "goal-milestone",
    user: {
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Halfway to my Japan trip savings goal! Thanks everyone for the budget travel tips. I've been putting aside 10% of each paycheck.",
    goal: "Saving for Japan Trip",
    progress: "50%",
    target: 3000,
    current: 1500,
    likes: 36,
    comments: 12,
    liked: false,
    timestamp: "1 day ago",
  },
]

export function CommunityFeed() {
  const [feed, setFeed] = useState(feedItems)

  const handleLike = (itemId: string) => {
    setFeed(
      feed.map((item) => {
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
        <CardTitle className="text-base font-medium">Community Feed</CardTitle>
        <CardDescription>See what others are sharing</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {feed.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                  <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{item.user.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                    </div>
                    {item.type === "investment-review" && (
                      <div className="text-xs font-medium text-green-600">{item.return} return</div>
                    )}
                    {item.type === "challenge-update" && (
                      <div className="text-xs font-medium text-green-600">Saved {formatCurrency(item.saved)}</div>
                    )}
                    {item.type === "goal-milestone" && (
                      <div className="text-xs font-medium text-green-600">{item.progress} complete</div>
                    )}
                  </div>

                  <p className="text-sm mt-2">{item.content}</p>

                  {item.type === "investment-review" && (
                    <div className="mt-2 p-2 bg-muted rounded-md">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium">App Recommendation: {item.app}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.return} return over {item.timeframe}
                      </p>
                    </div>
                  )}

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
