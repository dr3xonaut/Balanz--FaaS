"use client"

import { NotificationCenter } from "@/components/notification-center"
import { MessageCenter } from "@/components/messaging/message-center"
import { ThemeToggleSimple } from "@/components/theme-toggle-simple"

export function AppHeader() {
  return (
    <div className="fixed top-14 left-0 right-0 h-12 border-b bg-background/80 backdrop-blur-md z-10 max-w-[430px] mx-auto flex items-center justify-between px-6">
      <ThemeToggleSimple />
      <div className="flex items-center gap-3">
        <NotificationCenter />
        <MessageCenter />
      </div>
    </div>
  )
}
