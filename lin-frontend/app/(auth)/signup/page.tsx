"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/ui/file-upload"
import { Progress } from "@/components/ui/progress"
import {
  phoneVerificationSchema,
  personalDetailsSchema,
  basicDetailsSchema,
  documentVerificationSchema,
  aadhaarOtpSchema,
  photoAndLocationSchema,
  type PhoneVerificationForm,
  type PersonalDetailsForm,
  type BasicDetailsForm,
  type DocumentVerificationForm,
  type AadhaarOtpForm,
  type PhotoLocationForm,
  SignupFormData
} from "@/lib/signup-schemas"
import { Step1PhoneVerification } from "@/components/signup/Step1PhoneVerification"
import { Step2PersonalDetails } from "@/components/signup/Step2PersonalDetails"
import { Step3BasicDetails } from "@/components/signup/Step3BasicDetails"
import { Step4DocumentVerification } from "@/components/signup/Step4DocumentVerification"
import { Step5AadhaarOtp } from "@/components/signup/Step5AadhaarOtp"
import { Step6PhotoGPS } from "@/components/signup/Step6PhotoGPS"
import Link from "next/link"
import Image from "next/image"

const STEPS = [
  { id: 1, title: "Verifying number", description: "Sign Up & Get Loan Offers in Minutes" },
  { id: 2, title: "Creating account", description: "Get Instant Financial Support You Can Rely On" },
  { id: 3, title: "Basic details", description: "Get Instant Financial Support You Can Rely On" },
  { id: 4, title: "Verifying documents", description: "Get Instant Financial Support You Can Rely On" },
  { id: 5, title: "Verifying documents", description: "Get Instant Financial Support You Can Rely On" },
  { id: 6, title: "Verifying documents", description: "Get Instant Financial Support You Can Rely On" },
]

export default function SignupForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [otpSent, setOtpSent] = useState(false)
  const [otpResendTimer, setOtpResendTimer] = useState(0)
  const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false)
  const [aadhaarOtpResendTimer, setAadhaarOtpResendTimer] = useState(0)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  // Form data state
  const [formData, setFormData] = useState<SignupFormData>({
    phoneVerification: { phoneNumber: "", otp: "" as string | undefined },
    personalDetails: { firstName: "", middleName: "", lastName: "", dateOfBirth: "", gender: "" as "Male" | "Female" | "Other" },
    basicDetails: {
      loanAmount: 0, purposeOfLoan: "", companyName: "", companyAddress: "",
      monthlyIncome: 0, jobStability: "" as "Less than 1 year" | "1-2 years" | "2-5 years" | "More than 5 years",
      currentAddress: "", currentAddressType: "" as "Owned" | "Rented" | "Company Provided" | "Family Owned",
      permanentAddress: "", addressProof: "" as "Current Rent agreement" | "Gas Bill" | "Utility Bill" | "Electricity Bill" | "WiFi Bill"
    },
    documentVerification: {
      payslipFile: new File([], ""), bankStatementFile: new File([], ""),
      panNumber: "", aadhaarNumber: ""
    },
    aadhaarOtp: { aadhaarOtp: "" },
    photoAndLocationSchema: { photoFile: new File([], ""), autoDetectLocation: false, location: "" }
  })

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePhoneSubmit = (data: PhoneVerificationForm) => {
    setFormData(prev => ({ ...prev, phoneVerification: data }))
    setOtpSent(true)
    setOtpResendTimer(30)

    // Start countdown timer
    const timer = setInterval(() => {
      setOtpResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleOtpVerify = (data: PhoneVerificationForm) => {
    setFormData(prev => ({ ...prev, phoneVerification: data }))
    handleNext()
  }

  const handlePersonalDetailsSubmit = (data: PersonalDetailsForm) => {
    setFormData(prev => ({ ...prev, personalDetails: data }))
    handleNext()
  }

  const handleGoToDashboard = () => {
    // Save the current form data and redirect to personal loan page
    // In a real app, you would save this to localStorage or send to backend
    localStorage.setItem('signupData', JSON.stringify(formData))
    window.location.href = '/personal-loan'
  }

  const handleBasicDetailsSubmit = (data: BasicDetailsForm) => {
    setFormData(prev => ({ ...prev, basicDetails: data }))
    handleNext()
  }

  const handleDocumentVerificationSubmit = (data: DocumentVerificationForm) => {
    setFormData(prev => ({ ...prev, documentVerification: data }))
    setAadhaarOtpSent(true)
    setAadhaarOtpResendTimer(30)

    // Start countdown timer
    const timer = setInterval(() => {
      setAadhaarOtpResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    handleNext()
  }

  const handleAadhaarOtpSubmit = (data: AadhaarOtpForm) => {
    setFormData(prev => ({ ...prev, aadhaarOtp: data }))
    handleNext()
  }

  const handlePhotoLocationSubmit = (data: PhotoLocationForm) => {
    setFormData(prev => ({ ...prev, photoAndLocationSchema: data }))
    setApplicationSubmitted(true)
  }

  const resendOtp = () => {
    setOtpResendTimer(30)
    const timer = setInterval(() => {
      setOtpResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resendAadhaarOtp = () => {
    setAadhaarOtpResendTimer(30)
    const timer = setInterval(() => {
      setAadhaarOtpResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
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

            {/* Form Content */}
            <div className="space-y-6">
              {currentStep === 1 && (
                <Step1PhoneVerification
                  onSubmit={otpSent ? handleOtpVerify : handlePhoneSubmit}
                  otpSent={otpSent}
                  resendTimer={otpResendTimer}
                  onResend={resendOtp}
                  formData={formData.phoneVerification}
                  setFormData={(data) => setFormData(prev => ({ ...prev, phoneVerification: data }))}
                />
              )}

              {currentStep === 2 && (
                <Step2PersonalDetails
                  onSubmit={handlePersonalDetailsSubmit}
                  onGoToDashboard={handleGoToDashboard}
                  formData={formData.personalDetails}
                  setFormData={(data) => setFormData(prev => ({ ...prev, personalDetails: data }))}
                />
              )}

              {currentStep === 3 && (
                <Step3BasicDetails
                  onSubmit={handleBasicDetailsSubmit}
                  onBack={handlePrevious}
                  formData={formData.basicDetails}
                  setFormData={(data) => setFormData(prev => ({ ...prev, basicDetails: data }))}
                />
              )}

              {currentStep === 4 && (
                <Step4DocumentVerification
                  onSubmit={handleDocumentVerificationSubmit}
                  formData={formData.documentVerification}
                  setFormData={(data) => setFormData(prev => ({ ...prev, documentVerification: data }))}
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
                  setFormData={(data) => setFormData(prev => ({ ...prev, aadhaarOtp: data }))}
                />
              )}

              {currentStep === 6 && (
                <Step6PhotoGPS
                  onSubmit={handlePhotoLocationSubmit}
                  onBack={handlePrevious}
                  formData={formData.photoAndLocationSchema}
                  setFormData={(data) => setFormData(prev => ({ ...prev, photoAndLocationSchema: data }))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
