
# GreenEarth API Documentation

## 1. Introduction

This document provides a comprehensive overview of the API endpoints required to support the GreenEarth application. It serves as the official contract between the frontend and backend teams.

**Base URL**: `/api`

### 1.1. Authentication

All protected endpoints must include a JWT in the `Authorization` header.

**Format**: `Authorization: Bearer <JWT_TOKEN>`

### 1.2. Error Responses

Error responses will follow a consistent format.

```json
{
  "error": "A clear, descriptive error message.",
  "code": 4xx_or_5xx_status_code
}
```

---

## 2. Authentication

Endpoints for user registration, login, and session management.

### **POST** `/auth/register`

Registers a new user.

**Request Body:**

```json
{
  "fullName": "Budi Santoso",
  "email": "budi.santoso@example.com",
  "password": "Password123!",
  "confirmPassword": "Password123!",
  "referral": "ALEXG25"
}
```

**Response 201 (Success):**

```json
{
  "message": "Registration successful. Please check your email for a verification code."
}
```

**Response 400 (Passwords do not match):**

```json
{
  "error": "Passwords do not match.",
  "code": 400
}
```

**Response 409 (Email already exists):**

```json
{
  "error": "An account with this email already exists.",
  "code": 409
}
```

### **POST** `/auth/verify-email`

Verifies a user's email address using an OTP sent after registration.

**Request Body:**

```json
{
  "email": "budi.santoso@example.com",
  "otp": "123456"
}
```

**Response 200 (Success):**

```json
{
  "message": "Email verified successfully."
}
```

**Response 400 (Invalid OTP):**

```json
{
  "error": "Invalid or expired OTP.",
  "code": 400
}
```

### **POST** `/auth/login`

Logs a user in.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Response 200 (Success, OTP Required):**

The backend should send a temporary token or session identifier if needed, and respond that OTP is the next step.

```json
{
  "otpRequired": true,
  "message": "Please enter the OTP sent to your email."
}
```

**Response 401 (Invalid Credentials):**

```json
{
  "error": "Invalid credentials.",
  "code": 401
}
```

### **POST** `/auth/verify-login-otp`

Verifies a user's identity for login using an OTP.

**Request Body:**

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response 200 (Success):**

The backend sets a secure, `HttpOnly` session cookie and returns the user object.

```json
{
  "message": "Login successful",
  "user": {
    "userId": "u_001",
    "name": "Alex Green",
    "email": "user@example.com",
    "avatarUrl": "/assets/avatars/alex-green.jpg",
    "balance": 137000,
    "points": 1370
  }
}
```

**Response 400 (Invalid OTP):**

```json
{
  "error": "Invalid or expired OTP.",
  "code": 400
}
```

### **POST** `/auth/resend-otp`

Resends an OTP for email verification or login.

**Request Body:**

```json
{
  "email": "user@example.com",
  "context": "register"
}
```

`context` can be `"register"` or `"login"`.

**Response 200 (Success):**

```json
{
  "message": "A new OTP has been sent."
}
```

### **POST** `/auth/forgot-password`

Initiates the password reset process.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response 200 (Success):**

Always return a success message to prevent email enumeration.

