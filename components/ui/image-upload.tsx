"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useImageCompression } from "@/hooks/use-image-compression"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { Loader2, Upload, X } from "lucide-react"
import type { CompressionPreset } from "@/lib/image-compression"

interface ImageUploadProps {
  onImageUploaded?: (imageUrl: string) => void
  preset?: CompressionPreset
  format?: "webp" | "jpeg" | "png" | "avif"
  maxSizeMB?: number
  className?: string
  buttonText?: string
  showPreview?: boolean
}

export function ImageUpload({
  onImageUploaded,
  preset = "medium",
  format = "webp",
  maxSizeMB = 5,
  className = "",
  buttonText = "Upload Image",
  showPreview = true,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const { compress, isCompressing, error, compressedImage, progress, reset } = useImageCompression({
    preset,
    format,
    onSuccess: (result) => {
      if (onImageUploaded) {
        onImageUploaded(result.file.url)
      }
    },
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Check file size
    if (file.size > maxSizeBytes) {
      alert(`File size exceeds the maximum limit of ${maxSizeMB}MB`)
      return
    }

    setSelectedFile(file)

    try {
      await compress(file)
    } catch (err) {
      console.error("Compression failed:", err)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleReset = () => {
    reset()
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
      />

      {!compressedImage && (
        <Button type="button" onClick={triggerFileInput} disabled={isCompressing} className="flex items-center gap-2">
          {isCompressing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {buttonText}
        </Button>
      )}

      {selectedFile && !compressedImage && (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">Processing: {selectedFile.name}</p>
          <Progress value={progress} className="h-2 mt-1" />
        </div>
      )}

      {error && <div className="mt-2 text-sm text-destructive">Error: {error.message}</div>}

      {compressedImage && (
        <div className="mt-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Image Compressed Successfully</p>
              <p className="text-sm text-muted-foreground">
                Reduced from {(compressedImage.originalSize / 1024).toFixed(2)}KB to{" "}
                {(compressedImage.size / 1024).toFixed(2)}KB ({compressedImage.compressionRatio} smaller)
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <X className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>

          {showPreview && (
            <div className="mt-4 border rounded-md overflow-hidden">
              <OptimizedImage
                src={compressedImage.url}
                alt="Compressed image preview"
                width={300}
                height={200}
                className="w-full h-auto"
                aspectRatio="auto"
              />
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>
              Dimensions: {compressedImage.width} × {compressedImage.height}
            </p>
            <p>Format: {compressedImage.format}</p>
          </div>
        </div>
      )}
    </div>
  )
}
