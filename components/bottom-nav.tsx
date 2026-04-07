"use client"

import { Home, BarChart3, User, Users, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "insights", label: "Insights", icon: BarChart3 },
    { id: "budget", label: "Budget", icon: DollarSign },
    { id: "community", label: "Social", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md z-10 max-w-[430px] mx-auto">
      <div className="grid grid-cols-5 h-[84px] px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl transition-colors",
              activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            <tab.icon className={cn("h-6 w-6 mb-1", activeTab === tab.id ? "text-primary" : "text-muted-foreground")} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
