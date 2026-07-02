import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

export interface Announcement {
  id: string;
  text: string;
  link?: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const createAnnouncement = async (data: { text: string; link?: string; is_active?: boolean }): Promise<Announcement> => {
  try {
    const response = await axios.post(`${origin}/api/v1/announcements`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Announcement created successfully!");
    return response.data.data;
  } catch (error: any) {
    console.error("Announcement creation failed:", error);
    toast.error(`Failed to create announcement: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const updateAnnouncement = async (id: string, data: { text?: string; link?: string; is_active?: boolean }): Promise<Announcement> => {
  try {
    const response = await axios.put(`${origin}/api/v1/announcements/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Announcement updated successfully!");
    return response.data.data;
  } catch (error: any) {
    console.error("Announcement update failed:", error);
    toast.error(`Failed to update announcement: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchAnnouncementsPagination = async (
  page: number,
  limit: number
): Promise<{
  data: Announcement[];
  count: number;
  page: number;
  limit: number;
  noOfPages: number;
}> => {
  try {
    const response = await axios.get(
      `${origin}/api/v1/announcements/pagination?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching paginated announcements:", error);
    toast.error(`Failed to fetch announcements: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchAnnouncementData = async (): Promise<Announcement[]> => {
  try {
    const response = await axios.get(`${origin}/api/v1/announcements`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching announcements:", error);
    toast.error(`Failed to fetch announcements: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${origin}/api/v1/announcements/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Announcement deleted successfully!");
  } catch (error: any) {
    console.error("Error deleting announcement:", error);
    toast.error(`Failed to delete announcement: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};
