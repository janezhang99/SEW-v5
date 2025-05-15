"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Define the theme types
type ThemeKey = "northern" | "woodland" | "plains" | "coastal" | "urban" | "default"

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
  border: string
}

interface ThemePatterns {
  header: string
  card: string
  divider: string
}

interface ThemeImages {
  backgroundImage: string
  iconSet: string
}

interface Theme {
  name: string
  description: string
  colors: ThemeColors
  patterns: ThemePatterns
  images: ThemeImages
  fontFamily: string
}

// Define the themes
const themes: Record<ThemeKey, Theme> = {
  northern: {
    name: "Northern",
    description: "Inspired by the landscapes and cultures of Northern Indigenous communities",
    colors: {
      primary: "from-blue-500 to-indigo-600",
      secondary: "from-teal-400 to-cyan-500",
      accent: "from-purple-500 to-pink-500",
      background: "bg-slate-50",
      text: "text-slate-900",
      muted: "text-slate-500",
      border: "border-slate-200",
    },
    patterns: {
      header: "bg-[url('/patterns/northern-header.svg')]",
      card: "bg-[url('/patterns/northern-card.svg')]",
      divider: "bg-[url('/patterns/northern-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "northern",
    },
    fontFamily: "font-sans",
  },
  woodland: {
    name: "Woodland",
    description: "Reflecting the forests and woodland Indigenous artistic traditions",
    colors: {
      primary: "from-green-500 to-emerald-600",
      secondary: "from-amber-400 to-yellow-500",
      accent: "from-red-500 to-rose-500",
      background: "bg-stone-50",
      text: "text-stone-900",
      muted: "text-stone-500",
      border: "border-stone-200",
    },
    patterns: {
      header: "bg-[url('/patterns/woodland-header.svg')]",
      card: "bg-[url('/patterns/woodland-card.svg')]",
      divider: "bg-[url('/patterns/woodland-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "woodland",
    },
    fontFamily: "font-serif",
  },
  plains: {
    name: "Plains",
    description: "Honoring the artistic traditions of Plains Indigenous communities",
    colors: {
      primary: "from-amber-500 to-orange-600",
      secondary: "from-sky-400 to-blue-500",
      accent: "from-red-500 to-rose-500",
      background: "bg-orange-50",
      text: "text-orange-900",
      muted: "text-orange-700",
      border: "border-orange-200",
    },
    patterns: {
      header: "bg-[url('/patterns/plains-header.svg')]",
      card: "bg-[url('/patterns/plains-card.svg')]",
      divider: "bg-[url('/patterns/plains-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "plains",
    },
    fontFamily: "font-sans",
  },
  coastal: {
    name: "Coastal",
    description: "Inspired by the artistic traditions of Coastal Indigenous communities",
    colors: {
      primary: "from-cyan-500 to-blue-600",
      secondary: "from-emerald-400 to-green-500",
      accent: "from-red-500 to-rose-500",
      background: "bg-blue-50",
      text: "text-blue-900",
      muted: "text-blue-700",
      border: "border-blue-200",
    },
    patterns: {
      header: "bg-[url('/patterns/coastal-header.svg')]",
      card: "bg-[url('/patterns/coastal-card.svg')]",
      divider: "bg-[url('/patterns/coastal-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "coastal",
    },
    fontFamily: "font-sans",
  },
  urban: {
    name: "Urban Indigenous",
    description: "Contemporary design reflecting urban Indigenous experiences",
    colors: {
      primary: "from-violet-500 to-purple-600",
      secondary: "from-pink-400 to-rose-500",
      accent: "from-amber-500 to-orange-500",
      background: "bg-zinc-50",
      text: "text-zinc-900",
      muted: "text-zinc-500",
      border: "border-zinc-200",
    },
    patterns: {
      header: "bg-[url('/patterns/urban-header.svg')]",
      card: "bg-[url('/patterns/urban-card.svg')]",
      divider: "bg-[url('/patterns/urban-divider.svg')]",
    },
    images: {
      backgroundImage: "/placeholder-vj1kw.png",
      iconSet: "urban",
    },
    fontFamily: "font-sans",
  },
  default: {
    name: "Default",
    description: "Standard design system",
    colors: {
      primary: "from-blue-500 to-indigo-600",
      secondary: "from-green-400 to-emerald-500",
      accent: "from-amber-500 to-orange-500",
      background: "bg-white",
      text: "text-gray-900",
      muted: "text-gray-500",
      border: "border-gray-200",
    },
    patterns: {
      header: "",
      card: "",
      divider: "",
    },
    images: {
      backgroundImage: "",
      iconSet: "default",
    },
    fontFamily: "font-sans",
  },
}

