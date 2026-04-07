"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetChallenges } from "@/components/social/budget-challenges"
import { SavingsTips } from "@/components/social/savings-tips"
import { FinancialGoals } from "@/components/social/financial-goals"
import { CommunityFeed } from "@/components/social/community-feed"
import { ReferralProgram } from "@/components/social/referral-program"
import { MerchantDeals } from "@/components/social/merchant-deals"
import { FinancialNews } from "@/components/social/financial-news"
import { HouseholdBudgeting } from "@/components/social/household-budgeting"
import { FinancialStories } from "@/components/social/financial-stories"
import { Leaderboards } from "@/components/social/leaderboards"

export function CommunityView() {
  const [activeTab, setActiveTab] = useState("feed")

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">Connect, share, and grow together</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 h-9">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="leaderboards">Rankings</TabsTrigger>
          <TabsTrigger value="more">More</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-4 space-y-4">
          <CommunityFeed />
          <FinancialNews />
        </TabsContent>

        <TabsContent value="challenges" className="mt-4 space-y-4">
          <BudgetChallenges />
          <SavingsTips />
        </TabsContent>

        <TabsContent value="goals" className="mt-4 space-y-4">
          <FinancialGoals />
          <FinancialStories />
        </TabsContent>

        <TabsContent value="leaderboards" className="mt-4 space-y-4">
          <Leaderboards />
        </TabsContent>

        <TabsContent value="more" className="mt-4 space-y-4">
          <ReferralProgram />
          <MerchantDeals />
          <HouseholdBudgeting />
        </TabsContent>
      </Tabs>
    </div>
  )
}
