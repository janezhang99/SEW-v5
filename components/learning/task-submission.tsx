"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PermissionGuard } from "@/components/auth/permission-guard"

interface TaskSubmissionProps {
  taskId: string
  taskTitle: string
  onSubmit: (submission: any) => void
  existingSubmission?: any
}

export function TaskSubmission({ taskId, taskTitle, onSubmit, existingSubmission }: TaskSubmissionProps) {
  const [submission, setSubmission] = useState(existingSubmission?.content || "")
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const submissionData = {
      taskId,
      content: submission,
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
      submittedBy: user?.id,
      submittedAt: new Date().toISOString(),
      status: "pending",
    }

    await onSubmit(submissionData)
    setIsSubmitting(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="mr-1 h-3 w-3" />
            Under Review
          </Badge>
        )
      case "needs-revision":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            <AlertCircle className="mr-1 h-3 w-3" />
            Needs Revision
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Submit Task: {taskTitle}</CardTitle>
            <CardDescription>Upload your completed work for review</CardDescription>
          </div>
          {existingSubmission && getStatusBadge(existingSubmission.status)}
        </div>
      </CardHeader>
      <CardContent>
        <PermissionGuard section="learning" action="submit">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="submission">Task Submission</Label>
              <Textarea
                id="submission"
                placeholder="Describe your work, findings, or attach relevant files..."
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div>
              <Label htmlFor="files">Supporting Files (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <Input
                    id="files"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  />
                  <Label htmlFor="files" className="cursor-pointer text-sm text-blue-600 hover:text-blue-500">
                    Click to upload files
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPG, PNG up to 10MB each</p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                      <FileText className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500 ml-auto">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting || !submission.trim()}>
                {isSubmitting ? "Submitting..." : existingSubmission ? "Update Submission" : "Submit Task"}
              </Button>
              {existingSubmission?.status === "needs-revision" && (
                <Button type="button" variant="outline">
                  View Feedback
                </Button>
              )}
            </div>
          </form>
        </PermissionGuard>

        <PermissionGuard section="learning" action="review">
          {existingSubmission && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-2">Mentor Review</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="mr-2">
                  Approve
                </Button>
                <Button variant="outline" size="sm" className="mr-2">
                  Request Revision
                </Button>
                <Button variant="outline" size="sm">
                  Add Feedback
                </Button>
              </div>
            </div>
          )}
        </PermissionGuard>
      </CardContent>
    </Card>
  )
}
