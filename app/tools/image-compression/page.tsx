"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { ImageUpload } from "@/components/ui/image-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { compressionPresets, type CompressionPreset } from "@/lib/image-compression"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { ImageIcon } from "@radix-ui/react-icons"

export default function ImageCompressionPage() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<CompressionPreset>("medium")
  const [selectedFormat, setSelectedFormat] = useState<"webp" | "jpeg" | "png" | "avif">("webp")

  const handleImageUploaded = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl)
  }

  return (
    <div className="container py-8">
      <PageHeader
        heading="Image Compression Tool"
        text="Optimize your images for better performance and faster loading times"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Compression Settings</CardTitle>
            <CardDescription>Choose how you want to compress your images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preset">Preset</Label>
              <Select value={selectedPreset} onValueChange={(value) => setSelectedPreset(value as CompressionPreset)}>
                <SelectTrigger id="preset">
                  <SelectValue placeholder="Select a preset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thumbnail">Thumbnail (200×200)</SelectItem>
                  <SelectItem value="small">Small (640px width)</SelectItem>
                  <SelectItem value="medium">Medium (1200px width)</SelectItem>
                  <SelectItem value="large">Large (1920px width)</SelectItem>
                  <SelectItem value="avatar">Avatar (150×150)</SelectItem>
                  <SelectItem value="hero">Hero (2048px width)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Output Format</Label>
              <Select
                value={selectedFormat}
                onValueChange={(value) => setSelectedFormat(value as "webp" | "jpeg" | "png" | "avif")}
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webp">WebP (Best overall)</SelectItem>
                  <SelectItem value="jpeg">JPEG (Photos)</SelectItem>
                  <SelectItem value="png">PNG (Transparency)</SelectItem>
                  <SelectItem value="avif">AVIF (Smallest size)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <ImageUpload
                onImageUploaded={handleImageUploaded}
                preset={selectedPreset}
                format={selectedFormat}
                showPreview={false}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>See your compressed image and compare with the original</CardDescription>
          </CardHeader>
          <CardContent>
            {uploadedImageUrl ? (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <OptimizedImage
                    src={uploadedImageUrl}
                    alt="Compressed image"
                    className="w-full h-auto"
                    aspectRatio="auto"
                  />
                </div>
                <div className="text-sm text-muted-foreground text-center">
                  Compressed using {selectedPreset} preset in {selectedFormat} format
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="flex justify-center mb-2">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                  <p>Upload an image to see the compressed version</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Image Compression</CardTitle>
          <CardDescription>Learn how our image compression pipeline works</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="formats">Image Formats</TabsTrigger>
              <TabsTrigger value="presets">Compression Presets</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-4">
              <p>
                Our image compression pipeline uses advanced techniques to reduce image file sizes while maintaining
                visual quality. This helps your pages load faster and reduces bandwidth usage.
              </p>
              <p>The compression process includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Resizing images to appropriate dimensions</li>
                <li>Converting to modern formats like WebP and AVIF</li>
                <li>Optimizing quality settings based on content type</li>
                <li>Stripping unnecessary metadata</li>
              </ul>
            </TabsContent>
            <TabsContent value="formats" className="mt-4 space-y-4">
              <p>We support several image formats, each with different advantages:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">WebP</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modern format with excellent compression and quality. Supports transparency. Best choice for most
                    web images.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">JPEG</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Great for photographs and complex images with many colors. No transparency support.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">PNG</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lossless compression with transparency support. Best for graphics, logos, and text.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">AVIF</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Newest format with the best compression ratios. Limited browser support but excellent for modern
                    browsers.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="presets" className="mt-4">
              <p className="mb-4">We offer several compression presets to optimize images for different use cases:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(compressionPresets).map(([name, preset]) => (
                  <div key={name} className="border rounded-md p-4">
                    <h3 className="font-medium capitalize">{name}</h3>
                    <div className="text-sm text-muted-foreground mt-2 space-y-1">
                      <p>Width: {preset.width || "Auto"}</p>
                      <p>Height: {preset.height || "Auto"}</p>
                      <p>Quality: {preset.quality}%</p>
                      <p>Format: {preset.format}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
