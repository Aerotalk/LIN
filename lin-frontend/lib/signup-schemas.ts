import { z } from "zod"

// Step 1: Phone verification
export const phoneVerificationSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  otp: z.string().optional()
})

// Phone number only schema (for initial submission)
export const phoneNumberSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number")
})

// OTP verification schema
export const otpVerificationSchema = z.object({
  phoneNumber: z.string(),
  otp: z.string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers")
})

// Step 2: Personal details
export const personalDetailsSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  middleName: z.string().default(""),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  dateOfBirth: z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const parsedDate = new Date(date.split('/').reverse().join('-'))
      const today = new Date()
      const age = today.getFullYear() - parsedDate.getFullYear()
      return age >= 18 && age <= 65
    }, "Age must be between 18 and 65 years"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender"
  })
})

// Step 3: Basic details
export const basicDetailsSchema = z.object({
  // Loan details
  loanAmount: z.number()
    .min(10000, "Minimum loan amount is ₹10,000")
    .max(5000000, "Maximum loan amount is ₹50,00,000"),
  purposeOfLoan: z.string()
    .min(5, "Please describe your loan purpose")
    .max(200, "Purpose description must be less than 200 characters"),
  
  // Employment details
  companyName: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  companyAddress: z.string()
    .min(10, "Company address must be at least 10 characters")
    .max(200, "Company address must be less than 200 characters"),
  monthlyIncome: z.number()
    .min(15000, "Minimum monthly income is ₹15,000")
    .max(1000000, "Maximum monthly income is ₹10,00,000"),
  jobStability: z.enum(["Less than 1 year", "1-2 years", "2-5 years", "More than 5 years"], {
    required_error: "Please select your job stability"
  }),
  
  // Address details
  currentAddress: z.string()
    .min(10, "Current address must be at least 10 characters")
    .max(200, "Current address must be less than 200 characters"),
  currentAddressType: z.enum(["Owned", "Rented", "Company Provided", "Family Owned"], {
    required_error: "Please select address type"
  }),
  permanentAddress: z.string()
    .min(10, "Permanent address must be at least 10 characters")
    .max(200, "Permanent address must be less than 200 characters"),
  addressProof: z.enum([
    "Current Rent agreement",
    "Gas Bill",
    "Utility Bill", 
    "Electricity Bill",
    "WiFi Bill"
  ], {
    required_error: "Please select address proof type"
  })
})

// Step 4: Document verification
export const documentVerificationSchema = z.object({
  // Salary details
  payslipFile: z.instanceof(File, "Please upload your payslip")
    .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB")
    .refine((file) => file.type === "application/pdf", "Only PDF files are allowed"),
  bankStatementFile: z.instanceof(File, "Please upload your bank statement")
    .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB")
    .refine((file) => file.type === "application/pdf", "Only PDF files are allowed"),
  
  // Documents
  panNumber: z.string()
    .length(10, "PAN number must be exactly 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid PAN number"),
  aadhaarNumber: z.string()
    .length(12, "Aadhaar number must be exactly 12 digits")
    .regex(/^\d{12}$/, "Aadhaar number must contain only numbers"),
  photoFile: z.instanceof(File, "Please upload your recent photo")
    .refine((file) => file.size <= 2 * 1024 * 1024, "File size must be less than 2MB")
    .refine((file) => file.type.startsWith("image/"), "Only image files are allowed"),
  autoDetectLocation: z.boolean(),
  location: z.string().default("")
})

// Step 5: Aadhaar OTP verification
export const aadhaarOtpSchema = z.object({
  aadhaarOtp: z.string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers")
})

// Combined schema for all steps
export const signupFormSchema = z.object({
  phoneVerification: phoneVerificationSchema,
  personalDetails: personalDetailsSchema,
  basicDetails: basicDetailsSchema,
  documentVerification: documentVerificationSchema,
  aadhaarOtp: aadhaarOtpSchema
})

export type PhoneVerificationForm = z.infer<typeof phoneVerificationSchema>
export type PhoneNumberForm = z.infer<typeof phoneNumberSchema>
export type OtpVerificationForm = z.infer<typeof otpVerificationSchema>
export type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>
export type BasicDetailsForm = z.infer<typeof basicDetailsSchema>
export type DocumentVerificationForm = z.infer<typeof documentVerificationSchema>
export type AadhaarOtpForm = z.infer<typeof aadhaarOtpSchema>
export type SignupFormData = z.infer<typeof signupFormSchema>
