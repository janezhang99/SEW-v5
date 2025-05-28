"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string
  alt: string
  fallbackSrc?: string
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "custom"
  customAspectRatio?: string
  className?: string
  containerClassName?: string
  blurDataURL?: string
  enableBlurPlaceholder?: boolean
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/abstract-colorful-swirls.png",
  aspectRatio = "auto",
  customAspectRatio,
  className,
  containerClassName,
  blurDataURL,
  enableBlurPlaceholder = true,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src)
    setIsLoading(true)
    setError(false)
  }, [src])

  // Determine aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "portrait":
        return "aspect-[3/4]"
      case "custom":
        return ""
      default:
        return "aspect-auto"
    }
  }

  // Generate a placeholder blur data URL if not provided
  const generatePlaceholderDataURL = () => {
    if (blurDataURL) return blurDataURL

    // Simple SVG-based blur placeholder
    const svg = `
      <svg width="400" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#CCCCCC"/>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="system-ui" fontSize="18" fill="#666666">Loading...</text>
      </svg>
    `
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        getAspectRatioClass(),
        customAspectRatio && aspectRatio === "custom" ? customAspectRatio : "",
        containerClassName,
      )}
      style={aspectRatio === "custom" && customAspectRatio ? { aspectRatio: customAspectRatio } : {}}
    >
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        fill
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        placeholder={enableBlurPlaceholder ? "blur" : "empty"}
        blurDataURL={enableBlurPlaceholder ? generatePlaceholderDataURL() : undefined}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setImgSrc(fallbackSrc)
        }}
        {...props}
      />

      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
