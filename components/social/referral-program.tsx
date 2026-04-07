"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Share2, Copy, Gift, MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ReferralProgram() {
  const { toast } = useToast()
  const referralCode = "FRIEND25"

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    toast({
      title: "Referral code copied!",
      description: "Share it with friends to earn rewards.",
    })
  }

  const handleShare = () => {
    // In a real app, this would open the native share dialog
    toast({
      title: "Sharing options",
      description: "This would open your device's share menu in a real app.",
    })
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Referral Program</CardTitle>
        <CardDescription>Invite friends and earn rewards</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <Gift className="h-10 w-10 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Earn rewards for every friend who joins</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You'll get $10 for each friend who signs up and actively uses the app for 30 days
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="referral-code" className="text-sm font-medium">
              Your referral code
            </label>
            <div className="flex gap-2">
              <Input id="referral-code" value={referralCode} readOnly className="font-mono" />
              <Button variant="outline" size="icon" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Share with friends</label>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Link
              </Button>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium">Your referral stats</h3>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Friends invited</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">$20</p>
                <p className="text-xs text-muted-foreground">Rewards earned</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
