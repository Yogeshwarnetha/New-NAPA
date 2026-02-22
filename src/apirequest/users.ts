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

export const updateUser = async (id: string, userData: any) => {
    try {
        const { data } = await axios.post(
            `${origin}/api/v1/users/update`,
            { id, ...userData },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id: string) => {
    try {
        const { data } = await axios.delete(
            `${origin}/api/v1/users/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
