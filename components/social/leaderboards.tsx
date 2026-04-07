"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Medal, Trophy, Filter } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Sample leaderboard data
const savingsLeaderboard = [
  {
    rank: 1,
    user: {
      id: "u1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 1250,
    change: 2,
    isCurrentUser: false,
    badges: ["Top Saver", "Challenge Pro"],
  },
  {
    rank: 2,
    user: {
      id: "u2",
      name: "Jamie Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 980,
    change: 0,
    isCurrentUser: false,
    badges: ["Consistent Saver"],
  },
  {
    rank: 3,
    user: {
      id: "u3",
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 875,
    change: 1,
    isCurrentUser: false,
    badges: ["Goal Achiever"],
  },
  {
    rank: 4,
    user: {
      id: "u4",
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 820,
    change: -2,
    isCurrentUser: false,
    badges: [],
  },
  {
    rank: 5,
    user: {
      id: "u5",
      name: "Jordan Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 780,
    change: 3,
    isCurrentUser: false,
    badges: [],
  },
  {
    rank: 28,
    user: {
      id: "u28",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 450,
    change: 5,
    isCurrentUser: true,
    badges: ["Rising Star"],
  },
]

const challengeLeaderboard = [
  {
    rank: 1,
    user: {
      id: "u6",
      name: "Riley Park",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    challenges: 12,
    savings: 980,
    isCurrentUser: false,
    badges: ["Challenge Master"],
  },
  {
    rank: 2,
    user: {
      id: "u7",
      name: "Casey Wong",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    challenges: 10,
    savings: 850,
    isCurrentUser: false,
    badges: ["Coffee Skipper"],
  },
  {
    rank: 3,
    user: {
      id: "u8",
      name: "Quinn Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    challenges: 8,
    savings: 720,
    isCurrentUser: false,
    badges: [],
  },
  {
    rank: 4,
    user: {
      id: "u9",
      name: "Avery Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    challenges: 7,
    savings: 680,
    isCurrentUser: false,
    badges: [],
  },
  {
    rank: 5,
    user: {
      id: "u10",
      name: "Jordan Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    challenges: 6,
    savings: 590,
    isCurrentUser: false,
    badges: [],
  },
  {
    rank: 8,
    user: {
      id: "u28",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    challenges: 5,
    savings: 450,
    isCurrentUser: true,
    badges: [],
  },
]

const tipsLeaderboard = [
  {
    rank: 1,
    user: {
      id: "u11",
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tips: 24,
    upvotes: 156,
    isCurrentUser: false,
    badges: ["Tip Master"],
  },
  {
    rank: 2,
    user: {
      id: "u12",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tips: 18,
    upvotes: 132,
    isCurrentUser: false,
    badges: ["Helpful Guru"],
  },
  {
    rank: 3,
    user: {
      id: "u13",
      name: "Jamie Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tips: 15,
    upvotes: 98,
    isCurrentUser: false,
    badges: [],
  },
  {
    rank: 4,
    user: {
      id: "u14",
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tips: 12,
    upvotes: 87,
    isCurrentUser: false,
    badges: [],
  },
  {
    rank: 5,
    user: {
      id: "u15",
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tips: 10,
    upvotes: 76,
    isCurrentUser: false,
    badges: [],
  },
  {
    rank: 7,
    user: {
      id: "u28",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tips: 12,
    upvotes: 65,
    isCurrentUser: true,
    badges: [],
  },
]

export function Leaderboards() {
  const [activeTab, setActiveTab] = useState("savings")
  const [timeframe, setTimeframe] = useState("month")

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base font-medium">Leaderboards</CardTitle>
            <CardDescription>See how you rank against others</CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3 w-3" />
              <span className="text-xs">Filter</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 h-9 mb-4">
            <TabsTrigger value="savings" className="text-xs">
              Savings
            </TabsTrigger>
            <TabsTrigger value="challenges" className="text-xs">
              Challenges
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-xs">
              Tips
            </TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>Top Savers</span>
            </div>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <TabsContent value="savings" className="mt-0">
            <div className="space-y-2">
              {savingsLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    entry.isCurrentUser ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-center w-6">
                    {entry.rank <= 3 ? (
                      <Medal
                        className={`h-5 w-5 ${
                          entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-gray-400" : "text-amber-700"
                        }`}
                      />
                    ) : (
                      <span className="text-sm font-medium">{entry.rank}</span>
                    )}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.user.avatar || "/placeholder.svg"} alt={entry.user.name} />
                    <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">
                        {entry.user.name} {entry.isCurrentUser && "(You)"}
                      </p>
                      {entry.change !== 0 && (
                        <div
                          className={`flex items-center text-xs ${
                            entry.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {entry.change > 0 ? "↑" : "↓"}
                          {Math.abs(entry.change)}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {entry.badges.map((badge, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] py-0 h-4 bg-primary/5">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(entry.amount)}</p>
                    <p className="text-xs text-muted-foreground">saved this {timeframe}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-0">
            <div className="space-y-2">
              {challengeLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    entry.isCurrentUser ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-center w-6">
                    {entry.rank <= 3 ? (
                      <Medal
                        className={`h-5 w-5 ${
                          entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-gray-400" : "text-amber-700"
                        }`}
                      />
                    ) : (
                      <span className="text-sm font-medium">{entry.rank}</span>
                    )}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.user.avatar || "/placeholder.svg"} alt={entry.user.name} />
                    <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">
                        {entry.user.name} {entry.isCurrentUser && "(You)"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {entry.badges.map((badge, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] py-0 h-4 bg-primary/5">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{entry.challenges} challenges</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(entry.savings)} saved</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-0">
            <div className="space-y-2">
              {tipsLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    entry.isCurrentUser ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-center w-6">
                    {entry.rank <= 3 ? (
                      <Medal
                        className={`h-5 w-5 ${
                          entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-gray-400" : "text-amber-700"
                        }`}
                      />
                    ) : (
                      <span className="text-sm font-medium">{entry.rank}</span>
                    )}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.user.avatar || "/placeholder.svg"} alt={entry.user.name} />
                    <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">
                        {entry.user.name} {entry.isCurrentUser && "(You)"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {entry.badges.map((badge, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] py-0 h-4 bg-primary/5">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{entry.tips} tips</p>
                    <p className="text-xs text-muted-foreground">{entry.upvotes} upvotes</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
