"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ShieldCheck, UserPlus, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAffiliate } from "@/hooks/useAffiliate"

const adminSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type AdminForm = z.infer<typeof adminSchema>

export default function RegisterUserPage() {
    const { getLinkWithRef } = useAffiliate()
    const [isAdminVerified, setIsAdminVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<AdminForm>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleAdminSubmit = async (data: AdminForm) => {
        setIsLoading(true)
        setError(null)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (data.email === "admin@loaninneed.com" && data.password === "admin123") {
            setIsAdminVerified(true)
            setIsLoading(false)
        } else {
            setError("Invalid admin credentials. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-red-50 via-white to-orange-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Left Panel - Branding */}
                <div className="flex flex-col justify-center p-8 lg:p-16">
                    <div className="max-w-md mx-auto">
                        <div className="mb-12">
                            <Link href={getLinkWithRef("/")}>
                                <Image src="/lin-logo.png" alt="Loan In Need" width={120} height={40} />
                            </Link>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {isAdminVerified ? "User Registration" : "Admin Verification"}
                        </h1>
                        <p className="text-gray-600 mb-8">
                            {isAdminVerified
                                ? "You have been verified as an admin. You can now register new users in the system."
                                : "This area is restricted. Please verify your identity as an administrator to proceed with user registration."}
                        </p>

                        <div className="flex justify-start">
                            <Image
                                src="/login-money.png"
                                alt="Branding illustration"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Panel - Content */}
                <div className="bg-white flex flex-col justify-center p-8 lg:p-16 border-l border-gray-100">
                    <div className="max-w-md mx-auto w-full">
                        {!isAdminVerified ? (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <ShieldCheck className="text-red-600" /> Admin <span className="text-red-600">Login</span>
                                    </h2>
                                    <p className="text-gray-600 text-sm italic">Use admin credentials to unlock registration</p>
                                </div>

                                <form onSubmit={form.handleSubmit(handleAdminSubmit)} className="space-y-5">
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                            <AlertCircle className="text-red-600 w-5 h-5" />
                                            <p className="text-red-600 text-sm font-medium">{error}</p>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Admin Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...form.register("email")}
                                            className="h-12 border-gray-200 focus:ring-red-500 rounded-xl"
                                        />
                                        {form.formState.errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...form.register("password")}
                                            className="h-12 border-gray-200 focus:ring-red-500 rounded-xl"
                                        />
                                        {form.formState.errors.password && (
                                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                        ) : (
                                            "Verify Admin Account"
                                        )}
                                    </Button>

                                    <p className="text-center text-xs text-gray-400 mt-4">
                                        Restricted Access — Authorized Personnel Only
                                    </p>
                                </form>
                            </div>
                        ) : (
                            <div className="text-center space-y-6 py-10">
                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <UserPlus className="w-10 h-10 text-orange-600 animate-pulse" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">User Registration</h2>
                                    <div className="inline-flex items-center px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-bold border border-orange-100 mb-6">
                                        COMING SOON
                                    </div>
                                    <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                                        The user registration module for admins is currently under development. Soon you will be able to onboard new users, verify identities, and manage permissions from this panel.
                                    </p>
                                </div>
                                <div className="pt-8">
                                    <Button
                                        onClick={() => setIsAdminVerified(false)}
                                        variant="outline"
                                        className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                                    >
                                        Logout Admin session
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
