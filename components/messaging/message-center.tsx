"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConversationList } from "@/components/messaging/conversation-list"
import { MessageThread } from "@/components/messaging/message-thread"

// Sample conversations data
const conversations = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: {
      text: "Thanks for the savings tip! I'm going to try it this month.",
      timestamp: "10:23 AM",
      isRead: false,
      isFromMe: false,
    },
    unreadCount: 1,
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Jamie Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: {
      text: "How's your progress on the Japan trip savings?",
      timestamp: "Yesterday",
      isRead: true,
      isFromMe: false,
    },
    unreadCount: 0,
  },
  {
    id: "c3",
    user: {
      id: "u3",
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: {
      text: "I joined the No Coffee Challenge too! Let's keep each other accountable.",
      timestamp: "Monday",
      isRead: true,
      isFromMe: true,
    },
    unreadCount: 0,
  },
]

export function MessageCenter() {
  const [open, setOpen] = useState(false)
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  const filteredConversations = searchQuery
    ? conversations.filter(
        (conv) =>
          conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : conversations

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id)
  }

  const handleBack = () => {
    setActiveConversation(null)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full" onClick={() => setOpen(true)}>
          <MessageSquare className="h-5 w-5" />
          {totalUnreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
              {totalUnreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col rounded-l-2xl">
        {!activeConversation ? (
          <>
            <SheetHeader className="border-b p-4">
              <SheetTitle>Messages</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 rounded-xl"
              />
              <ConversationList conversations={filteredConversations} onSelectConversation={handleSelectConversation} />
            </div>
          </>
        ) : (
          <MessageThread conversationId={activeConversation} onBack={handleBack} conversations={conversations} />
        )}
      </SheetContent>
    </Sheet>
  )
}
