"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  CreditCard,
  HelpCircle,
  Lock,
  LogOut,
  Settings,
  User,
  Award,
  Shield,
  TrendingUp,
  MessageSquare,
  Eye,
  EyeOff,
  Moon,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

// Sample achievements data
const achievements = [
  {
    id: "a1",
    title: "Budget Master",
    description: "Stayed under budget for 3 consecutive months",
    icon: Award,
    earned: true,
    date: "2023-09-15",
  },
  {
    id: "a2",
    title: "Savings Starter",
    description: "Saved your first $500",
    icon: TrendingUp,
    earned: true,
    date: "2023-08-22",
  },
  {
    id: "a3",
    title: "Challenge Champion",
    description: "Completed 5 savings challenges",
    icon: Shield,
    earned: false,
    progress: 60,
  },
  {
    id: "a4",
    title: "Community Contributor",
    description: "Shared 10 savings tips that received likes",
    icon: MessageSquare,
    earned: false,
    progress: 40,
  },
]

export function ProfileView() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showFinancialInfo, setShowFinancialInfo] = useState(true)
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/10">
          <AvatarImage src="/placeholder.svg?height=64&width=64&text=AD" alt="Allen Drexel" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Allen Drexel</h1>
          <p className="text-muted-foreground">allen.drexel@example.com</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 h-10 rounded-xl p-0.5">
          <TabsTrigger value="profile" className="rounded-lg">
            Profile
          </TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-lg">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-medium">Financial Summary</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowFinancialInfo(!showFinancialInfo)}
                >
                  {showFinancialInfo ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {showFinancialInfo ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Balance</p>
                        <p className="text-xl font-bold">{formatCurrency(12458.23)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Savings</p>
                        <p className="text-xl font-bold">{formatCurrency(450)}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Savings Goal Progress</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2 rounded-full" />
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center text-muted-foreground">
                    <p>Financial information hidden</p>
                    <p className="text-xs">Click the eye icon to show</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Stats & Ranking</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-2xl font-bold">#28</p>
                    <p className="text-xs text-muted-foreground">Savings Rank</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-muted-foreground">Challenges Won</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Tips Shared</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-primary/10 rounded-lg">
                    Top Saver
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 rounded-lg">
                    Challenge Pro
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 rounded-lg">
                    Community Helper
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Personal Information</div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    Edit
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Payment Methods</div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Security</div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    Update
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Moon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Appearance</div>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-4 space-y-4">
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Your Achievements</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${achievement.earned ? "bg-primary/10" : "bg-muted"}`}>
                      <achievement.icon
                        className={`h-4 w-4 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{achievement.title}</h3>
                        {achievement.earned && (
                          <Badge variant="outline" className="ml-auto text-xs rounded-lg">
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      {achievement.earned ? (
                        <p className="text-xs text-muted-foreground mt-1">
                          Earned on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      ) : (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-1.5 rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4 space-y-4">
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-visibility" className="flex-1">
                    <div className="font-medium">Profile Visibility</div>
                    <p className="text-xs text-muted-foreground">Who can see your profile</p>
                  </Label>
                  <select
                    id="profile-visibility"
                    className="h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="public">Everyone</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="financial-info-visibility" className="flex-1">
                    <div className="font-medium">Financial Information</div>
                    <p className="text-xs text-muted-foreground">Who can see your financial details</p>
                  </Label>
                  <select
                    id="financial-info-visibility"
                    className="h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="private">Only Me</option>
                    <option value="friends">Friends Only</option>
                    <option value="public">Everyone</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="activity-visibility" className="flex-1">
                    <div className="font-medium">Activity Visibility</div>
                    <p className="text-xs text-muted-foreground">Who can see your challenges and goals</p>
                  </Label>
                  <select
                    id="activity-visibility"
                    className="h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="friends">Friends Only</option>
                    <option value="public">Everyone</option>
                    <option value="private">Only Me</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Bell className="h-4 w-4" />
                    </div>
                    <Label htmlFor="push-notifications" className="font-medium">
                      Push Notifications
                    </Label>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Bell className="h-4 w-4" />
                    </div>
                    <Label htmlFor="email-notifications" className="font-medium">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Bell className="h-4 w-4" />
                    </div>
                    <Label htmlFor="sms-tracking" className="font-medium">
                      SMS Transaction Tracking
                    </Label>
                  </div>
                  <Switch id="sms-tracking" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme-setting" className="flex-1">
                    <div className="font-medium">Theme</div>
                    <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
                  </Label>
                  <select
                    id="theme-setting"
                    className="h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    onChange={(e) => {
                      setTheme(e.target.value)
                    }}
                    value={theme}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Support</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Help Center</div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    Visit
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Settings className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">App Settings</div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    Adjust
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Sign Out</div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
