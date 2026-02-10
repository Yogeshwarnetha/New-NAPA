import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

interface NewsItem {
  id: string;
  heading: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  images: string[];
  is_deleted: boolean;
}

export const createNews = async (data: FormData): Promise<NewsItem> => {
  try {
    const response = await axios.post(`${origin}/api/v1/news`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("News created successfully!");
    return response.data;
  } catch (error: any) {
    console.error("News creation failed:", error);
    toast.error(`Failed to create news: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchNewsPagination = async (
  page: number,
  limit: number
): Promise<{
  data: NewsItem[];
  count: number;
  page: number;
  limit: number;
  noOfPages: number;
}> => {
  try {
    const response = await axios.get(
      `${origin}/api/v1/news/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching paginated news:", error);
    toast.error(`Failed to fetch news: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchAllNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(`${origin}/api/v1/news`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching all news:", error);
    toast.error(`Failed to fetch news: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchNewsById = async (id: string): Promise<NewsItem> => {
  try {
    const response = await axios.get(`${origin}/api/v1/news/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching news by ID:", error);
    toast.error(`Failed to fetch news: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const updateNews = async (
  id: string,
  data: FormData
): Promise<NewsItem> => {
  try {
    const response = await axios.put(`${origin}/api/v1/news/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("News updated successfully!");
    return response.data;
  } catch (error: any) {
    console.error("News update failed:", error);
    toast.error(`Failed to update news: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const deleteNews = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${origin}/api/v1/news/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("News deleted successfully!");
  } catch (error: any) {
    console.error("News deletion failed:", error);
    toast.error(`Failed to delete news: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};