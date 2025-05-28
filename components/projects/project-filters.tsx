"use client"

import React from "react"

import { useState } from "react"
import {
  Search,
  Lightbulb,
  ClipboardList,
  FlaskRoundIcon as Flask,
  Wrench,
  Rocket,
  CheckCircle,
  HelpCircle,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Stage to icon mapping
const stageIcons = {
  ideation: Lightbulb,
  planning: ClipboardList,
  development: Flask,
  implementation: Wrench,
  deployment: Rocket,
  completed: CheckCircle,
  all: HelpCircle,
}

// Stage to color mapping
const stageColors = {
  ideation: "text-amber-500",
  planning: "text-blue-500",
  development: "text-purple-500",
  implementation: "text-green-500",
  deployment: "text-orange-500",
  completed: "text-emerald-500",
  all: "text-gray-500",
}

export function ProjectFilters() {
  const [progressRange, setProgressRange] = useState([0, 100])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="Search projects..." className="pl-8" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <Select>
            <SelectTrigger id="domain">
              <SelectValue placeholder="All domains" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All domains</SelectItem>
              <SelectItem value="risk">Climate Risk Assessment</SelectItem>
              <SelectItem value="planning">Strategic Adaptation Planning</SelectItem>
              <SelectItem value="options">Adaptation Options</SelectItem>
              <SelectItem value="implementation">Implementation & Operations</SelectItem>
              <SelectItem value="monitoring">Monitoring & Learning</SelectItem>
              <SelectItem value="cross-cutting">Cross-Cutting Skills</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stage">Stage</Label>
          <Select>
            <SelectTrigger id="stage">
              <SelectValue placeholder="All stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center">
                  <div className={`mr-2 ${stageColors.all}`}>{React.createElement(stageIcons.all, { size: 16 })}</div>
                  All stages
                </div>
              </SelectItem>
              <SelectItem value="ideation">
                <div className="flex items-center">
                  <div className={`mr-2 ${stageColors.ideation}`}>
                    {React.createElement(stageIcons.ideation, { size: 16 })}
                  </div>
                  Ideation
                </div>
              </SelectItem>
              <SelectItem value="planning">
                <div className="flex items-center">
                  <div className={`mr-2 ${stageColors.planning}`}>
                    {React.createElement(stageIcons.planning, { size: 16 })}
                  </div>
                  Planning
                </div>
              </SelectItem>
              <SelectItem value="development">
                <div className="flex items-center">
                  <div className={`mr-2 ${stageColors.development}`}>
                    {React.createElement(stageIcons.development, { size: 16 })}
                  </div>
                  Development
                </div>
              </SelectItem>
              <SelectItem value="implementation">
                <div className="flex items-center">
                  <div className={`mr-2 ${stageColors.implementation}`}>
                    {React.createElement(stageIcons.implementation, { size: 16 })}
                  </div>
                  Implementation
                </div>
              </SelectItem>
              <SelectItem value="deployment">
                <div className="flex items-center">
                  <div className={`mr-2 ${stageColors.deployment}`}>
                    {React.createElement(stageIcons.deployment, { size: 16 })}
                  </div>
                  Deployment
                </div>
              </SelectItem>
              <SelectItem value="completed">
                <div className="flex items-center">
                  <div className={`mr-2 ${stageColors.completed}`}>
                    {React.createElement(stageIcons.completed, { size: 16 })}
                  </div>
                  Completed
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Progress</Label>
            <span className="text-xs text-muted-foreground">
              {progressRange[0]}% - {progressRange[1]}%
            </span>
          </div>
          <Slider defaultValue={[0, 100]} max={100} step={5} value={progressRange} onValueChange={setProgressRange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Last updated" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last updated</SelectItem>
              <SelectItem value="created">Date created</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}
