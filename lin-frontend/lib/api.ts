// API integration layer for backend communication
import { config } from './config';

const API_BASE_URL = config.apiUrl;

export const DUMMY_USERS = [
  { phone: '9876543210', dob: '1990-01-01', displayDob: '01/01/1990', otp: '123456' },
  { phone: '9988776655', dob: '1995-05-15', displayDob: '15/05/1995', otp: '123456' },
  { phone: '9123456789', dob: '1988-10-20', displayDob: '20/10/1988', otp: '123456' },
  { phone: '9555555555', dob: '2000-10-10', displayDob: '10/10/2000', otp: '123456' },
  { phone: '9898989898', dob: '1992-12-25', displayDob: '25/12/1992', otp: '123456' }
];

interface ApiResponse<T = unknown> {
  success?: boolean;
  message: string;
  data?: T;
  user?: T;
  token?: string;
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
    const url = `${this.baseURL}`;

    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      body: JSON.stringify({
        path: endpoint,
        body: options.body ? JSON.parse(options.body as string) : undefined,
      }),
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async requestPhoneOtp(phone: string): Promise<ApiResponse> {
    // Check if user already exists (simulated check against dummy users)
    const dummy = DUMMY_USERS.find(u => u.phone === phone);
    if (dummy) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      throw new Error('User already exists, please login');
    }

    // Mock request for new test user
    if (phone === '9000000001') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        message: 'OTP sent successfully'
      };
    }

    return this.request('/api/auth/phone/request-otp', {
      body: JSON.stringify({ phone: `+91${phone}` }),
    });
  }

  async verifyPhoneOtp(phone: string, code: string): Promise<ApiResponse> {
    // Mock verify for test user
    if (phone === '9000000001' && code === '123456') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        message: 'Phone verified successfully',
        token: 'mock_signup_token_123'
      };
    }

    const response = await this.request('/api/auth/phone/verify-otp', {
      body: JSON.stringify({ phone: `+91${phone}`, code }),
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
    // Check for dummy user
    const dummy = DUMMY_USERS.find(u => u.phone === phone && u.dob === dateOfBirth);
    if (dummy) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      return {
        success: true,
        message: 'OTP sent successfully',
        data: { otpSent: true }
      };
    }

    try {
      return await this.request('/api/users/login', {
        body: JSON.stringify({
          phone: `+91${phone}`,
          dob: dateOfBirth
        }),
      });
    } catch (e) {
      // For testing purposes, if API call fails (network error), we assume user doesn't exist
      // This helps when testing without a backend running
      throw new Error('User does not exist');
    }
  }

  async verifyLoginOtp(phone: string, code: string): Promise<ApiResponse> {
    // Check for dummy user
    const dummy = DUMMY_USERS.find(u => u.phone === phone);
    if (dummy) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      if (code === dummy.otp) {
        const token = `dummy_token_${phone}_${Date.now()}`;
        this.setToken(token);
        return {
          success: true,
          message: 'Login successful',
          token: token,
          user: { name: 'Test User', phone: dummy.phone } as any
        };
      } else {
        throw new Error('OTP is wrong, please re-enter OTP');
      }
    }

    const response = await this.request('/api/auth/phone/verify-otp', {
      body: JSON.stringify({ phone: `+91${phone}`, code }),
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
    // Mock registration for test
    if (userData.email) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        message: 'User registered successfully',
        data: { id: 'mock_user_id' }
      };
    }

    return this.request('/api/users/register', {
      body: JSON.stringify(userData),
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
    // Mock KYC submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'KYC details submitted successfully'
    };
  }

  // Document verification endpoints
  async submitDocuments(formData: FormData): Promise<ApiResponse> {
    const url = '/api/upload-documents';

    const config: RequestInit = {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    };

    // Mock document upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      message: 'Documents uploaded successfully'
    };
  }



  // Aadhaar verification endpoints
  async requestAadhaarOtp(aadhaarNumber: string): Promise<ApiResponse> {
    return this.request('/api/auth/aadhaar/request-otp', {
      body: JSON.stringify({ aadhaarNumber }),
    });
  }

  async verifyAadhaarOtp(aadhaarNumber: string, otp: string): Promise<ApiResponse> {
    // Mock Aadhaar OTP verify
    if (otp === '123456') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        message: 'Aadhaar verified successfully'
      };
    }

    return this.request('/api/auth/aadhaar/verify-otp', {
      body: JSON.stringify({ aadhaarNumber, otp }),
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
    // Mock location submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Location saved successfully'
    };
  }

  // PAN Verification
  async verifyPan(panNumber: string): Promise<ApiResponse<any>> {
    // Mock check for dummy PAN
    if (panNumber === 'ABCDE1234F') {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
      return {
        success: true,
        message: 'PAN verified successfully',
        data: {
          firstName: 'Rahul',
          middleName: '',
          lastName: 'Sharma',
          dateOfBirth: '1990-01-01',
          gender: 'Male',
          panNumber: panNumber
        }
      };
    }

    return this.request('/api/verification/pan', {
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
