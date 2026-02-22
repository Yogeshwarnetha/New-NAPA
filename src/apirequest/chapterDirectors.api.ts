import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

export interface ChapterDirector {
  id: number;
  name: string;
  imageUrl: string;
  is_deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PaginatedResponse {
  data: ChapterDirector[];
  page: number;
  limit: number;
  count: number;
  noOfPages: number;
}


export const createChapterDirector = async (
  data: FormData
): Promise<ChapterDirector> => {
  try {
    const response = await axios.post(
      `${origin}/api/v1/chapter-directors`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    toast.success("Chapter Director created successfully!");
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Creation failed");
    throw error;
  }
};


export const fetchChapterDirectorsPagination = async (
  page: number,
  limit: number
): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get(
      `${origin}/api/v1/chapter-directors/pagination?page=${page}&limit=${limit}`
    );

    return {
      ...response.data,
      data: response.data.data.map((item: any) => ({
        ...item,
        id: Number(item.id),
      })),
    };
  } catch (error: any) {
    toast.error("Failed to fetch chapter directors");
    throw error;
  }
};

export const fetchChapterDirectors = async (): Promise<ChapterDirector[]> => {
  try {
    const response = await axios.get(
      `${origin}/api/v1/chapter-directors`
    );

    return response.data.data.map((item: any) => ({
      ...item,
      id: Number(item.id),
    }));
  } catch (error: any) {
    toast.error("Failed to fetch chapter directors");
    throw error;
  }
};


export const updateChapterDirector = async (
  id: number,
  data: FormData
): Promise<ChapterDirector> => {
  try {
    const response = await axios.put(
      `${origin}/api/v1/chapter-directors/${id}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    toast.success("Chapter Director updated successfully!");
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Update failed");
    throw error;
  }
};


export const deleteChapterDirector = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${origin}/api/v1/chapter-directors/${id}`);
    toast.success("Chapter Director deleted successfully!");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Delete failed");
    throw error;
  }
};
