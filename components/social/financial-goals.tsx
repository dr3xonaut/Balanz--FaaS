"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusIcon, MessageSquare, Heart, Share2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Sample data for financial goals
const financialGoals = [
  {
    id: "g1",
    user: {
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Saving for Japan Trip",
    description: "I'm saving for a 2-week trip to Japan next summer. Any tips for budget travel in Tokyo?",
    targetAmount: 3000,
    currentAmount: 1200,
    supporters: 8,
    comments: 12,
    liked: true,
    privacy: "public",
  },
  {
    id: "g2",
    user: {
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Emergency Fund",
    description: "Building a 6-month emergency fund. Slow and steady progress!",
    targetAmount: 10000,
    currentAmount: 4500,
    supporters: 5,
    comments: 7,
    liked: false,
    privacy: "friends",
  },
  {
    id: "g3",
    user: {
      name: "Casey Wong",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Pay Off Student Loans",
    description: "Working to pay off my student loans by the end of the year. $15k to go!",
    targetAmount: 25000,
    currentAmount: 10000,
    supporters: 15,
    comments: 23,
    liked: false,
    privacy: "public",
  },
]

export function FinancialGoals() {
  const [goals, setGoals] = useState(financialGoals)
  const [showNewGoal, setShowNewGoal] = useState(false)
  const [showComments, setShowComments] = useState<string | null>(null)
  const [goalTitle, setGoalTitle] = useState("")
  const [goalDescription, setGoalDescription] = useState("")
  const [goalAmount, setGoalAmount] = useState("")
  const [goalPrivacy, setGoalPrivacy] = useState("public")
  const { toast } = useToast()

  const handleLike = (goalId: string) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const newLiked = !goal.liked
          return {
            ...goal,
            liked: newLiked,
            supporters: newLiked ? goal.supporters + 1 : goal.supporters - 1,
          }
        }
        return goal
      }),
    )
  }

  const handleShare = (goalId: string) => {
    toast({
      title: "Shared!",
      description: "Your goal has been shared with your network.",
    })
  }

  const handleAddGoal = () => {
    if (!goalTitle || !goalDescription || !goalAmount) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create a goal.",
        variant: "destructive",
      })
      return
    }

    const newGoal = {
      id: `g${goals.length + 1}`,
      user: {
        name: "Allen Drexel",
        avatar: "/placeholder.svg?height=40&width=40&text=AD",
      },
      title: goalTitle,
      description: goalDescription,
      targetAmount: Number.parseFloat(goalAmount),
      currentAmount: 0,
      supporters: 0,
      comments: 0,
      liked: false,
      privacy: goalPrivacy,
    }

    setGoals([newGoal, ...goals])
    setGoalTitle("")
    setGoalDescription("")
    setGoalAmount("")
    setGoalPrivacy("public")
    setShowNewGoal(false)

    toast({
      title: "Goal created!",
      description: "Your financial goal has been created successfully.",
    })
  }

  return (
    <>
      <Card className="border-none shadow-sm rounded-xl">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Financial Goals</CardTitle>
            <CardDescription>Share and track your financial goals</CardDescription>
          </div>
          <Dialog open={showNewGoal} onOpenChange={setShowNewGoal}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full" onClick={() => setShowNewGoal(true)}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl">
              <DialogHeader>
                <DialogTitle>Create a Financial Goal</DialogTitle>
                <DialogDescription>Share your financial goal with the community</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="goal-title" className="text-sm font-medium">
                    Goal Title
                  </label>
                  <Input
                    id="goal-title"
                    placeholder="e.g. Saving for a house down payment"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="goal-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="goal-description"
                    placeholder="Describe your financial goal..."
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="goal-amount" className="text-sm font-medium">
                    Target Amount ($)
                  </label>
                  <Input
                    id="goal-amount"
                    type="number"
                    min="1"
                    placeholder="5000"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="goal-privacy" className="text-sm font-medium">
                    Who can see this?
                  </label>
                  <Select value={goalPrivacy} onValueChange={setGoalPrivacy}>
                    <SelectTrigger id="goal-privacy" className="rounded-lg">
                      <SelectValue placeholder="Select privacy setting" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="public">Public (Everyone)</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private (Only Me)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddGoal} className="rounded-lg">
                  Create Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="border rounded-lg p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={goal.user.avatar || "/placeholder.svg"} alt={goal.user.name} />
                    <AvatarFallback>{goal.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-sm">{goal.user.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {goal.privacy === "public" ? "Public" : "Friends Only"}
                        </p>
                      </div>
                    </div>
                    <h4 className="font-medium mt-2">{goal.title}</h4>
                    <p className="text-sm mt-1">{goal.description}</p>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>
                          Progress: {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                        </span>
                        <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                      </div>
                      <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-2 rounded-full" />
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 gap-1 rounded-lg ${goal.liked ? "text-red-600" : ""}`}
                        onClick={() => handleLike(goal.id)}
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{goal.supporters}</span>
                      </Button>

                      <Dialog
                        open={showComments === goal.id}
                        onOpenChange={(open) => setShowComments(open ? goal.id : null)}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-lg">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-xs">{goal.comments}</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-xl">
                          <DialogHeader>
                            <DialogTitle>Comments on {goal.title}</DialogTitle>
                          </DialogHeader>
                          <div className="max-h-[300px] overflow-y-auto py-4">
                            <div className="space-y-4">
                              <div className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Johnson" />
                                  <AvatarFallback>AJ</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 bg-muted p-3 rounded-lg">
                                  <p className="text-sm font-medium">Alex Johnson</p>
                                  <p className="text-sm">Great goal! I'm saving for a trip to Japan too.</p>
                                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Jamie Lee" />
                                  <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 bg-muted p-3 rounded-lg">
                                  <p className="text-sm font-medium">Jamie Lee</p>
                                  <p className="text-sm">Check out the budget travel subreddit for tips!</p>
                                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Input placeholder="Add a comment..." className="rounded-lg" />
                            <Button className="rounded-lg">Post</Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto rounded-lg"
                        onClick={() => handleShare(goal.id)}
                      >
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
