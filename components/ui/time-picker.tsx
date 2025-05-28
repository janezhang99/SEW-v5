"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (time: string) => void
  className?: string
}

export function TimePicker({ value, onChange, className, ...props }: TimePickerProps) {
  // Parse the initial value (format: "HH:mm")
  const [hours, minutes] = value.split(":").map(Number)

  // State for hours and minutes
  const [localHours, setLocalHours] = React.useState<string>(hours.toString().padStart(2, "0"))
  const [localMinutes, setLocalMinutes] = React.useState<string>(minutes.toString().padStart(2, "0"))

  // Handle hours input change
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, "")

    if (newValue === "") {
      setLocalHours("")
      return
    }

    const numValue = Number.parseInt(newValue, 10)

    if (numValue >= 0 && numValue <= 23) {
      const formattedValue = numValue.toString().padStart(2, "0")
      setLocalHours(formattedValue.slice(0, 2))

      // If we have both hours and minutes, call the onChange handler
      if (localMinutes) {
        onChange(`${formattedValue}:${localMinutes}`)
      }
    }
  }

  // Handle minutes input change
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, "")

    if (newValue === "") {
      setLocalMinutes("")
      return
    }

    const numValue = Number.parseInt(newValue, 10)

    if (numValue >= 0 && numValue <= 59) {
      const formattedValue = numValue.toString().padStart(2, "0")
      setLocalMinutes(formattedValue.slice(0, 2))

      // If we have both hours and minutes, call the onChange handler
      if (localHours) {
        onChange(`${localHours}:${formattedValue}`)
      }
    }
  }

  // Handle hours input blur
  const handleHoursBlur = () => {
    if (localHours === "") {
      setLocalHours("00")
    } else {
      const numValue = Number.parseInt(localHours, 10)
      setLocalHours(numValue.toString().padStart(2, "0"))
    }
  }

  // Handle minutes input blur
  const handleMinutesBlur = () => {
    if (localMinutes === "") {
      setLocalMinutes("00")
    } else {
      const numValue = Number.parseInt(localMinutes, 10)
      setLocalMinutes(numValue.toString().padStart(2, "0"))
    }
  }

  // Update local state when value prop changes
  React.useEffect(() => {
    const [newHours, newMinutes] = value.split(":").map(Number)
    setLocalHours(newHours.toString().padStart(2, "0"))
    setLocalMinutes(newMinutes.toString().padStart(2, "0"))
  }, [value])

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="grid gap-1.5">
        <Label htmlFor="hours" className="sr-only">
          Hours
        </Label>
        <Input
          id="hours"
          className="w-14 text-center"
          value={localHours}
          onChange={handleHoursChange}
          onBlur={handleHoursBlur}
          placeholder="HH"
          maxLength={2}
          {...props}
        />
      </div>
      <span className="text-sm">:</span>
      <div className="grid gap-1.5">
        <Label htmlFor="minutes" className="sr-only">
          Minutes
        </Label>
        <Input
          id="minutes"
          className="w-14 text-center"
          value={localMinutes}
          onChange={handleMinutesChange}
          onBlur={handleMinutesBlur}
          placeholder="MM"
          maxLength={2}
          {...props}
        />
      </div>
    </div>
  )
}
