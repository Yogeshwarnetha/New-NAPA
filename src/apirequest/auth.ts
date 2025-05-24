import axios from "axios";
import { origin } from "./config";
import Cookies from "js-cookie";

// Function to handle user signup
export const signupUser = async (data: any) => {
  const reqData = JSON.stringify(data);
  try {
    const response = await axios({
      url: `${origin}/api/v1/auth/signup`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: reqData,
    });

    const responseData = response?.data;

    // Store token in cookies after successful signup
    if (responseData?.token) {
      Cookies.set("authToken", responseData.token, { expires: 1 }); // Token expires in 1 day
    }

    return responseData;
  } catch (err: any) {
    console.error("Signup API call error:", err?.message);
    throw err;
  }
};


export const OTPEmailVerification = async (email: string, otp: string) => {
  try {
    const response = await axios({
      url: `${origin}/api/v1/auth/verify-email`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        otp
      }, // Directly pass the object - axios will handle JSON.stringify
    });

    return response.data;
  } catch (err: any) {
    console.error("Email Verification API error:", err?.response?.data || err?.message);

    // Create a proper error object to throw
    const error = new Error(err.response?.data?.message || "Verification failed");
    (error as any).response = err.response; // Attach response if available
    throw error;
  }
};

export const resendOTPEmailVerification = async (email: string): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    const response = await axios.post(
      `${origin}/api/v1/auth/resend-verification`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds timeout
      }
    );

    if (!response.data) {
      throw new Error("No response data received");
    }

    return {
      success: true,
      message: response.data.message || "Verification code resent successfully"
    };

  } catch (err: unknown) {
    // Type-safe error handling
    let errorMessage = "Failed to resend verification code";

    if (axios.isAxiosError(err)) {
      // Handle Axios-specific errors
      errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Network error occurred";

      console.error("Resend OTP API error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
    } else if (err instanceof Error) {
      // Handle generic errors
      errorMessage = err.message;
      console.error("Resend OTP error:", err);
    }

    return {
      success: false,
      message: errorMessage
    };
  }
};

// Function to handle user login
export const loginUser = async (data: any) => {
  const reqData = JSON.stringify(data);
  try {
    const response = await axios({
      url: `${origin}/api/v1/auth/login`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: reqData,
    });

    const responseData = response?.data;

    // Store token in cookies after successful login
    if (responseData?.token) {
      Cookies.set("authToken", responseData.token, { expires: 1 }); // Token expires in 1 day
    }

    return responseData;
  } catch (err: any) {
    console.error("Login API call error:", err?.message);
    throw err;
  }
};
