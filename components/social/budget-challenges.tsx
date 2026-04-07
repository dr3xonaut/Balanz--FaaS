"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusIcon, TrendingUp, Users } from "lucide-react"
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
import { formatCurrency } from "@/lib/utils"

// Sample data for challenges
const challenges = [
  {
    id: "c1",
    title: "No Coffee Shop Challenge",
    description: "Skip coffee shops for 30 days and see how much you save",
    participants: 128,
    duration: "30 days",
    potentialSavings: 120,
    progress: 65,
    joined: true,
    members: [
      { name: "Alex", image: "/placeholder.svg?height=32&width=32" },
      { name: "Jamie", image: "/placeholder.svg?height=32&width=32" },
      { name: "Taylor", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "c2",
    title: "Save $100 in 30 Days",
    description: "Small daily savings that add up to $100 in a month",
    participants: 256,
    duration: "30 days",
    potentialSavings: 100,
    progress: 40,
    joined: false,
    members: [
      { name: "Jordan", image: "/placeholder.svg?height=32&width=32" },
      { name: "Casey", image: "/placeholder.svg?height=32&width=32" },
      { name: "Riley", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "c3",
    title: "Meal Prep Masters",
    description: "Prep all your meals at home for 2 weeks",
    participants: 89,
    duration: "14 days",
    potentialSavings: 150,
    progress: 0,
    joined: false,
    members: [
      { name: "Morgan", image: "/placeholder.svg?height=32&width=32" },
      { name: "Quinn", image: "/placeholder.svg?height=32&width=32" },
      { name: "Avery", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

export function BudgetChallenges() {
  const [showNewChallenge, setShowNewChallenge] = useState(false)
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null)
  const [myChallenges, setMyChallenges] = useState(challenges)

  const handleJoinChallenge = (challengeId: string) => {
    setMyChallenges(
      myChallenges.map((challenge) => (challenge.id === challengeId ? { ...challenge, joined: true } : challenge)),
    )
  }

  return (
    <>
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Budget Challenges</CardTitle>
            <CardDescription>Compete and save with friends</CardDescription>
          </div>
          <Dialog open={showNewChallenge} onOpenChange={setShowNewChallenge}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a Challenge</DialogTitle>
                <DialogDescription>Create a new budget challenge to share with friends</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="challenge-name" className="text-sm font-medium">
                    Challenge Name
                  </label>
                  <Input id="challenge-name" placeholder="e.g. No Coffee Shop Challenge" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="challenge-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea id="challenge-description" placeholder="Describe your challenge" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="challenge-duration" className="text-sm font-medium">
                      Duration (days)
                    </label>
                    <Input id="challenge-duration" type="number" min="1" placeholder="30" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="challenge-savings" className="text-sm font-medium">
                      Target Savings ($)
                    </label>
                    <Input id="challenge-savings" type="number" min="1" placeholder="100" />
                  </div>
                </div>
                <Button onClick={() => setShowNewChallenge(false)}>Create Challenge</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {myChallenges.map((challenge) => (
              <div key={challenge.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{challenge.title}</h3>
                    <p className="text-xs text-muted-foreground">{challenge.description}</p>
                  </div>
                  <Badge variant={challenge.joined ? "default" : "outline"}>
                    {challenge.joined ? "Joined" : challenge.duration}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mt-3 mb-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{challenge.participants} participants</span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground ml-2" />
                  <span className="text-xs text-muted-foreground">
                    Save up to {formatCurrency(challenge.potentialSavings)}
                  </span>
                </div>

                {challenge.joined && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Your progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <div className="flex -space-x-2">
                    {challenge.members.map((member, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs">
                      +{challenge.participants - challenge.members.length}
                    </div>
                  </div>

                  {!challenge.joined ? (
                    <Button size="sm" onClick={() => handleJoinChallenge(challenge.id)}>
                      Join
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{challenge.title}</DialogTitle>
                          <DialogDescription>{challenge.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Duration:</span>
                            <span>{challenge.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Participants:</span>
                            <span>{challenge.participants}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Potential Savings:</span>
                            <span>{formatCurrency(challenge.potentialSavings)}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-sm font-medium">Your Progress:</span>
                            <Progress value={challenge.progress} className="h-2" />
                            <div className="flex justify-between text-xs">
                              <span>Started</span>
                              <span>{challenge.progress}%</span>
                              <span>Complete</span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
