"use client"

import React, { useState } from "react"
import { useSignup } from "@/hooks/useSignup"
import { Step1PhoneVerification } from "@/components/signup/Step1PhoneVerification"
import { Step2PersonalDetails } from "@/components/signup/Step2PersonalDetails"
import { Step3BasicDetails } from "@/components/signup/Step3BasicDetails"
import { Step4DocumentVerification } from "@/components/signup/Step4DocumentVerification"
import { Step5AadhaarOtp } from "@/components/signup/Step5AadhaarOtp"
import { Step6PhotoGPS } from "@/components/signup/Step6PhotoGPS"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  PhoneVerificationData,
  PersonalDetailsData,
  BasicDetailsData,
  DocumentVerificationData,
  AadhaarOtpData,
  PhotoAndLocationData
} from "@/lib/types"
import { AadhaarOtpForm, BasicDetailsForm, PhotoLocationForm } from "@/lib/signup-schemas"

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Verifying number", description: "Sign Up & Get Loan Offers in Minutes" },
  { id: 2, title: "Creating account", description: "Get Instant Financial Support You Can Rely On" },
  { id: 3, title: "Basic details", description: "Get Instant Financial Support You Can Rely On" },
  { id: 4, title: "Verifying documents", description: "Get Instant Financial Support You Can Rely On" },
  { id: 5, title: "Verifying documents", description: "Get Instant Financial Support You Can Rely On" },
  { id: 6, title: "Verifying documents", description: "Get Instant Financial Support You Can Rely On" },
]

