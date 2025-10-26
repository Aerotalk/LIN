"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { z } from "zod"

const loginSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  otp: z.string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers")
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false)
  const [otpResendTimer, setOtpResendTimer] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phoneNumber: "", otp: "" }
  })

  const phoneNumber = watch("phoneNumber")

  const handlePhoneSubmit = (data: LoginForm) => {
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

  const handleOtpSubmit = (data: LoginForm) => {
    setIsLoggedIn(true)
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

  const handleOtpChange = (value: string) => {
    setValue("otp", value)
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Successful!</h2>
          <p className="text-gray-600 mb-6">Welcome back to LOAN IN MINUTES</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-red-600 text-white px-6 py-4">
              <h1 className="text-lg font-semibold">Login</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Left Panel */}
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-red-600 mb-4">LOAN IN MINUTES</h1>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Welcome Back! Access Your Loan Dashboard
                  </h2>
                  <div className="w-64 h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <div className="text-6xl">💰</div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Form */}
              <div className="space-y-6">
                <form onSubmit={handleSubmit(otpSent ? handleOtpSubmit : handlePhoneSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    {!otpSent ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your mobile number
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                              +91
                            </span>
                            <Input
                              {...register("phoneNumber")}
                              type="tel"
                              placeholder="Enter your mobile number"
                              className="rounded-l-none"
                              maxLength={10}
                            />
                          </div>
                          {errors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                          )}
                        </div>

                        <p className="text-sm text-gray-600">
                          No paperwork. No waiting. Just quick approvals and easy access to instant funds, anytime, anywhere.
                        </p>

                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                          Get OTP
                        </Button>

                        <div className="text-center">
                          <a href="/signup" className="text-red-600 hover:underline text-sm">
                            New user? Sign Up
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">
                            OTP sent on XXXXXXX{phoneNumber?.slice(-4)}
                          </p>
                          {otpResendTimer > 0 ? (
                            <p className="text-sm text-gray-500">
                              Resend OTP in {otpResendTimer} sec
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={resendOtp}
                              className="text-red-600 hover:underline text-sm"
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter OTP
                          </label>
                          <InputOTP
                            maxLength={6}
                            onChange={handleOtpChange}
                            className="justify-center"
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                          {errors.otp && (
                            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                          )}
                        </div>

                        <p className="text-sm text-gray-600">
                          No paperwork. No waiting. Just quick approvals and easy access to instant funds, anytime, anywhere.
                        </p>

                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                          Login
                        </Button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
