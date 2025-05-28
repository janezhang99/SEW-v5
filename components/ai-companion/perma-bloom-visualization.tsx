"use client"

import { useEffect, useRef } from "react"
import type { FlourishingIndicator } from "@/types/ai-companion"

interface PermaBloomVisualizationProps {
  indicators: Partial<Record<FlourishingIndicator, number>>
  className?: string
}

export function PermaBloomVisualization({ indicators, className = "" }: PermaBloomVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const indicatorColors = {
    positive_emotion: "#f43f5e", // Rose (warm, positive feeling)
    engagement: "#3b82f6", // Blue (focus, flow)
    relationships: "#10b981", // Emerald (connection, growth)
    meaning: "#8b5cf6", // Purple (purpose, spirituality)
    accomplishment: "#f59e0b", // Amber (achievement, reward)
    vitality: "#f97316", // Orange (energy, vigor)
  }

  const indicatorLabels: Record<FlourishingIndicator, string> = {
    positive_emotion: "Positive Emotion",
    engagement: "Engagement",
    relationships: "Relationships",
    meaning: "Meaning",
    accomplishment: "Accomplishment",
    vitality: "Vitality",
  }

  const indicatorIcons: Record<FlourishingIndicator, string> = {
    positive_emotion: "❤️",
    engagement: "🧠",
    relationships: "👥",
    meaning: "🧭",
    accomplishment: "🏆",
    vitality: "⚡",
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Calculate center and radius
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const maxRadius = Math.min(centerX, centerY) * 0.85

    // Draw background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fill()

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, maxRadius * 0.15, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
    ctx.lineWidth = 1
    ctx.stroke()

    // Get all indicators
    const allIndicators: FlourishingIndicator[] = [
      "positive_emotion",
      "engagement",
      "relationships",
      "meaning",
      "accomplishment",
      "vitality",
    ]

    // Draw petals
    const petalCount = allIndicators.length
    const angleStep = (Math.PI * 2) / petalCount

    allIndicators.forEach((indicator, index) => {
      const value = indicators[indicator] || 0
      const normalizedValue = value / 10 // Assuming values are 0-10

      // Calculate angle for this petal
      const angle = index * angleStep - Math.PI / 2 // Start from top (subtract 90 degrees)

      // Draw petal
      drawPetal(
        ctx,
        centerX,
        centerY,
        angle,
        maxRadius,
        normalizedValue,
        indicatorColors[indicator as keyof typeof indicatorColors],
      )

      // Draw label
      const labelRadius = maxRadius * 1.15
      const labelX = centerX + Math.cos(angle) * labelRadius
      const labelY = centerY + Math.sin(angle) * labelRadius

      // Draw icon
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(indicatorIcons[indicator], labelX, labelY)
    })

    // Draw center icon
    ctx.font = "20px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("🌸", centerX, centerY)
  }, [indicators])

  // Function to draw a petal
  function drawPetal(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    angle: number,
    maxRadius: number,
    normalizedValue: number,
    color: string,
  ) {
    const innerRadius = maxRadius * 0.15 // Match center circle
    const outerRadius = innerRadius + (maxRadius - innerRadius) * normalizedValue
    const petalWidth = Math.PI / 6 // Controls how wide each petal is

    // Draw petal
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)

    // Create a curved petal shape
    const startAngle = angle - petalWidth
    const endAngle = angle + petalWidth

    // Control points for the bezier curve
    const cp1x = centerX + Math.cos(startAngle) * outerRadius * 0.5
    const cp1y = centerY + Math.sin(startAngle) * outerRadius * 0.5
    const cp2x = centerX + Math.cos(endAngle) * outerRadius * 0.5
    const cp2y = centerY + Math.sin(endAngle) * outerRadius * 0.5
    const endX = centerX + Math.cos(angle) * outerRadius
    const endY = centerY + Math.sin(angle) * outerRadius

    // Draw the petal using a quadratic curve
    ctx.quadraticCurveTo(cp1x, cp1y, endX, endY)
    ctx.quadraticCurveTo(cp2x, cp2y, centerX, centerY)

    // Fill petal
    ctx.fillStyle = color + "80" // Add transparency
    ctx.fill()

    // Stroke petal
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.stroke()
  }

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-64" style={{ touchAction: "none" }} />
      <div className="grid grid-cols-3 gap-2 mt-4">
        {Object.entries(indicators).map(([key, value]) => (
          <div key={key} className="flex items-center gap-1.5 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: indicatorColors[key as keyof typeof indicatorColors],
              }}
            />
            <span className="truncate">
              {indicatorLabels[key as FlourishingIndicator]}: {value}/10
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
