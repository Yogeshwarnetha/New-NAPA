import axios from "axios";
import { origin } from "./config";


export const createContactus = async (data:any) => {
    try {
      const response = await axios.post(`${origin}/api/v1/contact`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Event creation failed:", error);
      throw error;
    }
  };
