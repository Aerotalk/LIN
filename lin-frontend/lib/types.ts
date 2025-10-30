export interface FAQItem {
  question: string;
  answer: string;
}

export interface CardData {
  iconImg: string;
  title: string;
  description: string;
}

// types/signup.ts

export interface PhoneVerificationData {
  phoneNumber: string;
  otp?: string;
}

export interface PersonalDetailsData {
  firstName: string; lastName: string; dateOfBirth: string; email: string; password: string; gender: "Male" | "Female" | "Prefer not to say"; middleName?: string | undefined;
}

export interface BasicDetailsData {
  panNumber: string;
  employmentType: 'salaried' | 'self-employed' | 'business' | 'unemployed';
  monthlyIncome: string;
  loanAmount: string;
  loanPurpose: string;
  residenceType: 'owned' | 'rented' | 'parental';
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface DocumentVerificationData {
  aadhaarNumber: string;
  aadhaarFrontImage?: File | string;
  aadhaarBackImage?: File | string;
}

export interface AadhaarOtpData {
  otp: string;
}

export interface PhotoAndLocationData {
  selfieImage?: File | string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

export interface FormData {
  phoneVerification: PhoneVerificationData;
  personalDetails: PersonalDetailsData;
  basicDetails: BasicDetailsData;
  documentVerification: DocumentVerificationData;
  aadhaarOtp: AadhaarOtpData;
  photoAndLocationSchema: PhotoAndLocationData;
}

export type FormDataKey = keyof FormData;