import axios from "axios";
import { origin } from "./config";  // Replace with the actual origin
import Cookies from "js-cookie";

// Function to handle Admin signup
export const signupAdmin = async (data: any) => {
  const reqData = JSON.stringify(data);  // Serialize the request data
  try {
    const response = await axios({
      url: `${origin}/api/v1/admin/create`,  // Assuming this is your admin signup endpoint
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: reqData,
    });

    const responseData = response?.data;

    // Store token in cookies after successful signup
    if (responseData?.token) {
      Cookies.set("adminAuthToken", responseData.token, { expires: 1 });  // Token expires in 1 day
    }

    return responseData;
  } catch (err: any) {
    console.error("Admin Signup API call error:", err?.message);
    throw err;
  }
};

// Function to handle Admin login
export const loginAdmin = async (data: any) => {
  const reqData = JSON.stringify(data);  // Serialize the request data
  try {
    const response = await axios({
      url: `${origin}/api/v1/admin/login`,  // Assuming this is your admin login endpoint
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: reqData,
    });

    const responseData = response?.data;

    // Store token in cookies after successful login
    if (responseData?.token) {
      Cookies.set("adminAuthToken", responseData.token, { expires: 1 });  // Token expires in 1 day
    }

    return responseData;
  } catch (err: any) {
    console.error("Admin Login API call error:", err?.message);
    throw err;
  }
};
