import { type NextRequest, NextResponse } from "next/server"
import sharp from "sharp"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from "fs"

// Configuration
const STORAGE_PATH = process.env.IMAGE_STORAGE_PATH || "public/uploads"
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_FORMATS = ["jpeg", "jpg", "png", "webp", "avif"]

// Ensure storage directory exists
try {
  if (!fs.existsSync(STORAGE_PATH)) {
    fs.mkdirSync(STORAGE_PATH, { recursive: true })
  }
} catch (error) {
  console.error("Failed to create storage directory:", error)
}

// Compression presets
const compressionPresets = {
  thumbnail: {
    width: 200,
    height: 200,
    fit: "cover" as const,
    withoutEnlargement: true,
    quality: 80,
  },
  small: {
    width: 640,
    height: null as number | null,
    fit: "inside" as const,
    withoutEnlargement: true,
    quality: 80,
  },
  medium: {
    width: 1200,
    height: null as number | null,
    fit: "inside" as const,
    withoutEnlargement: true,
    quality: 80,
  },
  large: {
    width: 1920,
    height: null as number | null,
    fit: "inside" as const,
    withoutEnlargement: true,
    quality: 80,
  },
  avatar: {
    width: 150,
    height: 150,
    fit: "cover" as const,
    withoutEnlargement: true,
    quality: 90,
  },
  hero: {
    width: 2048,
    height: null as number | null,
    fit: "inside" as const,
    withoutEnlargement: true,
    quality: 85,
  },
  custom: {
    // Will be overridden by request parameters
    width: null as number | null,
    height: null as number | null,
    fit: "inside" as const,
    withoutEnlargement: true,
    quality: 80,
  },
}

export async function POST(request: NextRequest) {
  try {
    // Check if the request is multipart/form-data
    const contentType = request.headers.get("content-type") || ""
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Request must be multipart/form-data" }, { status: 400 })
    }

    // Parse the form data
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const presetName = (formData.get("preset") as string) || "medium"
    const outputFormat = (formData.get("format") as string) || "webp"
    const customWidth = formData.get("width") ? Number(formData.get("width")) : null
    const customHeight = formData.get("height") ? Number(formData.get("height")) : null
    const customQuality = formData.get("quality") ? Number(formData.get("quality")) : null

    // Validate file
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 },
      )
    }

    // Get file extension and validate format
    const originalFilename = file.name
    const fileExtension = path.extname(originalFilename).toLowerCase().substring(1)

    if (!ALLOWED_FORMATS.includes(fileExtension) && !ALLOWED_FORMATS.includes(outputFormat)) {
      return NextResponse.json(
        { error: `Unsupported file format. Allowed formats: ${ALLOWED_FORMATS.join(", ")}` },
        { status: 400 },
      )
    }

    // Get compression preset
    let preset = compressionPresets[presetName as keyof typeof compressionPresets] || compressionPresets.medium

    // Apply custom parameters if provided
    if (presetName === "custom" || customWidth || customHeight || customQuality) {
      preset = {
        ...preset,
        width: customWidth || preset.width,
        height: customHeight || preset.height,
        quality: customQuality || preset.quality,
      }
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Process image with sharp
    let sharpInstance = sharp(buffer)

    // Resize based on preset
    if (preset.width || preset.height) {
      sharpInstance = sharpInstance.resize({
        width: preset.width || undefined,
        height: preset.height || undefined,
        fit: preset.fit,
        withoutEnlargement: preset.withoutEnlargement,
      })
    }

    // Convert to output format
    switch (outputFormat) {
      case "jpeg":
      case "jpg":
        sharpInstance = sharpInstance.jpeg({ quality: preset.quality })
        break
      case "png":
        sharpInstance = sharpInstance.png({ quality: preset.quality })
        break
      case "webp":
        sharpInstance = sharpInstance.webp({ quality: preset.quality })
        break
      case "avif":
        sharpInstance = sharpInstance.avif({ quality: preset.quality })
        break
      default:
        sharpInstance = sharpInstance.webp({ quality: preset.quality })
    }

    // Process the image
    const processedImageBuffer = await sharpInstance.toBuffer()

    // Generate unique filename
    const uniqueId = uuidv4()
    const filename = `${uniqueId}.${outputFormat}`
    const filePath = path.join(STORAGE_PATH, filename)

    // Save the file
    fs.writeFileSync(filePath, processedImageBuffer)

    // Get metadata
    const metadata = await sharp(processedImageBuffer).metadata()

    // Calculate compression ratio
    const originalSize = buffer.length
    const compressedSize = processedImageBuffer.length
    const compressionRatio = originalSize > 0 ? (1 - compressedSize / originalSize) * 100 : 0

    // Construct the public URL
    const publicUrl = `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      file: {
        url: publicUrl,
        filename,
        originalName: originalFilename,
        size: compressedSize,
        originalSize,
        compressionRatio: compressionRatio.toFixed(2) + "%",
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
      },
    })
  } catch (error) {
    console.error("Image compression error:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
