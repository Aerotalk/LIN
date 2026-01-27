"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ArrowLeft, Loader2, CheckCircle2, UserCircle2, Briefcase, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Suspense } from "react"

// Types & Schemas
type AgentRole = "affiliate" | "dsa" | "bc"

const phoneSchema = z.object({
    phoneNumber: z.string()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits")
        .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
})

const otpSchema = z.object({
    otp: z.string()
        .min(6, "OTP must be 6 digits")
        .max(6, "OTP must be 6 digits")
})

function AgentLoginForm() {
    const router = useRouter()
    const [step, setStep] = useState(1) // 1: Role, 2: Phone, 3: OTP, 4: Success
    const [role, setRole] = useState<AgentRole | null>(null)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isVerifying, setIsVerifying] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [otpValue, setOtpValue] = useState("")

    const phoneForm = useForm<{ phoneNumber: string }>({
        resolver: zodResolver(phoneSchema),
        defaultValues: { phoneNumber: "" }
    })

    const handleRoleSelect = (selectedRole: AgentRole) => {
        setRole(selectedRole)
        setStep(2)
    }

    const handlePhoneSubmit = (data: { phoneNumber: string }) => {
        setPhoneNumber(data.phoneNumber)
        setStep(3)
    }

    const handleOtpSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()

        if (otpValue.length !== 6) {
            setError("Please enter a 6-digit OTP")
            return
        }

        setIsVerifying(true)
        setError(null)

        // Simulate API call
        setTimeout(() => {
            if (otpValue === "261102") {
                setStep(4)
                // Redirect based on role
                setTimeout(() => {
                    switch (role) {
                        case "affiliate":
                            router.push("/affiliate-dashboard")
                            break
                        case "dsa":
                            router.push("/dsa-dashboard")
                            break
                        case "bc":
                            router.push("/bc-dashboard")
                            break
                    }
                }, 2000)
            } else {
                setError("Invalid OTP. Please try again.")
                setIsVerifying(false)
            }
        }, 1500)
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
            setError(null)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Left Panel - Branding */}
                <div className="flex flex-col justify-center p-8 lg:p-16">
                    <div className="max-w-md mx-auto">
                        {/* Logo */}
                        <div className="mb-12">
                            <Link href="/">
                                <Image src="/lin-logo.png" alt="Loan In Need" width={120} height={40} />
                            </Link>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Agent <span className="text-blue-600">Partner</span> Portal —<br />
                            Grow With Us
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 mb-12">
                            Join our network of professionals and help people get the financial support they need while building your own success story.
                        </p>

                        {/* Illustration */}
                        <div className="flex justify-start">
                            <Image
                                src="/login-money.png"
                                alt="Agent illustration"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="bg-white flex flex-col justify-center p-8 lg:p-16">
                    <div className="max-w-md mx-auto w-full">

                        {/* Step 1: Role Selection */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Welcome <span className="text-blue-600">Partner</span>
                                    </h2>
                                    <p className="text-gray-600 text-sm">Please select your partnership type</p>
                                </div>

                                <div className="grid gap-4">
                                    <button
                                        onClick={() => handleRoleSelect("affiliate")}
                                        className="flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                                    >
                                        <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                                            <Users className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold text-gray-900">Affiliate</p>
                                            <p className="text-sm text-gray-500">Earn through referrals</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleRoleSelect("dsa")}
                                        className="flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                                    >
                                        <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                            <Briefcase className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold text-gray-900">Direct Sales Agent</p>
                                            <p className="text-sm text-gray-500">Expert in loan processing</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleRoleSelect("bc")}
                                        className="flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                                    >
                                        <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                            <UserCircle2 className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold text-gray-900">Business Consultant</p>
                                            <p className="text-sm text-gray-500">Professional advisory</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Phone Number */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <button
                                    onClick={handleBack}
                                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    <span>Back to roles</span>
                                </button>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                                        {role === "dsa" ? "Direct Sales Agent" : role === "bc" ? "Business Consultant" : "Affiliate"} <span className="text-blue-600">Login</span>
                                    </h2>
                                    <p className="text-gray-600 text-sm">Enter your registered mobile number</p>
                                </div>

                                <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mobile Number
                                        </label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                +91
                                            </span>
                                            <Input
                                                {...phoneForm.register("phoneNumber")}
                                                type="tel"
                                                placeholder="0000000000"
                                                className="rounded-l-none h-12"
                                                maxLength={10}
                                            />
                                        </div>
                                        {phoneForm.formState.errors.phoneNumber && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {phoneForm.formState.errors.phoneNumber.message}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold"
                                    >
                                        Get OTP
                                    </Button>
                                </form>
                            </div>
                        )}

                        {/* Step 3: OTP Verification */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <button
                                    onClick={handleBack}
                                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    <span>Back</span>
                                </button>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        <span className="text-blue-600">Verify</span> mobile number
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-1">
                                        OTP sent to +91 {phoneNumber}
                                    </p>

                                </div>

                                <form onSubmit={handleOtpSubmit} className="space-y-6">
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p className="text-red-600 text-sm font-medium">{error}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-col items-center">
                                        <label className="w-full block text-sm font-medium text-gray-700 mb-3">
                                            Enter 6-digit OTP
                                        </label>
                                        <InputOTP
                                            maxLength={6}
                                            value={otpValue}
                                            onChange={(val) => {
                                                setOtpValue(val)
                                                if (error) setError(null)
                                            }}
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
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold"
                                        disabled={isVerifying}
                                    >
                                        {isVerifying ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Verifying...
                                            </>
                                        ) : (
                                            "Verify & Login"
                                        )}
                                    </Button>
                                </form>
                            </div>
                        )}

                        {/* Step 4: Success */}
                        {step === 4 && (
                            <div className="space-y-6 text-center animate-in zoom-in duration-500">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        <span className="text-green-600">Login</span> Successful
                                    </h2>
                                    <p className="text-gray-600 text-sm">Welcome back! Redirecting you to your dashboard...</p>
                                </div>

                                <div className="flex justify-center py-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
                                        <CheckCircle2 className="relative w-20 h-20 text-green-600 fill-green-50" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function AgentLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        }>
            <AgentLoginForm />
        </Suspense>
    )
}
