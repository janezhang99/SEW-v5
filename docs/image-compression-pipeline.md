# Image Compression Pipeline

This document provides an overview of the server-side image compression pipeline implemented in the CanAdapt platform.

## Overview

The image compression pipeline is designed to optimize images for web delivery, reducing file sizes while maintaining visual quality. This improves page load times, reduces bandwidth usage, and enhances the overall user experience.

## Features

- **Server-side processing**: Images are processed on the server using Sharp.js, a high-performance image processing library
- **Multiple compression presets**: Pre-configured settings for different use cases (thumbnails, avatars, hero images, etc.)
- **Format conversion**: Convert images to modern formats like WebP and AVIF for better compression
- **Responsive image generation**: Create appropriately sized images for different devices
- **Metadata stripping**: Remove unnecessary metadata to further reduce file size
- **Client-side integration**: Easy-to-use React hooks and components for uploading and compressing images

## API Endpoint

The compression pipeline is exposed through the `/api/images/compress` endpoint, which accepts `multipart/form-data` requests with the following parameters:

- `file`: The image file to compress (required)
- `preset`: The compression preset to use (default: "medium")
- `format`: The output format (default: "webp")
- `width`: Custom width (optional)
- `height`: Custom height (optional)
- `quality`: Custom quality setting (optional)

## Compression Presets

The following presets are available:

- **thumbnail**: 200×200px, cover fit, 80% quality
- **small**: 640px width, inside fit, 80% quality
- **medium**: 1200px width, inside fit, 80% quality
- **large**: 1920px width, inside fit, 80% quality
- **avatar**: 150×150px, cover fit, 90% quality
- **hero**: 2048px width, inside fit, 85% quality
- **custom**: Custom dimensions and quality

## Client-Side Usage

### Using the ImageUpload Component

\`\`\`tsx
import { ImageUpload } from "@/components/ui/image-upload"

export default function MyPage() {
  const handleImageUploaded = (imageUrl: string) => {
    console.log("Image uploaded:", imageUrl)
  }
  
  return (
    <ImageUpload
      onImageUploaded={handleImageUploaded}
      preset="medium"
      format="webp"
      maxSizeMB={5}
      buttonText="Upload Image"
      showPreview={true}
    />
  )
}
\`\`\`

### Using the useImageCompression Hook

\`\`\`tsx
import { useImageCompression } from "@/hooks/use-image-compression"

export default function MyComponent() {
  const {
    compress,
    isCompressing,
    error,
    compressedImage,
    progress,
    reset
  } = useImageCompression({
    preset: "medium",
    format: "webp",
    onSuccess: (result) => {
      console.log("Compression successful:", result)
    },
    onError: (error) => {
      console.error("Compression failed:", error)
    }
  })
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await compress(file)
    }
  }
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {isCompressing && <p>Compressing... {progress.toFixed(0)}%</p>}
      {error && <p>Error: {error.message}</p>}
      {compressedImage && (
        <div>
          <img src={compressedImage.url || "/placeholder.svg"} alt="Compressed" />
          <p>Size: {(compressedImage.size / 1024).toFixed(2)}KB</p>
          <p>Reduction: {compressedImage.compressionRatio}</p>
        </div>
      )}
    </div>
  )
}
\`\`\`

## Best Practices

1. **Choose the right preset**: Select the appropriate preset based on the image's purpose and placement
2. **Use WebP or AVIF**: These modern formats provide the best compression-to-quality ratio
3. **Don't upscale images**: Set `withoutEnlargement: true` to prevent quality loss from upscaling
4. **Adjust quality based on content**: Use higher quality for detailed images, lower for simpler ones
5. **Consider art direction**: For important images, create multiple versions for different viewports

## Implementation Details

The compression pipeline uses Sharp.js for image processing, which is built on libvips, a high-performance image processing library. The pipeline is implemented as a Next.js API route using the App Router.

Images are stored in the `public/uploads` directory by default, but this can be configured using the `IMAGE_STORAGE_PATH` environment variable.
\`\`\`

Let's create a Progress component for the image upload:
