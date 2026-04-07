"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, ArrowDown, MessageSquare, Share2, PlusIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

// Sample data for savings tips
const savingsTips = [
  {
    id: "t1",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Food & Drink",
    tip: "I saved $60 last month by making coffee at home instead of buying from coffee shops. I bought a nice French press for $25 and it's already paid for itself!",
    votes: 42,
    comments: 7,
    userVote: "up",
    potentialSavings: 60,
  },
  {
    id: "t2",
    author: {
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Transportation",
    tip: "Try carpooling with coworkers or neighbors. I'm saving about $120/month on gas and parking by sharing rides 3 days a week.",
    votes: 28,
    comments: 5,
    userVote: null,
    potentialSavings: 120,
  },
  {
    id: "t3",
    author: {
      name: "Jamie Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Subscriptions",
    tip: "Review all your subscriptions and cancel the ones you don't use regularly. I found 3 subscriptions I forgot about, saving me $35/month!",
    votes: 36,
    comments: 9,
    userVote: "down",
    potentialSavings: 35,
  },
]

export function SavingsTips() {
  const [tips, setTips] = useState(savingsTips)
  const [showNewTip, setShowNewTip] = useState(false)

  const handleVote = (tipId: string, vote: "up" | "down" | null) => {
    setTips(
      tips.map((tip) => {
        if (tip.id === tipId) {
          const currentVote = tip.userVote
          let voteChange = 0

          if (currentVote === vote) {
            // Clicking the same vote button again removes the vote
            voteChange = currentVote === "up" ? -1 : 1
            return { ...tip, votes: tip.votes + voteChange, userVote: null }
          } else if (currentVote === null) {
            // Adding a new vote
            voteChange = vote === "up" ? 1 : -1
            return { ...tip, votes: tip.votes + voteChange, userVote: vote }
          } else {
            // Changing vote direction
            voteChange = vote === "up" ? 2 : -2
            return { ...tip, votes: tip.votes + voteChange, userVote: vote }
          }
        }
        return tip
      }),
    )
  }

  return (
    <>
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Savings Tips</CardTitle>
            <CardDescription>Crowdsourced tips from the community</CardDescription>
          </div>
          <Dialog open={showNewTip} onOpenChange={setShowNewTip}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share a Savings Tip</DialogTitle>
                <DialogDescription>Share your best money-saving tip with the community</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="tip-category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select>
                    <SelectTrigger id="tip-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food & Drink</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="subscriptions">Subscriptions</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="tip-content" className="text-sm font-medium">
                    Your Tip
                  </label>
                  <Textarea id="tip-content" placeholder="Share your money-saving tip..." />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="tip-savings" className="text-sm font-medium">
                    Potential Monthly Savings ($)
                  </label>
                  <Input id="tip-savings" type="number" min="1" placeholder="50" />
                </div>
                <Button onClick={() => setShowNewTip(false)}>Share Tip</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {tips.map((tip) => (
              <div key={tip.id} className="border rounded-lg p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={tip.author.avatar || "/placeholder.svg"} alt={tip.author.name} />
                    <AvatarFallback>{tip.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-sm">{tip.author.name}</h3>
                        <p className="text-xs text-muted-foreground">{tip.category}</p>
                      </div>
                      <div className="text-xs font-medium text-green-600">
                        Save {formatCurrency(tip.potentialSavings)}/mo
                      </div>
                    </div>
                    <p className="text-sm mt-2">{tip.tip}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${tip.userVote === "up" ? "text-green-600" : ""}`}
                          onClick={() => handleVote(tip.id, tip.userVote === "up" ? null : "up")}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">{tip.votes}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${tip.userVote === "down" ? "text-red-600" : ""}`}
                          onClick={() => handleVote(tip.id, tip.userVote === "down" ? null : "down")}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs">{tip.comments}</span>
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
    </>
  )
}
