import Image from "next/image"

export function ProjectMap() {
  return (
    <div className="py-2">
      <h3 className="text-lg font-semibold mb-2">Project Location</h3>
      <div className="relative h-64 w-full overflow-hidden rounded-lg border">
        <Image src="/climate-risk-map-flooding.png" alt="Project location map" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background/80 px-4 py-2 rounded-md">
            <p className="text-sm font-medium">Interactive map coming soon</p>
          </div>
        </div>
      </div>
    </div>
  )
}
