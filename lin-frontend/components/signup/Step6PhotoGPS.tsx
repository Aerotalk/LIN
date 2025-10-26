"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { photoAndLocationSchema, type PhotoLocationForm, } from "@/lib/signup-schemas"
import { FileUpload } from "../ui/file-upload"

interface Step5Props {
  onSubmit: (data: PhotoLocationForm) => void
  onBack?: () => void
  otpSent: boolean
  resendTimer: number
  onResend: () => void
  formData: PhotoLocationForm
  setFormData: (data: PhotoLocationForm) => void
}

export function Step6PhotoGPS({
  onSubmit,
  onBack,
  formData,
  setFormData
}: Step5Props) {
  const { handleSubmit, formState: { errors }, setValue } = useForm<PhotoLocationForm>({
    resolver: zodResolver(photoAndLocationSchema),
    defaultValues: formData
  })

  const handleFormSubmit = (data: PhotoLocationForm) => {
    setFormData(data)
    onSubmit(data)
  }

  const handleFileChange = (field: keyof PhotoLocationForm, file: File | null) => {
    if (file) {
      setValue(field, file as any)
      setFormData({ ...formData, [field]: file })
    }
  }

  const handleLocationToggle = (checked: boolean) => {
    setValue("autoDetectLocation", checked)
    setFormData({ ...formData, autoDetectLocation: checked })

    if (checked) {
      // Simulate location detection
      const mockLocation = "12.56899667, 23.0098656"
      setValue("location", mockLocation)
      setFormData({ ...formData, autoDetectLocation: checked, location: mockLocation })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-red-600 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload your recent photo*
          </label>
          <FileUpload
            accept="image/*"
            placeholder="Click to upload or take photo"
            onFileChange={(file) => handleFileChange("photoFile", file)}
          />
          {errors.photoFile && (
            <p className="text-red-500 text-sm mt-1">{errors.photoFile.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.autoDetectLocation}
              onChange={(e) => handleLocationToggle(e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Auto-detect location *
            </span>
          </label>
          <p className="text-xs text-gray-500">
            Make your GPS is turned on
          </p>
          {formData.autoDetectLocation && formData.location && (
            <p className="text-xs text-gray-600">
              Location: {formData.location}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium">
          Submit application
        </Button>
      </div>
    </form>
  )
}
