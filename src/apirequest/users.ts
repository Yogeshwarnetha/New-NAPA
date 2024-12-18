import axios from "axios";
import { origin } from "./config";

export const fetchUsersPaginationsData = async (page:any, limit:any) => {
    try {
        const { data } = await axios.get(
            `${origin}/api/v1/users/pagination`,
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
