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
