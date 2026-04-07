'use client'

import { useState } from 'react'
import { MobileFrame } from '@/components/mobile-frame'
import { DashboardView } from '@/components/dashboard-view'
import { InsightsView } from '@/components/insights-view'
import { BudgetView } from '@/components/budget-view'
import { CommunityView } from '@/components/community-view'
import { ProfileView } from '@/components/profile-view'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderView = () => {
    switch (activeTab) {
      case 'insights':
        return <InsightsView />
      case 'budget':
        return <BudgetView />
      case 'community':
        return <CommunityView />
      case 'profile':
        return <ProfileView />
      default:
        return <DashboardView />
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <MobileFrame activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderView()}
      </MobileFrame>
    </main>
  )
}
