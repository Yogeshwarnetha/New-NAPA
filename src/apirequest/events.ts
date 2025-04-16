import axios from "axios";
import { origin } from "./config";


export const createEvent = async (data: FormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/events`, data, {
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


export const fetchEventsPagination = async (page: number, limit: number) => {

  try {
    const response = await axios.get(
      `${origin}/api/v1/events/pagination?page=${page}&limit=${limit}`,
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


export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/events`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err: any) {
    console.error("Error fetching Events:", err.message);
    throw err;
  }
};

export const updateEvent = async (id: string, updateData: any) => {
  try {
    const response = await axios.post(
      `${origin}/api/v1/events/update`,
      { id, ...updateData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Event update failed:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(
      `${origin}/api/v1/events/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Event deletion failed:", error);
    throw error;
  }
};