// Example case studies
const caseStudies = [
  {
    id: "cs1",
    title: "Community Garden Revitalization",
    description:
      "How a First Nations community transformed unused land into a thriving garden that provides fresh produce and traditional medicines.",
    location: "Whitehorse, Yukon",
    community: "Northern",
    image: "/placeholder-vj1kw.png",
    tags: ["Land-Based", "Food Sovereignty", "Community Building"],
  },
  {
    id: "cs2",
    title: "Youth Cultural Camp Program",
    description:
      "A summer program connecting urban Indigenous youth with Elders to learn traditional skills and knowledge.",
    location: "Edmonton, Alberta",
    community: "Urban Indigenous",
    image: "/placeholder-vj1kw.png",
    tags: ["Youth", "Cultural Revitalization", "Mentorship"],
  },
  {
    id: "cs3",
    title: "Traditional Art Cooperative",
    description:
      "How artists from multiple nations created an economic development initiative through collaborative art projects.",
    location: "Prince Rupert, BC",
    community: "Coastal",
    image: "/placeholder-vj1kw.png",
    tags: ["Arts", "Economic Development", "Collaboration"],
  },
]

// Component to showcase Indigenous design elements
export function IndigenousDesignSystem() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("northern")
  const theme = themes[activeTheme]

  return (
    <div className={cn("p-6 rounded-xl", theme.colors.background)}>
      <div className="mb-8">
        <h2 className={cn("text-2xl font-bold mb-2", theme.colors.text)}>Indigenous Design System</h2>
        <p className={cn("text-base", theme.colors.muted)}>
          Culturally relevant design elements that honor and reflect Indigenous aesthetics and values
        </p>
      </div>

      <Tabs defaultValue="themes" className="mb-8">
        <TabsList>
          <TabsTrigger value="themes">Cultural Themes</TabsTrigger>
          <TabsTrigger value="elements">Design Elements</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(themes) as ThemeKey[])
              .filter((key) => key !== "default")
              .map((themeKey) => (
                <Card
                  key={themeKey}
                  className={cn(
                    "cursor-pointer transition-all overflow-hidden",
                    activeTheme === themeKey ? "ring-2 ring-primary" : "",
                    themes[themeKey].colors.background,
                    themes[themeKey].colors.border,
                  )}
                  onClick={() => setActiveTheme(themeKey)}
                >
                  <div className={cn("h-3 w-full bg-gradient-to-r", themes[themeKey].colors.primary)} />
                  <CardHeader>
                    <CardTitle className={cn(themes[themeKey].colors.text)}>{themes[themeKey].name}</CardTitle>
                    <CardDescription className={cn(themes[themeKey].colors.muted)}>
                      {themes[themeKey].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <div className={cn("h-6 w-12 rounded-full bg-gradient-to-r", themes[themeKey].colors.primary)} />
                      <div
                        className={cn("h-6 w-12 rounded-full bg-gradient-to-r", themes[themeKey].colors.secondary)}
                      />
                      <div className={cn("h-6 w-12 rounded-full bg-gradient-to-r", themes[themeKey].colors.accent)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="elements" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Palette */}
            <Card className={cn(theme.colors.background, theme.colors.border)}>
              <CardHeader>
                <CardTitle className={cn(theme.colors.text)}>Color Palette</CardTitle>
                <CardDescription className={cn(theme.colors.muted)}>
                  Colors inspired by traditional art and natural elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className={cn("text-sm font-medium mb-2", theme.colors.text)}>Primary</p>
                  <div className={cn("h-10 w-full rounded-md bg-gradient-to-r", theme.colors.primary)} />
                </div>
                <div>
                  <p className={cn("text-sm font-medium mb-2", theme.colors.text)}>Secondary</p>
                  <div className={cn("h-10 w-full rounded-md bg-gradient-to-r", theme.colors.secondary)} />
                </div>
                <div>
                  <p className={cn("text-sm font-medium mb-2", theme.colors.text)}>Accent</p>
                  <div className={cn("h-10 w-full rounded-md bg-gradient-to-r", theme.colors.accent)} />
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card className={cn(theme.colors.background, theme.colors.border)}>
              <CardHeader>
                <CardTitle className={cn(theme.colors.text)}>Typography</CardTitle>
                <CardDescription className={cn(theme.colors.muted)}>
                  Text styles that complement Indigenous design elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className={cn("text-sm font-medium mb-2", theme.colors.text)}>Headings</p>
                  <h1 className={cn("text-3xl font-bold", theme.colors.text, theme.fontFamily)}>Heading Level 1</h1>
                  <h2 className={cn("text-2xl font-semibold", theme.colors.text, theme.fontFamily)}>Heading Level 2</h2>
                  <h3 className={cn("text-xl font-medium", theme.colors.text, theme.fontFamily)}>Heading Level 3</h3>
                </div>
                <div>
                  <p className={cn("text-sm font-medium mb-2", theme.colors.text)}>Body Text</p>
                  <p className={cn("text-base", theme.colors.text, theme.fontFamily)}>
                    Regular paragraph text that respects traditional storytelling and oral traditions while being
                    accessible and readable.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Buttons */}
            <Card className={cn(theme.colors.background, theme.colors.border)}>
              <CardHeader>
                <CardTitle className={cn(theme.colors.text)}>Buttons & Controls</CardTitle>
                <CardDescription className={cn(theme.colors.muted)}>
                  Interactive elements with cultural styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className={cn("w-full bg-gradient-to-r", theme.colors.primary)}>Primary Button</Button>
                  <Button variant="outline" className={cn("w-full", theme.colors.border, theme.colors.text)}>
                    Secondary Button
                  </Button>
                  <Button variant="ghost" className={cn("w-full", theme.colors.text)}>
                    Ghost Button
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cards & Containers */}
            <Card className={cn(theme.colors.background, theme.colors.border)}>
              <CardHeader>
                <CardTitle className={cn(theme.colors.text)}>Cards & Containers</CardTitle>
                <CardDescription className={cn(theme.colors.muted)}>
                  Content containers with cultural design elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={cn("p-4 rounded-lg border", theme.colors.border, theme.colors.background)}>
                  <h3 className={cn("text-lg font-medium mb-2", theme.colors.text)}>Example Container</h3>
                  <p className={cn("text-sm", theme.colors.muted)}>
                    Content containers use subtle cultural patterns and colors that reflect the selected theme.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="case-studies" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <Card key={study.id} className={cn(theme.colors.background, theme.colors.border, "overflow-hidden")}>
                <div className="relative h-48">
                  <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className={cn(theme.colors.text)}>{study.title}</CardTitle>
                  <CardDescription className={cn(theme.colors.muted)}>
                    {study.location} • {study.community}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={cn("text-sm", theme.colors.text)}>{study.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "px-2 py-1 text-xs rounded-full",
                          "bg-gradient-to-r",
                          theme.colors.secondary,
                          "text-white",
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className={cn("w-full bg-gradient-to-r", theme.colors.primary)}>View Case Study</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h3 className={cn("text-xl font-bold mb-4", theme.colors.text)}>Implementation Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={cn(theme.colors.background, theme.colors.border)}>
            <CardHeader>
              <CardTitle className={cn(theme.colors.text)}>Cultural Respect</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className={cn("space-y-2 text-sm", theme.colors.text)}>
                <li>• Consult with Indigenous community members when using cultural elements</li>
                <li>• Acknowledge the specific nations and traditions that inspire design choices</li>
                <li>• Avoid appropriation by understanding the meaning behind design elements</li>
                <li>• Prioritize Indigenous voices in the design process</li>
              </ul>
            </CardContent>
          </Card>

          <Card className={cn(theme.colors.background, theme.colors.border)}>
            <CardHeader>
              <CardTitle className={cn(theme.colors.text)}>Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className={cn("space-y-2 text-sm", theme.colors.text)}>
                <li>• Ensure cultural design elements don't compromise usability</li>
                <li>• Maintain sufficient color contrast for readability</li>
                <li>• Provide alternative text for cultural imagery</li>
                <li>• Balance cultural aesthetics with universal design principles</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Example usage component
export function IndigenousDesignSystemExample() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cultural Design Elements</h1>
      <IndigenousDesignSystem />
    </div>
  )
}
