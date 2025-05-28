"use client"

import type React from "react"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface ShareIdeaDialogProps {
  children: React.ReactNode
}

export function ShareIdeaDialog({ children }: ShareIdeaDialogProps) {
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [supportTypes, setSupportTypes] = useState<string[]>([])

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const toggleSupportType = (value: string) => {
    setSupportTypes(
      supportTypes.includes(value) ? supportTypes.filter((type) => type !== value) : [...supportTypes, value],
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share a New Idea</DialogTitle>
          <DialogDescription>
            Share your climate adaptation idea, no matter how early-stage. The community can help it grow!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Idea Title</Label>
            <Input id="title" placeholder="Give your idea a clear, descriptive title" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe your idea (280 characters max)"
              className="resize-none"
              maxLength={280}
            />
            <p className="text-xs text-muted-foreground text-right">0/280</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="problem">What problem does this address?</Label>
            <Textarea
              id="problem"
              placeholder="Describe the climate adaptation challenge your idea addresses"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <Label>What kind of support or feedback would help?</Label>
            <div className="grid grid-cols-2 gap-2">
              {["Brainstorming", "Research", "Collaboration", "Funding guidance", "Technical expertise"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`support-${type}`}
                    checked={supportTypes.includes(type)}
                    onCheckedChange={() => toggleSupportType(type)}
                  />
                  <Label htmlFor={`support-${type}`} className="text-sm font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <Label htmlFor="other-support" className="text-sm">
                Other (please specify)
              </Label>
              <Input id="other-support" placeholder="Other support needed" className="mt-1" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stage">Stage of Idea</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select the current stage of your idea" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hunch">Just a hunch</SelectItem>
                <SelectItem value="exploring">Exploring the problem</SelectItem>
                <SelectItem value="gathering">Gathering input</SelectItem>
                <SelectItem value="collaborators">Looking for collaborators</SelectItem>
                <SelectItem value="ready">Ready to turn into a project</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select the region this idea applies to" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bc">British Columbia</SelectItem>
                <SelectItem value="prairies">Prairie Provinces</SelectItem>
                <SelectItem value="ontario">Ontario</SelectItem>
                <SelectItem value="quebec">Quebec</SelectItem>
                <SelectItem value="atlantic">Atlantic Canada</SelectItem>
                <SelectItem value="north">Northern Territories</SelectItem>
                <SelectItem value="national">National</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                </Badge>
              ))}
            </div>
            <Input
              id="tags"
              placeholder="Add tags and press Enter (e.g., urban, nature-based, coastal)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="challenges">Open Questions or Challenges (optional)</Label>
            <Textarea
              id="challenges"
              placeholder="What specific questions or challenges are you facing with this idea?"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Upload image or sketch (optional)</Label>
            <Input id="image" type="file" accept="image/*" />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="consent" />
            <Label htmlFor="consent" className="text-sm">
              I'm open to receiving community feedback on this idea
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => setOpen(false)}>
            Plant My Idea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
