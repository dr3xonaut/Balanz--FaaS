"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Paperclip, ImageIcon } from "lucide-react"

interface Message {
  id: string
  text: string
  timestamp: string
  isFromMe: boolean
  status?: "sending" | "sent" | "delivered" | "read"
}

// Sample messages data
const messageThreads: Record<string, Message[]> = {
  c1: [
    {
      id: "m1",
      text: "Hey Allen! I saw your savings tip about making coffee at home.",
      timestamp: "10:15 AM",
      isFromMe: false,
    },
    {
      id: "m2",
      text: "Yeah, it's been saving me about $50 a month!",
      timestamp: "10:18 AM",
      isFromMe: true,
      status: "read",
    },
    {
      id: "m3",
      text: "That's awesome! Any other tips you've found helpful?",
      timestamp: "10:20 AM",
      isFromMe: false,
    },
    {
      id: "m4",
      text: "I've also been meal prepping on Sundays, which cuts down on takeout.",
      timestamp: "10:22 AM",
      isFromMe: true,
      status: "read",
    },
    {
      id: "m5",
      text: "Thanks for the savings tip! I'm going to try it this month.",
      timestamp: "10:23 AM",
      isFromMe: false,
    },
  ],
  c2: [
    {
      id: "m1",
      text: "Hi Allen, how's your savings goal for Japan coming along?",
      timestamp: "Yesterday",
      isFromMe: false,
    },
    {
      id: "m2",
      text: "It's going well! I'm about 40% of the way there.",
      timestamp: "Yesterday",
      isFromMe: true,
      status: "read",
    },
    {
      id: "m3",
      text: "How's your progress on the Japan trip savings?",
      timestamp: "Yesterday",
      isFromMe: false,
    },
  ],
  c3: [
    {
      id: "m1",
      text: "Hey, I noticed you're doing the No Coffee Challenge too!",
      timestamp: "Monday",
      isFromMe: false,
    },
    {
      id: "m2",
      text: "Yes! It's been tough but I'm saving a lot.",
      timestamp: "Monday",
      isFromMe: true,
      status: "read",
    },
    {
      id: "m3",
      text: "I joined the No Coffee Challenge too! Let's keep each other accountable.",
      timestamp: "Monday",
      isFromMe: true,
      status: "read",
    },
  ],
}

interface MessageThreadProps {
  conversationId: string
  onBack: () => void
  conversations: any[]
}

export function MessageThread({ conversationId, onBack, conversations }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(messageThreads[conversationId] || [])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = conversations.find((c) => c.id === conversationId)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: newMessage,
      timestamp: "Just now",
      isFromMe: true,
      status: "sending",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate message being sent
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-full">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={conversation?.user.avatar || "/placeholder.svg"} alt={conversation?.user.name} />
          <AvatarFallback>{conversation?.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{conversation?.user.name}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.isFromMe ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                  {message.isFromMe && message.status && (
                    <span className="text-xs opacity-70">
                      {message.status === "sending" && "⋯"}
                      {message.status === "sent" && "✓"}
                      {message.status === "delivered" && "✓✓"}
                      {message.status === "read" && "✓✓"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            className="flex-1 rounded-full"
          />
          <Button
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
