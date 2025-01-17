import axios from "axios";
import { origin } from "./config";



export const adminPostBoardCategoryData = async (data:any) =>{
    const newData = JSON.stringify(data)
    try {
        const response = await axios(
            {
                method: "POST",
                url:`${origin}/api/v1/admin/board-category`,
                headers :{
                    // Authorization:`Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                data: newData
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error:any) {
        return error
    }
}


export const fetchBoardCategoriesData = async () => {
    try {
      const response = await axios.get(`${origin}/api/v1/board-category/categories`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // Return response data
    } catch (error: any) {
      console.error("Error fetching board categories data:", error.message);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      }
      throw new Error("Failed to fetch board categories data. Please try again later.");
    }
  };

export const fetchBoardCategoriesPaginationsData = async (page:any, limit:any) => {
    try {
        const { data } = await axios.get(
            `${origin}/api/v1/board-category`,
            {
                params: { page, limit },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching Users pagination data:", error);
        throw error;
    }
};
