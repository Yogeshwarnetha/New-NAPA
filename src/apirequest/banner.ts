import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

interface Banner {
  id: string;
  heading: string;
  description: string;
  images: string[];
  is_deleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const createBanner = async (data: FormData): Promise<Banner> => {
  try {
    const response = await axios.post(`${origin}/api/v1/banner`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Banner created successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Banner creation failed:", error);
    toast.error(`Failed to create banner: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const updateBanner = async (id: string, data: FormData): Promise<Banner> => {
  try {
    const response = await axios.put(`${origin}/api/v1/banner/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Banner updated successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Banner update failed:", error);
    toast.error(`Failed to update banner: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchBannerPagination = async (
  page: number,
  limit: number
): Promise<{
  data: Banner[];
  count: number;
  page: number;
  limit: number;
  noOfPages: number;
}> => {
  try {
    const response = await axios.get(
      `${origin}/api/v1/banner/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching paginated banners:", error);
    toast.error(`Failed to fetch banners: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchBannerData = async (): Promise<Banner[]> => {
  try {
    const response = await axios.get(`${origin}/api/v1/banner`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching banners:", error);
    toast.error(`Failed to fetch banners: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const deleteBanner = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${origin}/api/v1/banner/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Banner deleted successfully!");
  } catch (error: any) {
    console.error("Error deleting banner:", error);
    toast.error(`Failed to delete banner: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};