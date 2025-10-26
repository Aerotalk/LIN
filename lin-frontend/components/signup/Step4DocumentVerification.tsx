"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/ui/file-upload"
import { documentVerificationSchema, type DocumentVerificationForm } from "@/lib/signup-schemas"

interface Step4Props {
  onSubmit: (data: DocumentVerificationForm) => void
  formData: DocumentVerificationForm
  setFormData: (data: DocumentVerificationForm) => void
}

export function Step4DocumentVerification({ onSubmit, formData, setFormData }: Step4Props) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<DocumentVerificationForm>({
    resolver: zodResolver(documentVerificationSchema),
    defaultValues: formData
  })

  const handleFormSubmit = (data: DocumentVerificationForm) => {
    setFormData(data)
    onSubmit(data)
  }

  const handleFileChange = (field: keyof DocumentVerificationForm, file: File | null) => {
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
      <div className="space-y-6">
        {/* Salary details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Salary details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last 3 months pay slip *
            </label>
            <FileUpload
              accept="application/pdf"
              placeholder="Click to upload pdf here"
              onFileChange={(file) => handleFileChange("payslipFile", file)}
            />
            {errors.payslipFile && (
              <p className="text-red-500 text-sm mt-1">{errors.payslipFile.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last 3 months bank statement *
            </label>
            <FileUpload
              accept="application/pdf"
              placeholder="Click to upload pdf here"
              onFileChange={(file) => handleFileChange("bankStatementFile", file)}
            />
            {errors.bankStatementFile && (
              <p className="text-red-500 text-sm mt-1">{errors.bankStatementFile.message}</p>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN number *
            </label>
            <Input
              {...register("panNumber")}
              placeholder="Enter your PAN number"
              className="w-full uppercase"
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value.toUpperCase()
                setValue("panNumber", value)
                setFormData({ ...formData, panNumber: value })
              }}
            />
            {errors.panNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aadhaar number *
            </label>
            <Input
              {...register("aadhaarNumber")}
              placeholder="Enter your Aadhaar number"
              className="w-full"
              maxLength={12}
              type="tel"
            />
            {errors.aadhaarNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber.message}</p>
            )}
          </div>

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
        </div>

        <p className="text-sm text-gray-600">
          Secure, transparent, and RBI-compliant personal loans — designed to help you when you need it most.
        </p>

        <p className="text-xs text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-red-600 hover:underline">privacy policies</a>{" "}
          and{" "}
          <a href="#" className="text-red-600 hover:underline">T&C</a>.
          You also authorize us to{" "}
          <a href="#" className="text-red-600 hover:underline">retrieve your credit report</a>{" "}
          & communicate with you via phone, e-mails, WhatsApp, etc.
        </p>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
          Get OTP
        </Button>
      </div>
    </form>
  )
}
