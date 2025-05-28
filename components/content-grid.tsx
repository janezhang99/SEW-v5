"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Grid, List, Plus } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { Badge } from "@/components/ui/badge"

interface ContentItem {
  title: string
  description: string
  image: string
  link: string
  tags?: string[]
}

interface ContentGridProps {
  children?: React.ReactNode
  className?: string
  itemCount?: number
  showViewToggle?: boolean
  showAddButton?: boolean
  addButtonLabel?: string
  onAddClick?: () => void
  items?: ContentItem[]
}

export function ContentGrid({
  children,
  className,
  itemCount,
  showViewToggle = true,
  showAddButton = false,
  addButtonLabel = "Add",
  onAddClick,
  items,
}: ContentGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Use itemCount if provided, otherwise use items.length if items exists
  const count = itemCount !== undefined ? itemCount : items?.length || 0

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {count} {count === 1 ? "item" : "items"} found
        </div>
        <div className="flex items-center gap-2">
          {showAddButton && (
            <Button size="sm" onClick={onAddClick}>
              <Plus className="h-4 w-4 mr-2" />
              {addButtonLabel}
            </Button>
          )}
          {showViewToggle && (
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none h-8 px-2"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none h-8 px-2"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* If items prop is provided, render items */}
      {items && items.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <Link href={item.link} key={index} className="group">
                <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-video relative">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      aspectRatio="video"
                      priority={false}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <Link href={item.link} key={index} className="group">
                <div className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
                  <div className="flex">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <OptimizedImage src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        // If no items prop, use children as before
        <div className={cn(viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4")}>
          {children}
        </div>
      )}
    </div>
  )
}
