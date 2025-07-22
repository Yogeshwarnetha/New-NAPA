import axios from "axios";
import { origin } from "./config";
import Cookies from "js-cookie";

// Function to handle Admin signup
export const signupAdmin = async (data: any) => {
  const reqData = JSON.stringify(data);
  try {
    const response = await axios({
      url: `${origin}/api/v1/admin/create`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: reqData,
    });

    const responseData = response?.data;

    if (responseData?.token) {
      const isProduction = process.env.NODE_ENV === "production";
      // Store both token and email for new signups
      Cookies.set("adminAuthToken", responseData.token, {
        expires: 1,
        secure: isProduction,
        sameSite: 'strict'
      });
      Cookies.set("adminEmail", data.email, {
        expires: 1,
        secure: isProduction,
        sameSite: 'strict'
      });
    }

    return responseData;
  } catch (err: any) {
    console.error("Admin Signup API call error:", err?.message);
    throw err;
  }
};

export const loginAdmin = async (data: {
  email: string;
  password: string;
  totpToken?: string;
  emailOtp?: string;
}) => {
  const payload: any = {
    email: data.email,
    password: data.password,
  };

  if (data.totpToken) {
    payload.totpToken = data.totpToken;
  }

  if (data.emailOtp) {
    payload.emailOtp = data.emailOtp;
  }

  try {
    const response = await axios({
      url: `${origin}/api/v1/admin/login`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    });

    return response.data;

  } catch (err: any) {
    console.error("Admin Login API call error:", err?.response?.data || err?.message);
    throw err;
  }
};

export const resendEmailOtp = async (email: string) => {
  try {
    const response = await axios.post(`${origin}/api/v1/admin/resend-otp`, { email });
    return response.data;
  } catch (error: any) {
    console.error("Resend OTP error:", error.response?.data || error.message);
    throw error;
  }
};

export const enable2FA = async (email: string) => {
  try {
    const response = await axios.post(`${origin}/api/v1/admin/enable-2fa`, {
      email: email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Enable 2FA error:", error.response?.data || error.message);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${origin}/api/v1/admin/forgot-password`, { email });
    return response.data;
  } catch (error: any) {
    console.error("Forgot Password error:", error.response?.data || error.message);
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(`${origin}/api/v1/admin/reset-password`, { token, newPassword });
    return response.data;
  } catch (error: any) {
    console.error("Reset Password error:", error.response?.data || error.message);
    throw error;
  }
};

export const changePassword = async (currentPassword: string, newPassword: string, token: string) => {
  try {
    const response = await axios.post(`${origin}/api/v1/admin/change-password`, {
      currentPassword,
      newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Change Password error:", error.response?.data || error.message);
    throw error;
  }
};
