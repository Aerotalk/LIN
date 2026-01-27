# Implementation Plan - Partner Login Integration

This plan outlines the steps to integrate the existing frontend Partner Login page with the backend Partner Login API.

## 1. Analysis & Compatibility Check

### Backend (`LoanInNeedServer`)
- **Route**: `POST /api/partners/login`
- **Controller**: `partnerController.loginPartner`
- **Service**: `partnerService.loginPartner(email, password)`
- **Expected Payload**: `{ "email": "...", "password": "..." }`
- **Response**: 
  ```json
  {
    "id": 1, 
    "name": "...", 
    "email": "...", 
    "partnerType": "DSA", // or BC, AFFILIATE
    "status": "PENDING", 
    "token": "JWT_TOKEN" 
  }
  ```

### Frontend (`LIN/lin-frontend`)
- **Page**: `app/(auth)/login-agent/page.tsx`
- **Current State**: Implements a multi-step form (Role Select -> Phone -> Mock OTP).
- **Mismatch**: The current frontend gathers `phoneNumber` and mock verifies `otp`. The backend requires `email` and `password`.

### Integration Strategy
We will modify the `login-agent` page to support the backend's authentication method (Email + Password) while keeping the Role Selection if needed (though backend determines role, the UI might keep it for context or we can remove it if redundant).
*   **Decision**: We will update the login form to ask for **Email & Password** after valid role selection (or simplify to just Email/Pass).
*   **Redirect**: Based on the `partnerType` returned from backend, redirect to the correct dashboard (`/dsa-dashboard`, `/affiliate-dashboard`, `/bc-dashboard`).

## 2. Implementation Steps

### Step 1: Update API Client (`lib/api.ts`)
- Ensure `loginPartner` method includes extensive `console.log` for debugging as requested.
- Verify headers and URL construction.

### Step 2: Revamp Login Page (`app/(auth)/login-agent/page.tsx`)
- **State**: Replace `phoneNumber` state with `email` and `password`.
- **Form**: Change the input fields to Email and Password types.
- **Logic**: 
  - Call `apiClient.loginPartner(email, password)` on submit.
  - On success, store the token/partner data.
  - Switch on `response.partnerType` to redirect to the correct route.
- **Role Selection**: We can keep the visuals, but technically the login is unified. We can auto-select the role based on backend response, or just use the login form directly. *Plan: Keep visual role selector for user context, but login is generic.*

### Step 3: Handle Redirects & Token Storage
- Store `partnerAuthToken` in `localStorage`.
- Store `partnerData` in `localStorage`.
- Implement `router.push('/[role]-dashboard')`.

### Step 4: Add Debugging (`console.log`)
- Add logs for: Form Submission, API Request Start, API Response Success/Error, Redirection logic.

## 3. Verification
- Verify successful login redirects to dashboard.
- Verify failed login shows error message.
- Verify `console.log` outputs for debugging.
