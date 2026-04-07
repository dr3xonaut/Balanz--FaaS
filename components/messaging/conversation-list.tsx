"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Conversation {
  id: string
  user: {
    id: string
    name: string
    avatar: string
  }
  lastMessage: {
    text: string
    timestamp: string
    isRead: boolean
    isFromMe: boolean
  }
  unreadCount: number
}

interface ConversationListProps {
  conversations: Conversation[]
  onSelectConversation: (id: string) => void
}

export function ConversationList({ conversations, onSelectConversation }: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-sm text-muted-foreground">No conversations found</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer"
          onClick={() => onSelectConversation(conversation.id)}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
            <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <p className={`font-medium truncate ${conversation.unreadCount > 0 ? "font-semibold" : ""}`}>
                {conversation.user.name}
              </p>
              <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
            </div>
            <p
              className={`text-sm truncate ${conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {conversation.lastMessage.isFromMe && "You: "}
              {conversation.lastMessage.text}
            </p>
          </div>
          {conversation.unreadCount > 0 && (
            <Badge className="ml-auto bg-primary text-primary-foreground rounded-full">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      ))}
    </div>
  )
}
