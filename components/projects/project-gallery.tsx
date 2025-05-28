import Image from "next/image"

export function ProjectGallery() {
  // Mock gallery images
  const galleryImages = [
    { id: "1", src: "/urban-green-infrastructure.png", alt: "Green roof installation" },
    { id: "2", src: "/nature-based-solutions-urban.png", alt: "Urban tree planting" },
    { id: "3", src: "/climate-adaptation-policy.png", alt: "Community workshop" },
  ]

  return (
    <div className="py-2">
      <h3 className="text-lg font-semibold mb-2">Project Gallery</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative h-40 overflow-hidden rounded-lg">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
