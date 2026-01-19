import {
  RegisterRequest,
  LoginRequest,
  LoginResponseData,
  RegisterResponse,
  ErrorResponse,
} from "@/lib/types/auth";

// API configuration - can be set via environment variables
let API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

// Function to set API base URL dynamically
export const setApiBaseUrl = (url: string) => {
  API_BASE_URL = url;
};

// Function to get current API base URL
export const getApiBaseUrl = () => {
  return API_BASE_URL;
};

/**
 * Register a new student account
 * @param payload Registration request data
 * @returns Promise with registration response
 */
export const register = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred during registration");
  }
};

/**
 * Login with student credentials
 * @param payload Login request data
 * @returns Promise with login response containing student data
 */
export const login = async (payload: LoginRequest): Promise<LoginResponseData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred during login");
  }
};
