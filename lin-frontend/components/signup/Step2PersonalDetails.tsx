"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { personalDetailsSchema, type PersonalDetailsForm } from "@/lib/signup-schemas"

interface Step2Props {
  onSubmit: (data: PersonalDetailsForm) => void
  onGoToDashboard: () => void
  formData: PersonalDetailsForm
  setFormData: (data: PersonalDetailsForm) => void
}

export function Step2PersonalDetails({ onSubmit, onGoToDashboard, formData, setFormData }: Step2Props) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData
  })

  const firstName = watch("firstName")
  const lastName = watch("lastName")
  const dateOfBirth = watch("dateOfBirth")
  const gender = watch("gender")

  const handleFormSubmit = (data: PersonalDetailsForm) => {
    setFormData(data)
    onSubmit(data)
  }

  const handleGenderChange = (value: string) => {
    setValue("gender", value as any)
    setFormData({ ...formData, gender: value as any })
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue("dateOfBirth", value)
    setFormData({ ...formData, dateOfBirth: value })
  }

  const isFormValid = firstName && lastName && dateOfBirth && gender

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            First name *
          </label>
          <Input
            {...register("firstName")}
            placeholder="Enter your first name"
            className="w-full h-12 text-base"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-2">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Middle name
          </label>
          <Input
            {...register("middleName")}
            placeholder="Enter your middle name"
            className="w-full h-12 text-base"
            defaultValue=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Last name *
          </label>
          <Input
            {...register("lastName")}
            placeholder="Enter your last name"
            className="w-full h-12 text-base"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-2">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Date of birth *
          </label>
          <Input
            type="date"
            {...register("dateOfBirth")}
            onChange={handleDateChange}
            className="w-full h-12 text-base"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-2">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gender *
          </label>
          <Select value={gender} onValueChange={handleGenderChange}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-2">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium"
            disabled={!isFormValid}
          >
            Apply loan →
          </Button>
          
          {isFormValid && (
            <button
              type="button"
              onClick={onGoToDashboard}
              className="px-6 py-3 text-gray-600 hover:text-red-600 text-sm font-medium transition-colors"
            >
              Go to dashboard
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
