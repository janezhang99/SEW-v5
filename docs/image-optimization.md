# Image Optimization Best Practices

This document outlines the best practices for image optimization in the CanAdapt platform.

## Using the OptimizedImage Component

The `OptimizedImage` component is a wrapper around Next.js's `Image` component that provides additional features:

\`\`\`tsx
import { OptimizedImage } from "@/components/ui/optimized-image"

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description of the image"
  aspectRatio="video"
  fallbackSrc="/fallback-image.jpg"
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={false}
/>
\`\`\`

### Key Features

- **Automatic fallback handling**: If an image fails to load, it will automatically use the fallback image
- **Aspect ratio presets**: Use predefined aspect ratios like "square", "video", "portrait", or "custom"
- **Loading indicators**: Shows a loading spinner while the image is loading
- **Blur placeholders**: Generates blur placeholders for a smoother loading experience
- **Responsive sizing**: Automatically sets appropriate sizes for different viewports

## Image Utility Functions

The `lib/image-utils.ts` file provides several utility functions:

- `getPlaceholderImage(width, height, query)`: Generates a placeholder image URL
- `getResponsiveImageSize(viewportWidth, options)`: Determines the appropriate image size based on viewport
- `getImageSizes(config)`: Generates a sizes attribute for the Image component
- `isValidImageUrl(url)`: Checks if an image URL is valid
- `extractImageDimensions(url)`: Extracts image dimensions from a URL if available

## Best Practices

1. **Use the OptimizedImage component** for all images in the platform
2. **Set appropriate aspect ratios** to prevent layout shifts
3. **Provide meaningful alt text** for accessibility
4. **Use the priority attribute** for above-the-fold images
5. **Set appropriate sizes** for responsive images
6. **Use WebP or AVIF formats** when possible for better compression
7. **Optimize image dimensions** to match their display size
8. **Use blur placeholders** for a smoother loading experience

## Example Usage

### Card with Image

\`\`\`tsx
<Card>
  <OptimizedImage
    src={item.image || getPlaceholderImage(400, 300, item.title)}
    alt={item.title}
    aspectRatio="video"
    priority={index === 0}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
  <CardContent>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </CardContent>
</Card>
\`\`\`

### Hero Image

\`\`\`tsx
<div className="relative h-[50vh]">
  <OptimizedImage
    src="/hero-image.jpg"
    alt="Hero image"
    priority={true}
    className="object-cover"
    sizes="100vw"
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-4xl font-bold text-white">Welcome to CanAdapt</h1>
  </div>
</div>
\`\`\`

## Performance Considerations

- Use the `priority` attribute for critical above-the-fold images
- Lazy load below-the-fold images (default behavior)
- Set appropriate `sizes` to ensure correct image dimensions are loaded
- Consider using a CDN for image hosting and delivery
- Use WebP or AVIF formats for better compression
- Optimize image dimensions to match their display size
\`\`\`

Let's create a Next.js config file to enable image optimization:
