/**
 * Utility functions for image compression
 */

// Compression presets
export const compressionPresets = {
  thumbnail: {
    width: 200,
    height: 200,
    fit: "cover",
    quality: 80,
    format: "webp",
  },
  small: {
    width: 640,
    height: null,
    fit: "inside",
    quality: 80,
    format: "webp",
  },
  medium: {
    width: 1200,
    height: null,
    fit: "inside",
    quality: 80,
    format: "webp",
  },
  large: {
    width: 1920,
    height: null,
    fit: "inside",
    quality: 80,
    format: "webp",
  },
  avatar: {
    width: 150,
    height: 150,
    fit: "cover",
    quality: 90,
    format: "webp",
  },
  hero: {
    width: 2048,
    height: null,
    fit: "inside",
    quality: 85,
    format: "webp",
  },
}

export type CompressionPreset = keyof typeof compressionPresets

/**
 * Compresses an image using the server-side compression API
 */
export async function compressImage(
  file: File,
  options: {
    preset?: CompressionPreset
    format?: "webp" | "jpeg" | "png" | "avif"
    width?: number
    height?: number
    quality?: number
  } = {},
) {
  const { preset = "medium", format = "webp", width, height, quality } = options

  const formData = new FormData()
  formData.append("file", file)
  formData.append("preset", preset)
  formData.append("format", format)

  if (width) formData.append("width", width.toString())
  if (height) formData.append("height", height.toString())
  if (quality) formData.append("quality", quality.toString())

  const response = await fetch("/api/images/compress", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to compress image")
  }

  return response.json()
}

/**
 * Estimates the file size after compression based on dimensions and format
 */
export function estimateCompressedSize(
  width: number,
  height: number,
  format: "webp" | "jpeg" | "png" | "avif" = "webp",
  quality = 80,
): number {
  // These are rough estimates based on typical compression ratios
  const bytesPerPixel: Record<string, number> = {
    webp: 0.5,
    jpeg: 0.7,
    png: 1.5,
    avif: 0.3,
  }

  // Quality factor (higher quality = larger file)
  const qualityFactor = quality / 80

  // Calculate estimated size in bytes
  const pixels = width * height
  const estimatedBytes = pixels * bytesPerPixel[format] * qualityFactor

  return Math.round(estimatedBytes)
}

/**
 * Determines the optimal compression settings based on image content and usage
 */
export function getOptimalCompressionSettings(
  imageType: "photo" | "illustration" | "text" | "screenshot" | "avatar",
  usage: "web" | "print" | "thumbnail" | "social",
): {
  format: "webp" | "jpeg" | "png" | "avif"
  quality: number
  preset: CompressionPreset
} {
  // Default to webp with medium quality
  let format: "webp" | "jpeg" | "png" | "avif" = "webp"
  let quality = 80
  let preset: CompressionPreset = "medium"

  // Adjust based on image type
  switch (imageType) {
    case "photo":
      format = "webp"
      quality = usage === "print" ? 90 : 80
      break
    case "illustration":
      format = "webp"
      quality = 85
      break
    case "text":
      format = "png"
      quality = 90
      break
    case "screenshot":
      format = "webp"
      quality = 85
      break
    case "avatar":
      format = "webp"
      quality = 85
      preset = "avatar"
      break
  }

  // Adjust based on usage
  switch (usage) {
    case "web":
      // Default settings are fine
      break
    case "print":
      quality = Math.min(quality + 10, 100)
      break
    case "thumbnail":
      preset = "thumbnail"
      quality = Math.max(quality - 5, 60)
      break
    case "social":
      preset = "medium"
      break
  }

  return { format, quality, preset }
}
