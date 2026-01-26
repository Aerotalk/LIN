import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { SignupFormData } from '@/lib/signup-schemas';

interface UseSignupReturn {
  currentStep: number;
  formData: SignupFormData;
  isLoading: boolean;
  error: string | null;
  setCurrentStep: (step: number) => void;
  updateFormData: (step: keyof SignupFormData, data: any) => void;
  submitStep: (step: number, data: any) => Promise<boolean>;
  resetForm: () => void;
}

const initialFormData: SignupFormData = {
  phoneVerification: { phoneNumber: "", otp: "" as string | undefined },
  personalDetails: {
    firstName: "", middleName: "", lastName: "", dateOfBirth: "", gender: "" as "Male" | "Female" | "Prefer not to say",
    panNumber: "", panImage: undefined, employmentType: "Salaried"
  },
  basicDetails: {
    loanAmount: 0, purposeOfLoan: "",
    companyName: "", professionName: "",
    companyAddress: "", monthlyIncome: 0,
    jobStability: "" as "Very unstable" | "Somewhat unstable" | "Neutral / moderate" | "Stable" | "Very stable",
    currentAddress: "", currentAddressType: "" as "Owner(Self or Family)" | "Rented",
    permanentAddress: "", addressProof: undefined, pinCode: ""
  },
  documentVerification: {
    payslipFile: new File([], ""), bankStatementFile: new File([], ""),
    panNumber: "", aadhaarNumber: ""
  },
  aadhaarOtp: { aadhaarOtp: "" },
  photoAndLocationSchema: { photoFile: new File([], ""), autoDetectLocation: false, location: "" }
};

export function useSignup(): UseSignupReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = useCallback((step: keyof SignupFormData, data: any) => {
    setFormData(prev => ({ ...prev, [step]: data }));
  }, []);

  const submitStep = useCallback(async (step: number, data: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      switch (step) {
        case 1:
          if (!data.otp) {
            // Request OTP
            await apiClient.requestPhoneOtp(data.phoneNumber);
            return true;
          } else {
            // Verify OTP
            const response = await apiClient.verifyPhoneOtp(data.phoneNumber, data.otp);
            if (response.token) {
              apiClient.setToken(response.token);
            }
            return true;
          }

        case 2:
          // Register user with personal details
          const name = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`.trim();
          await apiClient.registerUser({
            name,
            dob: data.dateOfBirth,
            gender: data.gender,
            email: "user@example.com", // Dummy email
            password: "Password@123",  // Dummy password
          });
          return true;

        case 3:
          // Submit KYC details
          await apiClient.submitKYC({
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            monthlyIncome: data.monthlyIncome,
            stability: data.jobStability,
            currentAddress: data.currentAddress,
            currentAddressType: data.currentAddressType,
            permanentAddress: data.permanentAddress,
            currentPostalCode: data.pinCode,
            loanAmount: data.loanAmount,
            purpose: data.purposeOfLoan,
          });
          return true;

        case 4:
          // Submit documents (salary slips and bank statements)
          // Note: Selfie is submitted separately in step 6
          const documentFormData = new FormData();
          
          // Backend expects arrays, so append files correctly
          if (data.payslipFile && data.payslipFile instanceof File) {
            documentFormData.append('salarySlips', data.payslipFile);
          }
          if (data.bankStatementFile && data.bankStatementFile instanceof File) {
            documentFormData.append('bankStatements', data.bankStatementFile);
          }
          
          // Note: PAN and Aadhaar numbers are not sent in document submission
          // They should be handled separately if needed

          await apiClient.submitDocuments(documentFormData);
          return true;

        case 5:
          // Verify Aadhaar OTP
          await apiClient.verifyAadhaarOtp(formData.documentVerification.aadhaarNumber, data.aadhaarOtp);
          return true;

        case 6:
          // Submit selfie and location data
          // First, upload selfie if available
          if (data.photoFile && data.photoFile instanceof File) {
            await apiClient.uploadSelfie(data.photoFile);
          }

          // Then submit location data if auto-detected
          if (data.autoDetectLocation && data.location) {
            // Parse location from string format "latitude, longitude"
            const [latitude, longitude] = data.location.split(',').map(coord => parseFloat(coord.trim()));
            
            if (!isNaN(latitude) && !isNaN(longitude)) {
              await apiClient.submitLocation({
                latitude,
                longitude,
                placeName: data.location,
              });
            }
          }
          return true;

        default:
          return false;
      }
    } catch (err: any) {
      if (err.message?.toLowerCase().includes('exist') || err.message?.toLowerCase().includes('conflict')) {
        setError('User is already present, please login');
      } else {
        setError(err.message || 'An error occurred');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formData.documentVerification.aadhaarNumber]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    currentStep,
    formData,
    isLoading,
    error,
    setCurrentStep,
    updateFormData,
    submitStep,
    resetForm,
  };
}
