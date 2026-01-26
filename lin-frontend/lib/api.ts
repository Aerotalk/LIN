// API integration layer for backend communication
import { config } from './config';

const API_BASE_URL = config.apiUrl;

interface ApiResponse<T = unknown> {
  success?: boolean;
  message: string;
  data?: T;
  user?: T;
  token?: string;
  profile?: T;
  location?: T;
  applicationId?: string;
}

interface ApiError {
  message: string;
  status?: number;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    // Don't set Content-Type for FormData - browser will set it with boundary
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        // Try to parse error message from JSON response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Parse JSON response
      let data: ApiResponse<T>;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          // If response is not JSON, create a basic response object
          const text = await response.text();
          data = {
            message: text || 'Request completed successfully',
            success: true
          } as ApiResponse<T>;
        }
      } catch (parseError) {
        // If JSON parsing fails, create a basic response
        data = {
          message: 'Response received but could not be parsed',
          success: false
        } as ApiResponse<T>;
      }

      return data;
    } catch (error: any) {
      console.error('API request failed:', error);
      // If it's already an Error with message, re-throw it
      if (error instanceof Error) {
        throw error;
      }
      // Otherwise create a new error
      throw new Error(error.message || 'Network error occurred. Please check your connection.');
    }
  }

  // Auth endpoints
  async requestPhoneOtp(phone: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/auth/phone/request-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: phone.startsWith('+91') ? phone : `+91${phone}` }),
    });
  }

  async verifyPhoneOtp(phone: string, code: string): Promise<ApiResponse> {
    const response = await this.request<ApiResponse>('/api/auth/phone/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        phone: phone.startsWith('+91') ? phone : `+91${phone}`, 
        code 
      }),
    });

    // Store token for future requests
    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.token);
      }
    }

    return response;
  }

  // Login endpoints
  async loginUser(phone: string, dateOfBirth: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        phone: phone.startsWith('+91') ? phone : `+91${phone}`,
        dob: dateOfBirth
      }),
    });
  }

  async verifyLoginOtp(phone: string, code: string): Promise<ApiResponse> {
    const response = await this.request<ApiResponse>('/api/auth/phone/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        phone: phone.startsWith('+91') ? phone : `+91${phone}`, 
        code 
      }),
    });

    // Store token for future requests
    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.token);
      }
    }

    return response;
  }

  async registerUser(userData: {
    name: string;
    dob: string;
    gender: string;
    email: string;
    password: string;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Profile endpoints
  async getProfile(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/users/me', {
      method: 'GET',
    });
  }

  async getCompleteProfile(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/users/profile/complete', {
      method: 'GET',
    });
  }

  // KYC endpoints
  async submitKYC(kycData: {
    companyName: string;
    companyAddress: string;
    monthlyIncome: number;
    stability: string;
    currentAddress: string;
    currentAddressType: string;
    permanentAddress: string;
    currentCity?: string;
    currentState?: string;
    currentPostalCode?: string;
    loanAmount: number;
    purpose: string;
    status?: string;
    startDate?: string;
    interestRate?: number;
    termMonths?: number;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/kyc', {
      method: 'POST',
      body: JSON.stringify(kycData),
    });
  }

  // Document verification endpoints
  async submitDocuments(formData: FormData): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/document/submit', {
      method: 'POST',
      body: formData,
    });
  }

  async uploadDocument(type: string, file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request<ApiResponse>(`/api/document/upload/${type}`, {
      method: 'POST',
      body: formData,
    });
  }

  async getDocumentStatus(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/document/status', {
      method: 'GET',
    });
  }

  // Selfie endpoints
  async uploadSelfie(selfieFile: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('selfie', selfieFile);
    
    return this.request<ApiResponse>('/api/selfie/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async getSelfieStatus(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/selfie/status', {
      method: 'GET',
    });
  }

  // Location capture endpoint
  async submitLocation(locationData: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    locality?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    placeName?: string;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/users/location', {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
  }

  async getLocation(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/users/location', {
      method: 'GET',
    });
  }

  // Loan endpoints
  async applyForLoan(loanData: {
    loanAmount: number;
    purposeOfLoan: string;
    loanType?: string;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/loans/apply', {
      method: 'POST',
      body: JSON.stringify(loanData),
    });
  }

  // Aadhaar verification endpoints (if implemented in backend)
  async requestAadhaarOtp(aadhaarNumber: string): Promise<ApiResponse> {
    // Note: This endpoint may not exist in backend yet
    return this.request<ApiResponse>('/api/auth/aadhaar/request-otp', {
      method: 'POST',
      body: JSON.stringify({ aadhaarNumber }),
    });
  }

  async verifyAadhaarOtp(aadhaarNumber: string, otp: string): Promise<ApiResponse> {
    // Note: This endpoint may not exist in backend yet
    return this.request<ApiResponse>('/api/auth/aadhaar/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ aadhaarNumber, otp }),
    });
  }

  // PAN Verification (if implemented in backend)
  async verifyPan(panNumber: string): Promise<ApiResponse<any>> {
    // Note: This endpoint may not exist in backend yet
    return this.request<ApiResponse>('/api/verification/pan', {
      method: 'POST',
      body: JSON.stringify({ panNumber }),
    });
  }

  // Utility methods
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  getToken(): string | null {
    return this.token;
  }
}

// Create singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types
export type { ApiResponse, ApiError };
