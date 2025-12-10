import axios from "axios";
import { origin } from "./config";


export const createProject = async (data: FormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/projects`, data, {
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


export const fetchProjectPagination = async (page: number, limit: number) => {

  try {
    const response = await axios.get(
      `${origin}/api/v1/projects/pagination?page=${page}&limit=${limit}`,
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

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/projects`, {
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

export const updateProject = async (id: string, data: FormData) => {
  try {
    const response = await axios.put(`${origin}/api/v1/projects/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Project update failed:", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const response = await axios.delete(`${origin}/api/v1/projects/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Project deletion failed:", error);
    throw error;
  }
};

