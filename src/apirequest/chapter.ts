import axios from "axios";
import { origin } from "./config";


export const createChapter = async (data: FormData) => {
    try {
      const response = await axios.post(`${origin}/api/v1/chapter`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("advisory-council creation failed:", error);
      throw error;
    }
  };


  export const fetchChaptersPagination = async (page: number, limit: number) => {
  
    try {
        const response = await axios.get(
            `${origin}/api/v1/chapter/pagination?page=${page}&limit=${limit}`,
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


   export const fetchChapters = async () => {
      try {
        const response = await axios.get(`${origin}/api/v1/chapter`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data.data; 
      } catch (err: any) {
        console.error("Error fetching Chapter Leads:", err.message);
        throw err;
      }
    };
  