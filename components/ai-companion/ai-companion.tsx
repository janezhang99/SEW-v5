"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Loader2,
  ArrowRight,
  Clock,
  DollarSign,
  Lightbulb,
  Users,
  Heart,
  BookOpen,
  MessageSquare,
  Settings,
  HelpCircle,
  MapPin,
  Briefcase,
  Sparkles,
} from "lucide-react"
import { useAICompanion } from "./ai-companion-context"
import { useTasks } from "@/contexts/tasks-context"
import { AvatarSelector } from "./avatar-selector"
import type { Message, TonePreference } from "./types"
import { cn } from "@/lib/utils"

// Add this to the existing component's props
interface AICompanionProps {
  currentStep?: string
}

export function AICompanion({ currentStep }: AICompanionProps) {
  const { state, sendMessage, startModule, setInteractionMode } = useAICompanion()
  const { getTaskById } = useTasks()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"chat" | "learn" | "settings">("chat")
  const pathname = usePathname()

  // Detect if we're on a task page
  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("/")
      if (pathParts.length >= 5 && pathParts[1] === "dashboard" && pathParts[2] === "learning") {
        const category = pathParts[3]
        const taskId = pathParts[4]

        // If we have a task ID, provide contextual help
        if (taskId && state.conversationHistory.length <= 1) {
          const task = getTaskById(taskId)
          if (task) {
            const contextualMessage = `I see you're working on the "${task.name}" task. This task is about ${task.description.toLowerCase()}. I'm here to help you complete it successfully. Would you like some guidance on how to approach this task?`
            sendMessage(contextualMessage, true)
          }
        }
      }
    }
  }, [pathname, state.conversationHistory.length, sendMessage, getTaskById])

  // Add this near the top of the component
  useEffect(() => {
    if (currentStep && state.conversationHistory.length <= 1) {
      // Provide contextual guidance based on the current step
      const contextualMessages: Record<string, string> = {
        register:
          "I see you're creating an account! I'm here to help you get started with Small Economy Works. Feel free to ask me any questions about the registration process or our micro-grant program.",
        login:
          "Welcome back! I'm here to help you navigate the platform. Let me know if you need any assistance logging in.",
        profile:
          "Creating your profile helps us personalize your experience. The more we know about you and your project interests, the better we can support you!",
        community:
          "Tell us about your community! This helps us understand the context of your project and connect you with relevant resources.",
        interests:
          "Sharing your interests helps us recommend relevant learning paths and funding opportunities that align with your goals.",
      }

      if (contextualMessages[currentStep]) {
        // Use sendMessage instead of directly modifying state
        sendMessage(contextualMessages[currentStep], true)
      }
    }
  }, [currentStep, state.conversationHistory.length, sendMessage])

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [state.conversationHistory])

  const handleSendMessage = async () => {
    if (!input.trim() || state.isGenerating) return
    await sendMessage(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderMessageContent = (message: Message) => {
    // Split content by newlines and render paragraphs
    return message.content.split("\n").map((paragraph, i) => {
      if (paragraph.trim() === "") return <br key={i} />

      // Check if paragraph is a markdown table
      if (paragraph.includes("|")) {
        return (
          <div key={i} className="my-2 overflow-x-auto">
            {renderMarkdownTable(paragraph)}
          </div>
        )
      }

      // Check if paragraph starts with a markdown list item
      if (paragraph.trim().startsWith("- ") || paragraph.trim().startsWith("* ")) {
        return (
          <li key={i} className="ml-4">
            {paragraph.trim().substring(2)}
          </li>
        )
      }

      // Check if paragraph is a heading
      if (paragraph.startsWith("# ")) {
        return (
          <h1 key={i} className="text-xl font-bold my-2">
            {paragraph.substring(2)}
          </h1>
        )
      }

      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={i} className="text-lg font-bold my-2">
            {paragraph.substring(3)}
          </h2>
        )
      }

      if (paragraph.startsWith("### ")) {
        return (
          <h3 key={i} className="text-md font-bold my-2">
            {paragraph.substring(4)}
          </h3>
        )
      }

      // Handle bold text with **
      let content = paragraph
      content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

      if (content !== paragraph) {
        return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: content }} />
      }

      return (
        <p key={i} className="mb-2">
          {paragraph}
        </p>
      )
    })
  }

  const renderMarkdownTable = (tableText: string) => {
    const rows = tableText.split("\n").filter((row) => row.trim() !== "")
    if (rows.length < 2) return <p>{tableText}</p>

    const cells = rows.map((row) =>
      row
        .split("|")
        .filter((cell) => cell.trim() !== "")
        .map((cell) => cell.trim()),
    )

    return (
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            {cells[0].map((header, i) => (
              <th key={i} className="border border-gray-300 px-4 py-2 bg-gray-100 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cells.slice(2).map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border border-gray-300 px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const renderToneIndicator = (tone?: TonePreference) => {
    if (!tone || tone === "adaptive") return null

    const toneConfig = {
      coaching: { label: "Coaching", color: "bg-blue-100 text-blue-800" },
      cheerleading: { label: "Encouraging", color: "bg-green-100 text-green-800" },
      inquiry: { label: "Inquiring", color: "bg-purple-100 text-purple-800" },
      directive: { label: "Guiding", color: "bg-amber-100 text-amber-800" },
    }

    const config = toneConfig[tone]
    if (!config) return null

    return <span className={`text-xs px-2 py-0.5 rounded-full ${config.color}`}>{config.label}</span>
  }

  const learningModules = [
    {
      id: "assessment",
      name: "Personal Assessment",
      description: "Discover your entrepreneurial profile",
      icon: <Heart className="h-4 w-4" />,
      time: "10 min",
      color: "bg-gradient-to-r from-pink-400 to-red-500",
      shadow: "shadow-pink",
    },
    {
      id: "budgetingTutorial",
      name: "Basic Budgeting",
      description: "Learn to create a simple project budget",
      icon: <DollarSign className="h-4 w-4" />,
      time: "15 min",
      color: "bg-gradient-to-r from-amber-400 to-orange-500",
      shadow: "shadow-orange",
    },
    {
      id: "communityNeeds",
      name: "Community Needs",
      description: "Identify needs your project can address",
      icon: <Users className="h-4 w-4" />,
      time: "20 min",
      color: "bg-gradient-to-r from-blue-400 to-indigo-500",
      shadow: "shadow-blue",
    },
    {
      id: "projectVision",
      name: "Project Vision",
      description: "Define your project's purpose and goals",
      icon: <Lightbulb className="h-4 w-4" />,
      time: "15 min",
      color: "bg-gradient-to-r from-purple-400 to-indigo-500",
      shadow: "shadow-purple",
    },
  ]

  // Get task-specific help topics based on the current path
  const getTaskHelpTopics = () => {
    if (!pathname) return []

    const pathParts = pathname.split("/")
    if (pathParts.length >= 5 && pathParts[1] === "dashboard" && pathParts[2] === "learning") {
      const category = pathParts[3]
      const taskId = pathParts[4]
      const task = getTaskById(taskId)

      if (task) {
        const categoryTopics: Record<string, { question: string; icon: React.ReactNode }[]> = {
          personal: [
            {
              question: "How do I connect my personal values to my project?",
              icon: <Heart className="h-4 w-4 mr-2" />,
            },
            {
              question: "What makes a compelling personal why statement?",
              icon: <Heart className="h-4 w-4 mr-2" />,
            },
          ],
          community: [
            {
              question: "How do I identify the most important needs in my community?",
              icon: <Users className="h-4 w-4 mr-2" />,
            },
            {
              question: "How can I engage community members in my project?",
              icon: <Users className="h-4 w-4 mr-2" />,
            },
          ],
          project: [
            {
              question: "How do I create a realistic project timeline?",
              icon: <Lightbulb className="h-4 w-4 mr-2" />,
            },
            {
              question: "What should I include in my project plan?",
              icon: <Lightbulb className="h-4 w-4 mr-2" />,
            },
          ],
          cultural: [
            {
              question: "How can I incorporate cultural knowledge respectfully?",
              icon: <MapPin className="h-4 w-4 mr-2" />,
            },
            {
              question: "What are some ways to honor traditional practices in my project?",
              icon: <MapPin className="h-4 w-4 mr-2" />,
            },
          ],
          business: [
            {
              question: "How do I estimate costs for my project?",
              icon: <Briefcase className="h-4 w-4 mr-2" />,
            },
            {
              question: "What business model would work best for my project?",
              icon: <Briefcase className="h-4 w-4 mr-2" />,
            },
          ],
        }

        return categoryTopics[category] || []
      }
    }

    return []
  }

  const taskHelpTopics = getTaskHelpTopics()

  // Get the avatar image path
  const getAvatarImagePath = () => {
    return `/avatars/${state.avatar}.svg`
  }

  // Get avatar-specific gradient
  const getAvatarGradient = () => {
    const gradients = {
      fireweed: "bg-gradient-to-r from-pink-400 to-red-500",
      "labrador-tea": "bg-gradient-to-r from-teal-400 to-green-500",
      yarrow: "bg-gradient-to-r from-amber-400 to-orange-500",
      "dwarf-birch": "bg-gradient-to-r from-blue-400 to-indigo-500",
      "arctic-willow": "bg-gradient-to-r from-purple-400 to-indigo-500",
    }
    return gradients[state.avatar] || "bg-gradient-blue-purple"
  }

  // Get avatar-specific shadow
  const getAvatarShadow = () => {
    const shadows = {
      fireweed: "shadow-pink",
      "labrador-tea": "shadow-green",
      yarrow: "shadow-orange",
      "dwarf-birch": "shadow-blue",
      "arctic-willow": "shadow-purple",
    }
    return shadows[state.avatar] || "shadow-blue"
  }

  return (
    <Card className="flex flex-col h-full border-none shadow-lg bg-white/90 backdrop-blur-md">
      <CardHeader className="pb-2 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <AvatarSelector />
          {state.currentUser?.assessmentComplete && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-gradient-to-r from-green-50 to-teal-50 border-green-200 text-green-700"
            >
              <DollarSign className="h-3 w-3" />
              <span>Potential Funding: $1,000</span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mx-4 p-1 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-lg">
          <TabsTrigger
            value="chat"
            className={cn(
              "flex items-center gap-1 rounded-md",
              activeTab === "chat" ? "bg-white shadow-md" : "hover:bg-white/50",
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </TabsTrigger>
          <TabsTrigger
            value="learn"
            className={cn(
              "flex items-center gap-1 rounded-md",
              activeTab === "learn" ? "bg-white shadow-md" : "hover:bg-white/50",
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span>Learn</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className={cn(
              "flex items-center gap-1 rounded-md",
              activeTab === "settings" ? "bg-white shadow-md" : "hover:bg-white/50",
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {state.conversationHistory.map((message, index) => (
              <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.role === "user"
                      ? `${getAvatarGradient()} text-white ${getAvatarShadow()}`
                      : message.role === "system"
                        ? "bg-muted/50 text-muted-foreground text-xs italic"
                        : "bg-white border shadow-sm",
                  )}
                >
                  {message.role === "assistant" && message.metadata?.tone && (
                    <div className="flex justify-end mb-1">{renderToneIndicator(message.metadata.tone)}</div>
                  )}
                  <div className="whitespace-pre-line text-sm">{renderMessageContent(message)}</div>
                  <div className="text-xs opacity-70 mt-1 text-right">{formatTimestamp(message.timestamp)}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Task-specific help topics */}
          {taskHelpTopics.length > 0 && (
            <div className="px-4 mb-2">
              <div className="text-xs text-muted-foreground mb-2">Task-specific help:</div>
              <div className="flex flex-wrap gap-2">
                {taskHelpTopics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    onClick={() => {
                      sendMessage(topic.question)
                    }}
                  >
                    {topic.icon}
                    {topic.question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <CardFooter className="border-t p-4 gap-2 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex flex-col w-full gap-2">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="min-h-[60px] flex-1 resize-none border-blue-200 focus-visible:ring-blue-500"
                  onKeyDown={handleKeyDown}
                  disabled={state.isGenerating}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={state.isGenerating || !input.trim()}
                  className={`self-end ${getAvatarGradient()} hover:opacity-90 ${getAvatarShadow()}`}
                >
                  {state.isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              {state.isGenerating && (
                <div className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <Sparkles className="h-3 w-3 text-blue-500 animate-pulse" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>
          </CardFooter>
        </TabsContent>

        <TabsContent value="learn" className="flex-1 overflow-hidden flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <h3 className="font-medium text-lg mb-2 bg-clip-text text-transparent bg-gradient-blue-purple">
                Learning Modules
              </h3>
              <p className="text-sm text-muted-foreground">
                Interactive lessons to build your skills and unlock funding
              </p>
            </div>

            <div className="space-y-3">
              {learningModules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between rounded-md border p-3 hover:bg-blue-50/50 transition-colors cursor-pointer card-hover-effect"
                  onClick={() => {
                    startModule(module.id)
                    setActiveTab("chat")
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full ${module.color} flex items-center justify-center text-white ${module.shadow}`}
                    >
                      {module.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{module.name}</p>
                      <p className="text-xs text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {module.time}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${module.color} text-white rounded-full ${module.shadow}`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 overflow-hidden flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <h3 className="font-medium text-lg mb-2 bg-clip-text text-transparent bg-gradient-purple-pink">
                AI Companion Settings
              </h3>
              <p className="text-sm text-muted-foreground">Customize how your AI companion interacts with you</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Communication Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "coaching", color: "bg-gradient-to-r from-blue-400 to-indigo-500", shadow: "shadow-blue" },
                    {
                      value: "cheerleading",
                      color: "bg-gradient-to-r from-green-400 to-teal-500",
                      shadow: "shadow-green",
                    },
                    {
                      value: "inquiry",
                      color: "bg-gradient-to-r from-purple-400 to-indigo-500",
                      shadow: "shadow-purple",
                    },
                    {
                      value: "directive",
                      color: "bg-gradient-to-r from-amber-400 to-orange-500",
                      shadow: "shadow-orange",
                    },
                    { value: "adaptive", color: "bg-gradient-to-r from-pink-400 to-red-500", shadow: "shadow-pink" },
                  ].map((tone) => (
                    <Button
                      key={tone.value}
                      variant={state.currentUser?.tonePreference === tone.value ? "default" : "outline"}
                      className={cn(
                        "justify-start capitalize",
                        state.currentUser?.tonePreference === tone.value
                          ? `${tone.color} text-white ${tone.shadow}`
                          : "hover:bg-blue-50 border-blue-200",
                      )}
                      onClick={() => {
                        if (state.currentUser) {
                          // In a real app, this would update the user profile
                          console.log(`Setting tone preference to ${tone.value}`)
                        }
                      }}
                    >
                      <span>{tone.value}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Help Topics</label>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    onClick={() => {
                      sendMessage("How does the micro-grant funding work?")
                      setActiveTab("chat")
                    }}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    How does funding work?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    onClick={() => {
                      sendMessage("What kinds of projects qualify for funding?")
                      setActiveTab("chat")
                    }}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    What projects qualify?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                    onClick={() => {
                      sendMessage("How can I get help from a human mentor?")
                      setActiveTab("chat")
                    }}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Connect with a human mentor
                  </Button>
                </div>
              </div>

              <div className="rounded-md border border-purple-200 p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-purple">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-purple-700">Need more help?</h4>
                    <p className="text-sm text-purple-600">
                      If you need assistance from a human team member, you can request help at any time.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-purple-200 bg-white text-purple-700 hover:bg-purple-50"
                    >
                      Request Human Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
