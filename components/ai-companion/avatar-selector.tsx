"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAICompanion } from "./ai-companion-context"
import { Sparkles } from "lucide-react"

export type AvatarType = "fireweed" | "labrador-tea" | "yarrow" | "dwarf-birch" | "arctic-willow"

interface AvatarInfo {
  id: AvatarType
  name: string
  description: string
  tone: string
  bestFor: string
  imagePath: string
  gradient: string
  shadow: string
}

// Update the avatar information with more relatable descriptions and add gradients
const avatars: AvatarInfo[] = [
  {
    id: "fireweed",
    name: "Fireweed",
    description: "The Guide of Renewal",
    tone: "Energetic & motivating",
    bestFor: "Getting started or bouncing back after setbacks",
    imagePath: "/avatars/fireweed.png",
    gradient: "bg-gradient-to-r from-pink-400 to-red-500",
    shadow: "shadow-pink",
  },
  {
    id: "labrador-tea",
    name: "Labrador Tea",
    description: "The Guide of Reflection",
    tone: "Chill & thoughtful",
    bestFor: "Thinking things through & sorting out feelings",
    imagePath: "/avatars/labrador-tea.png",
    gradient: "bg-gradient-to-r from-teal-400 to-green-500",
    shadow: "shadow-green",
  },
  {
    id: "yarrow",
    name: "Yarrow",
    description: "The Guide of Structure",
    tone: "Organized & practical",
    bestFor: "Planning, budgeting & keeping on track",
    imagePath: "/avatars/yarrow.png",
    gradient: "bg-gradient-to-r from-amber-400 to-orange-500",
    shadow: "shadow-orange",
  },
  {
    id: "dwarf-birch",
    name: "Dwarf Birch",
    description: "The Guide of Connection",
    tone: "Friendly & curious",
    bestFor: "Working with others & building your network",
    imagePath: "/avatars/dwarf-birch.png",
    gradient: "bg-gradient-to-r from-blue-400 to-indigo-500",
    shadow: "shadow-blue",
  },
  {
    id: "arctic-willow",
    name: "Arctic Willow",
    description: "The Guide of Resilience",
    tone: "Patient & supportive",
    bestFor: "Sticking with it when things get tough",
    imagePath: "/avatars/arctic-willow.png",
    gradient: "bg-gradient-to-r from-purple-400 to-indigo-500",
    shadow: "shadow-purple",
  },
]

export function AvatarSelector() {
  const { state, setAvatar } = useAICompanion()
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>(state.avatar || "fireweed")
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    setAvatar(selectedAvatar)
    setIsOpen(false)
  }

  const currentAvatar = avatars.find((avatar) => avatar.id === state.avatar) || avatars[0]

  // Then update the dialog content to be more youth-friendly
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full overflow-hidden border ${currentAvatar.shadow}`}>
          <Image
            src={currentAvatar.imagePath || "/placeholder.svg"}
            alt={currentAvatar.name}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium">{currentAvatar.name}</p>
          <p className="text-xs text-muted-foreground">{currentAvatar.description}</p>
        </div>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className={`ml-auto border-blue-200 hover:bg-blue-50 text-blue-700`}>
            <Sparkles className="h-3 w-3 mr-1 text-blue-500" />
            Change Guide
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-purple-50 -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-lg border-b">
          <DialogTitle className="text-xl bg-clip-text text-transparent bg-gradient-blue-purple">
            Pick Your Guide
          </DialogTitle>
          <DialogDescription>
            Each guide has their own style and strengths. Choose the one that feels right for you!
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={selectedAvatar} onValueChange={(value) => setSelectedAvatar(value as AvatarType)}>
            <div className="grid gap-4">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    selectedAvatar === avatar.id
                      ? `border-2 ${avatar.gradient.replace("bg-", "border-")} bg-gradient-to-r from-${avatar.id === "fireweed" ? "pink" : avatar.id === "labrador-tea" ? "green" : avatar.id === "yarrow" ? "amber" : avatar.id === "dwarf-birch" ? "blue" : "purple"}-50 to-white ${avatar.shadow}`
                      : "hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem
                    value={avatar.id}
                    id={avatar.id}
                    className={selectedAvatar === avatar.id ? avatar.gradient : ""}
                  />
                  <Label htmlFor={avatar.id} className="flex items-center gap-3 cursor-pointer w-full">
                    <div
                      className={`h-12 w-12 rounded-full overflow-hidden border ${avatar.gradient} flex items-center justify-center ${avatar.shadow}`}
                    >
                      <Image
                        src={avatar.imagePath || "/placeholder.svg"}
                        alt={avatar.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {avatar.name} - {avatar.description}
                      </p>
                      <p className="text-sm text-muted-foreground">Vibe: {avatar.tone}</p>
                      <p className="text-sm text-muted-foreground">Great when you need: {avatar.bestFor}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="bg-gradient-to-r from-blue-50 to-purple-50 -mx-6 -mb-6 px-6 pb-6 pt-4 rounded-b-lg border-t">
          <Button
            onClick={handleSave}
            className={`${avatars.find((a) => a.id === selectedAvatar)?.gradient} hover:opacity-90 ${avatars.find((a) => a.id === selectedAvatar)?.shadow}`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Choose This Guide
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
