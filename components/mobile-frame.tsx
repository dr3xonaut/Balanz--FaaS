"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { Battery, Signal, Wifi } from "lucide-react"

interface MobileFrameProps {
  children: ReactNode
}

export function MobileFrame({ children }: MobileFrameProps) {
  const [currentTime, setCurrentTime] = useState<string>("")

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const period = hours >= 12 ? "PM" : "AM"
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${period}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-[430px] h-[932px] bg-background rounded-[55px] overflow-hidden shadow-xl border-[14px] border-gray-900">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="mx-auto mt-1 w-[126px] h-[37px] bg-black rounded-full"></div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-14 z-10 px-8 pt-3 flex justify-between items-start">
          <div className="text-sm font-medium">{currentTime}</div>
          <div className="flex items-center gap-1.5">
            <Signal className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-4 w-4" />
          </div>
        </div>

        <div className="h-full pt-14 overflow-hidden flex flex-col">{children}</div>
      </div>
    </div>
  )
}
