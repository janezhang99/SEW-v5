/**
 * Utility functions for image optimization
 */

/**
 * Generates a placeholder image URL with the specified dimensions and query
 */
export function getPlaceholderImage(width: number, height: number, query: string): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(query)}`
}

/**
 * Determines the appropriate image size based on the viewport
 */
export function getResponsiveImageSize(
  viewportWidth: number,
  options: { sm?: number; md?: number; lg?: number; xl?: number; default: number },
): number {
  if (viewportWidth < 640 && options.sm) return options.sm
  if (viewportWidth < 768 && options.md) return options.md
  if (viewportWidth < 1024 && options.lg) return options.lg
  if (viewportWidth < 1280 && options.xl) return options.xl
  return options.default
}

/**
 * Generates a sizes attribute for the Image component
 */
export function getImageSizes(config: {
  mobile?: string
  tablet?: string
  desktop?: string
  default: string
}): string {
  return `
    (max-width: 640px) ${config.mobile || config.default},
    (max-width: 768px) ${config.tablet || config.mobile || config.default},
    (max-width: 1024px) ${config.desktop || config.tablet || config.mobile || config.default},
    ${config.default}
  `.trim()
}

/**
 * Checks if an image URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false

  // Check if it's a relative URL
  if (url.startsWith("/")) return true

  // Check if it's an absolute URL
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Extracts image dimensions from a URL if available
 */
export function extractImageDimensions(url: string): { width?: number; height?: number } {
  try {
    const urlObj = new URL(url)
    const width = urlObj.searchParams.get("width")
    const height = urlObj.searchParams.get("height")

    return {
      width: width ? Number.parseInt(width) : undefined,
      height: height ? Number.parseInt(height) : undefined,
    }
  } catch (e) {
    return {}
  }
}
