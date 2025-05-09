import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

interface Chapter {
  id: number;  // Changed from string to number to match backend
  title: string;
  description: string;
  images: string[];
  chapterLeads: number[];
  is_deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PaginatedResponse {
  data: Chapter[];
  page: number;
  limit: number;
  count: number;
  noOfPages: number;
}

export const createChapter = async (data: FormData): Promise<Chapter> => {
  try {
    const response = await axios.post(`${origin}/api/v1/chapter`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Chapter created successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Chapter creation failed:", error);
    toast.error(`Failed to create chapter: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const updateChapter = async (id: number, data: FormData): Promise<Chapter> => {
  try {
    const response = await axios.put(`${origin}/api/v1/chapter/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Chapter updated successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Chapter update failed:", error);
    toast.error(`Failed to update chapter: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const deleteChapter = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${origin}/api/v1/chapter/${id}`);
    toast.success("Chapter deleted successfully!");
  } catch (error: any) {
    console.error("Chapter deletion failed:", error);
    toast.error(`Failed to delete chapter: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchChaptersPagination = async (
  page: number,
  limit: number
): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get(
      `${origin}/api/v1/chapter/pagination?page=${page}&limit=${limit}`
    );
    return {
      ...response.data,
      data: response.data.data.map((chapter: any) => ({
        ...chapter,
        id: Number(chapter.id)  // Convert string ID to number
      }))
    };
  } catch (error: any) {
    console.error("Error fetching paginated chapters:", error);
    toast.error(`Failed to fetch chapters: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchChapters = async (): Promise<Chapter[]> => {
  try {
    const response = await axios.get(`${origin}/api/v1/chapter`);
    return response.data.data.map((chapter: any) => ({
      ...chapter,
      id: Number(chapter.id)  // Convert string ID to number
    }));
  } catch (error: any) {
    console.error("Error fetching chapters:", error);
    toast.error(`Failed to fetch chapters: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};