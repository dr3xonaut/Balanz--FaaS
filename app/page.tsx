"use client"

import { useState } from "react"
import { MobileFrame } from "@/components/mobile-frame"
import { DashboardView } from "@/components/dashboard-view"
import { InsightsView } from "@/components/insights-view"
import { ProfileView } from "@/components/profile-view"
import { CommunityView } from "@/components/community-view"
import { BudgetView } from "@/components/budget-view"
import { BottomNav } from "@/components/bottom-nav"
import { AppHeader } from "@/components/app-header"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <MobileFrame>
      <main className="flex flex-col h-full bg-background">
        <AppHeader />
        <div className="flex-1 overflow-auto pb-[84px] pt-12">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "insights" && <InsightsView />}
          {activeTab === "budget" && <BudgetView />}
          {activeTab === "community" && <CommunityView />}
          {activeTab === "profile" && <ProfileView />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
    </MobileFrame>
  )
}