export default function SignupForm() {
  const {
    currentStep,
    formData,
    isLoading,
    error,
    setCurrentStep,
    updateFormData,
    submitStep,
  } = useSignup()

  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [otpResendTimer, setOtpResendTimer] = useState<number>(0)
  const [aadhaarOtpSent, setAadhaarOtpSent] = useState<boolean>(false)
  const [aadhaarOtpResendTimer, setAadhaarOtpResendTimer] = useState<number>(0)
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false)

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = (): void => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePhoneSubmit = async (data: PhoneVerificationData): Promise<void> => {
    updateFormData('phoneVerification', data)
    const success = await submitStep(1, data)
    if (success) {
      setOtpSent(true)
      setOtpResendTimer(30)
      startTimer(setOtpResendTimer)
    }
  }

  const handleOtpVerify = async (data: PhoneVerificationData): Promise<void> => {
    updateFormData('phoneVerification', data)
    const success = await submitStep(1, data)
    if (success) {
      handleNext()
    }
  }

  const handlePersonalDetailsSubmit = async (data: PersonalDetailsData): Promise<void> => {
    updateFormData('personalDetails', data)
    const success = await submitStep(2, data)
    if (success) {
      handleNext()
    }
  }

  const router = useRouter();

  const handleGoToDashboard = (): void => {
    router.push('/profile')
  }

  const handleBasicDetailsSubmit = async (data: BasicDetailsForm): Promise<void> => {
    updateFormData('basicDetails', data)
    const success = await submitStep(3, data)
    if (success) {
      handleNext()
    }
  }

  const handleDocumentVerificationSubmit = async (data: DocumentVerificationData): Promise<void> => {
    updateFormData('documentVerification', data)
    const success = await submitStep(4, data)
    if (success) {
      setAadhaarOtpSent(true)
      setAadhaarOtpResendTimer(30)
      startTimer(setAadhaarOtpResendTimer)
      handleNext()
    }
  }

  const handleAadhaarOtpSubmit = async (data: AadhaarOtpForm): Promise<void> => {
    updateFormData('aadhaarOtp', data)
    const success = await submitStep(5, data)
    if (success) {
      handleNext()
    }
  }

  const handlePhotoLocationSubmit = async (data: PhotoLocationForm): Promise<void> => {
    updateFormData('photoAndLocationSchema', data)
    const success = await submitStep(6, data)
    if (success) {
      setApplicationSubmitted(true)
    }
  }

  const startTimer = (setter: React.Dispatch<React.SetStateAction<number>>): void => {
    const timer = setInterval(() => {
      setter(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resendOtp = (): void => {
    setOtpResendTimer(30)
    startTimer(setOtpResendTimer)
  }

  const resendAadhaarOtp = (): void => {
    setAadhaarOtpResendTimer(30)
    startTimer(setAadhaarOtpResendTimer)
  }

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen w-full max-w-7xl bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Panel - Branding */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Logo */}
              <div className="mb-8">
                <Link href="/" className="flex items-center">
                  <Image src="/lin-logo.png" alt="Logo" width={120} height={40} />
                </Link>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
                No paperwork. No waiting. Just quick approvals and easy access to instant funds, anytime, anywhere.
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">
                No paperwork. No waiting. Just quick approvals and easy access to instant funds, anytime, anywhere.
              </p>

              {/* Wallet Illustration */}
              <Image src="/signup-money.png" alt="Wallet Illustration" width={256} height={192} />
            </div>
          </div>

          {/* Right Panel - Success */}
          <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
            <div className="max-w-md mx-auto w-full text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Loan application submitted</h3>
              <p className="text-gray-600 mb-8">Our representative will contact you soon</p>

              {/* Action Button */}
              <Button
                onClick={() => window.location.href = '/'}
                className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium"
              >
                View dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full max-w-7xl bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Panel - Branding */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <Link href="/" className="flex items-center">
                <Image src="/lin-logo.png" alt="Logo" width={120} height={40} />
              </Link>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 leading-tight">
              {STEPS[currentStep - 1].description}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              No paperwork. No waiting. Just quick approvals and easy access to instant funds, anytime, anywhere.
            </p>

            {/* Wallet Illustration */}
            <Image src="/signup-money.png" alt="Wallet Illustration" width={256} height={192} />
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
          <div className="max-w-md mx-auto w-full">
            {/* Step Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-red-600">{STEPS[currentStep - 1].title}</h3>
                <span className="text-sm text-gray-600">{currentStep}/6</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Form Content */}
            <div className="space-y-6">
              {currentStep === 1 && (
                <Step1PhoneVerification
                  onSubmit={otpSent ? handleOtpVerify : handlePhoneSubmit}
                  otpSent={otpSent}
                  resendTimer={otpResendTimer}
                  onResend={resendOtp}
                  formData={formData.phoneVerification}
                  setFormData={(data) => updateFormData('phoneVerification', data)}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 2 && (
                <Step2PersonalDetails
                  onSubmit={handlePersonalDetailsSubmit}
                  onGoToDashboard={handleGoToDashboard}
                  formData={formData.personalDetails}
                  setFormData={(data) => updateFormData('personalDetails', data)}
                />
              )}

              {currentStep === 3 && (
                <Step3BasicDetails
                  onSubmit={handleBasicDetailsSubmit}
                  onBack={handlePrevious}
                  formData={formData.basicDetails}
                  setFormData={(data) => updateFormData('basicDetails', data)}
                  employmentType={formData.personalDetails.employmentType}
                />
              )}

              {currentStep === 4 && (
                <Step4DocumentVerification
                  onSubmit={handleDocumentVerificationSubmit}
                  formData={formData.documentVerification}
                  setFormData={(data) => updateFormData('documentVerification', data)}
                />
              )}

              {currentStep === 5 && (
                <Step5AadhaarOtp
                  onSubmit={handleAadhaarOtpSubmit}
                  onBack={handlePrevious}
                  otpSent={aadhaarOtpSent}
                  resendTimer={aadhaarOtpResendTimer}
                  onResend={resendAadhaarOtp}
                  formData={formData.aadhaarOtp}
                  setFormData={(data) => updateFormData('aadhaarOtp', data)}
                />
              )}

              {currentStep === 6 && (
                <Step6PhotoGPS
                  onSubmit={handlePhotoLocationSubmit}
                  onBack={handlePrevious}
                  formData={formData.photoAndLocationSchema}
                  setFormData={(data) => updateFormData('photoAndLocationSchema', data)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}