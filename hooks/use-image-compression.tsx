"use client"

import { useState } from "react"
import { compressImage, type CompressionPreset } from "@/lib/image-compression"

interface UseImageCompressionOptions {
  preset?: CompressionPreset
  format?: "webp" | "jpeg" | "png" | "avif"
  width?: number
  height?: number
  quality?: number
  onSuccess?: (result: any) => void
  onError?: (error: Error) => void
}

interface CompressedImage {
  url: string
  filename: string
  originalName: string
  size: number
  originalSize: number
  compressionRatio: string
  width: number
  height: number
  format: string
}

export function useImageCompression(options: UseImageCompressionOptions = {}) {
  const [isCompressing, setIsCompressing] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [compressedImage, setCompressedImage] = useState<CompressedImage | null>(null)
  const [progress, setProgress] = useState(0)

  const compress = async (file: File) => {
    try {
      setIsCompressing(true)
      setError(null)
      setProgress(10)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          return newProgress > 90 ? 90 : newProgress
        })
      }, 200)

      const result = await compressImage(file, options)

      clearInterval(progressInterval)
      setProgress(100)
      setCompressedImage(result.file)

      if (options.onSuccess) {
        options.onSuccess(result)
      }

      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to compress image")
      setError(error)

      if (options.onError) {
        options.onError(error)
      }

      throw error
    } finally {
      setIsCompressing(false)
    }
  }

  const reset = () => {
    setCompressedImage(null)
    setError(null)
    setProgress(0)
  }

  return {
    compress,
    reset,
    isCompressing,
    error,
    compressedImage,
    progress,
  }
}
