import axios from "axios";
import { origin } from "./config";

export const createBanner = async (data: FormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/banner`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Banner creation failed:", error);
    throw error;
  }
};


export const fetchBannerPagination = async (page: number, limit: number) => {
  
  try {
      const response = await axios.get(
          `${origin}/api/v1/banner/pagination?page=${page}&limit=${limit}`,
          {
              headers: {
                  // Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          }
      );
      return response.data;
  } catch (err: any) {
      console.error("Error fetching paginated Banner:", err.message);
      throw err;
  }
};

export const fetchBannerData = async () => {
  
  try {
      const response = await axios.get(
          `${origin}/api/v1/banner`,
          {
              headers: {
                  // Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          }
      );
      return response.data;
  } catch (err: any) {
      console.error("Error fetching banner:", err.message);
      throw err;
  }
};