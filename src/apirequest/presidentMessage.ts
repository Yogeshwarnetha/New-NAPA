import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

export interface PresidentMessage {
    id: number;
    president_name: string;
    president_period: string;
    president_description1: string;
    president_description2: string;
    president_description3: string;
    image_url: string;
}

export const fetchPresidentMessage = async (): Promise<PresidentMessage> => {
    try {
        const res = await axios.get(`${origin}/api/v1/leadership-president-message`);
        return res.data.data;
    } catch (error: any) {
        toast.error(`Failed to fetch content: ${error.response?.data?.message || error.message}`);
        throw error;
    }
};

export const updatePresidentMessage = async (data: FormData): Promise<PresidentMessage> => {
    try {
        const res = await axios.put(`${origin}/api/v1/leadership-president-message`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("President message updated successfully!");
        return res.data.data;
    } catch (error: any) {
        toast.error(`Failed to update content: ${error.response?.data?.message || error.message}`);
        throw error;
    }
};