```json
{
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

### **GET** `/auth/oauth/google`

Redirects the user to the Google OAuth consent screen. The backend handles the entire OAuth flow, including the callback, session creation, and final redirect to the frontend.

### **POST** `/auth/logout`

Logs the user out and invalidates the session.

**Response 200 (Success):**

```json
{
  "success": true
}
```

---

## 3. User Profile

Endpoints for managing user data.

### **GET** `/user`

Retrieves the currently authenticated user's profile information.

**Authentication:** Required.

**Response 200 (Success):**

```json
{
  "userId": "u_001",
  "name": "Alex Green",
  "email": "user@example.com",
  "avatarUrl": "/assets/avatars/alex-green.jpg",
  "phone": "81234567890",
  "balance": 137000,
  "points": 1370,
  "address": {
    "province": "DKI JAKARTA",
    "city": "JAKARTA SELATAN",
    "subdistrict": "TEBET",
    "village": "TEBET TIMUR",
    "fullAddress": "Jl. Mawar No. 12, RT 05/RW 03"
  }
}
```

**Response 401 (Unauthorized):**

```json
{
  "error": "Not authenticated",
  "code": 401
}
```

### **PUT** `/user`

Updates the authenticated user's profile.

**Authentication:** Required.

**Request Body:**

```json
{
  "name": "Alex B. Green",
  "phone": "81298765432",
  "address": {
    "province": "DKI JAKARTA",
    "city": "JAKARTA SELATAN",
    "subdistrict": "TEBET",
    "village": "TEBET BARAT",
    "fullAddress": "Jl. Melati No. 15, RT 01/RW 02"
  }
}
```

**Response 200 (Success):**

```json
{
  "message": "Profile updated successfully."
}
```

**Response 400 (Bad Request):**

```json
{
  "error": "Invalid phone number format.",
  "code": 400
}
```

---

## 4. Wallet & Withdrawals

Endpoints for managing user balance and withdrawals.

### **POST** `/wallet/withdraw`

Initiates a withdrawal request from the user's balance.

**Authentication:** Required.

**Request Body:**

```json
{
  "amount": 50000,
  "method": "DANA",
  "accountNumber": "081234567890",
  "fullName": "Alex Green"
}
```

**Response 200 (Success):**

```json
{
  "withdrawId": "WD-1699887600000"
}
```

**Response 400 (Insufficient funds):**

```json
{
  "error": "Insufficient funds.",
  "code": 400
}
```

### **GET** `/wallet/withdraw/history`

Retrieves the user's withdrawal history.

**Authentication:** Required.

**Response 200 (Success):**

```json
[
  {
    "id": "WD-1699887600000",
    "date": "2023-11-13T15:00:00Z",
    "amount": 50000,
    "status": "Success",
    "method": "DANA"
  },
  {
    "id": "WD-1699712400000",
    "date": "2023-11-11T12:20:00Z",
    "amount": 25000,
    "status": "In Progress",
    "method": "GoPay"
  },
  {
    "id": "WD-1699540800000",
    "date": "2023-11-09T17:30:00Z",
    "amount": 100000,
    "status": "Failed",
    "method": "Bank Transfer"
  }
]
```

### **GET** `/wallet/withdraw/methods`

Retrieves the available payment methods for withdrawal.

**Response 200 (Success):**

```json
[
  { "name": "DANA", "logo": "/images/ewallet/dana.png" },
  { "name": "OVO", "logo": "/images/ewallet/ovo.png" },
  { "name": "GoPay", "logo": "/images/ewallet/gopay.png" },
  { "name": "ShopeePay", "logo": "/images/ewallet/shopeepay.png" },
  { "name": "Bank Transfer", "logo": "/images/ewallet/bank.png" }
]
```

### **GET** `/wallet/withdraw/:withdrawId`

Retrieves the details of a specific withdrawal.

**Authentication:** Required.

**Response 200 (Success):**

```json
{
  "id": "WD-1699887600000",
  "status": "Success",
  "amount": 50000,
  "fullName": "Alex Green",
  "accountNumber": "081234567890",
  "method": "DANA",
  "date": "2023-11-13T15:00:00Z",
  "updatedAt": "2023-11-13T15:05:00Z"
}
```

---

## 5. Sales & Pickups

Endpoints related to scheduling and viewing sales transactions.

### **POST** `/pickups`

Schedules a new pickup for recyclable items.

**Authentication:** Required.

**Request Body:**

```json
{
  "category": "Plastic Bottles",
  "estimatedWeightKg": 5,
  "photoUrl": "https://storage.googleapis.com/user-uploads/photo_123.jpg"
}
```

**Response 201 (Success):**

Returns the newly created trip ID.

```json
{
  "tripId": "trip_123"
}
```

### **GET** `/pickups/history`

Retrieves the user's sales history.

**Authentication:** Required.

**Response 200 (Success):**

```json
[
  { 
    "id": "TXN-20231102-001", 
    "date": "2023-11-02T11:00:00Z",
    "earnings": 25000, 
    "status": "Completed",
    "wasteType": "Plastic Bottles",
    "weight": 12.5,
    "pricePerKg": 2000,
    "driver": "Budi Santoso"
  },
  { 
    "id": "TXN-20231030-001", 
    "date": "2023-10-30T09:00:00Z",
    "earnings": 0, 
    "status": "Scheduled",
    "wasteType": "Aluminum Cans",
    "weight": 5.0,
    "pricePerKg": 10000,
    "driver": "Agus Wijaya"
  }
]
```

### **GET** `/pickups/:salesId`

Retrieves the details of a specific sales transaction.

**Authentication:** Required.

**Response 200 (Success):**

```json
{
  "transactionId": "TXN-20231102-001",
  "itemPhotoUrl": "https://picsum.photos/400/300",
  "category": "Plastic Bottles",
  "weight": 12.5,
  "pricePerKg": 2000,
  "pickupDate": "2023-11-02T11:00:00Z",
  "driver": {
    "name": "Budi Santoso",
    "vehicle": "Honda Vario",
    "plate": "B 1234 XYZ"
  }
}
```

---

## 6. Notifications

### **GET** `/notifications`

Fetches the user's notifications.

**Authentication:** Required.

**Response 200 (Success):**

```json
{
  "data": [
    {
      "id": "1",
      "title": "Double points on plastic bottles this week!",
      "body": "Recycle any plastic bottle and earn double the points.",
      "createdAt": "2024-08-15T10:30:00Z",
      "read": false,
      "href": "/promotions/double-points"
    },
    {
      "id": "2",
      "title": "Your weekly report is ready",
      "body": "You have recycled 5kg of materials this week. Great job!",
      "createdAt": "2024-08-14T09:00:00Z",
      "read": true,
      "href": "/profile/sales/history"
    }
  ],
  "totalUnread": 1
}
```

### **POST** `/notifications/mark-read`

Marks one or more notifications as read.

**Authentication:** Required.

**Request Body:**

```json
{
  "ids": ["1"]
}
```

**Response 200 (Success):**

```json
{
  "success": true,
  "updatedIds": ["1"]
}
```

### **POST** `/notifications/mark-all-read`

Marks all notifications as read.

**Authentication:** Required.

**Response 200 (Success):**

```json
{
  "success": true
}
```

---

## 7. Leaderboard

### **GET** `/leaderboard`

Fetches the leaderboard data.

**Query Parameters:**
- `period`: "this_week" | "this_month"

**Response 200 (Success):**

```json
[
  {
    "rank": 1,
    "userId": "u_123",
    "displayName": "Kiara",
    "avatarUrl": "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "points": 9800,
    "isCurrentUser": false
  },
  {
    "rank": 3,
    "userId": "u_001",
    "displayName": "Alex Green",
    "avatarUrl": "/assets/avatars/alex-green.jpg",
    "points": 9210,
    "isCurrentUser": true
  }
]
```
