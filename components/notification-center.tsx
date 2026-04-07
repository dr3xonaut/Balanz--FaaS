"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

// Sample notification data
const notifications = [
  {
    id: "n1",
    type: "social",
    title: "Alex liked your savings tip",
    message: "Alex liked your tip about making coffee at home.",
    time: "5 minutes ago",
    read: false,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "n2",
    type: "challenge",
    title: "Challenge completed!",
    message: "You've successfully completed the No Coffee Shop Challenge.",
    time: "2 hours ago",
    read: false,
    amount: 87,
  },
  {
    id: "n3",
    type: "message",
    title: "New message from Jamie",
    message: "Hey, I saw your savings goal. How's it going with that?",
    time: "Yesterday",
    read: true,
    user: {
      name: "Jamie Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "n4",
    type: "financial",
    title: "Unusual spending detected",
    message: "We noticed higher than usual spending on dining out this week.",
    time: "2 days ago",
    read: true,
    amount: 120,
  },
  {
    id: "n5",
    type: "achievement",
    title: "New achievement unlocked!",
    message: "You've earned the 'Budget Master' badge for staying under budget for 3 months.",
    time: "3 days ago",
    read: true,
  },
]

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [notifs, setNotifs] = useState(notifications)

  const unreadCount = notifs.filter((n) => !n.read).length

  const filteredNotifications = activeTab === "all" ? notifs : notifs.filter((n) => n.type === activeTab)

  const markAsRead = (id: string) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full" onClick={() => setOpen(true)}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 rounded-xl" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 text-xs rounded-lg" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Social
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Financial
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="max-h-[300px] overflow-auto">
            {renderNotifications(filteredNotifications, markAsRead)}
          </TabsContent>
          <TabsContent value="social" className="max-h-[300px] overflow-auto">
            {renderNotifications(filteredNotifications, markAsRead)}
          </TabsContent>
          <TabsContent value="financial" className="max-h-[300px] overflow-auto">
            {renderNotifications(filteredNotifications, markAsRead)}
          </TabsContent>
        </Tabs>
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full justify-center text-xs rounded-lg">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function renderNotifications(notifications: typeof notifications, markAsRead: (id: string) => void) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-sm text-muted-foreground">No notifications</p>
      </div>
    )
  }

  return notifications.map((notification) => (
    <div
      key={notification.id}
      className={`flex gap-3 p-4 hover:bg-muted/50 ${!notification.read ? "bg-muted/20" : ""}`}
      onClick={() => markAsRead(notification.id)}
    >
      {notification.user ? (
        <Avatar className="h-8 w-8">
          <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
          <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <NotificationIcon type={notification.type} />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium">{notification.title}</p>
          {!notification.read && <Badge className="h-1.5 w-1.5 rounded-full bg-primary p-0" />}
        </div>
        <p className="text-xs text-muted-foreground">{notification.message}</p>
        {notification.amount && (
          <p className="text-xs font-medium text-green-600 mt-1">
            {notification.type === "challenge"
              ? `Saved ${formatCurrency(notification.amount)}`
              : formatCurrency(notification.amount)}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
      </div>
    </div>
  ))
}

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case "challenge":
      return <span className="text-xs">🏆</span>
    case "financial":
      return <span className="text-xs">💰</span>
    case "achievement":
      return <span className="text-xs">🌟</span>
    case "message":
      return <span className="text-xs">💬</span>
    default:
      return <span className="text-xs">📣</span>
  }
}
