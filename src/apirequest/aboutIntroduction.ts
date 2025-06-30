import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

interface AboutIntroduction {
    id: number;
    introduction_heading: string;
    introduction_description: string;
    introduction_mainHeading: string;
    introduction_para1: string;
    introduction_para2: string;
    napa_story_para1: string;
    napa_story_para2: string;
    createdAt?: string;
    updatedAt?: string;
}

export const fetchAboutIntroduction = async (): Promise<AboutIntroduction> => {
    try {
        const response = await axios.get(`${origin}/api/v1/about-introduction`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching about introduction:", error);
        toast.error(
            `Failed to fetch content: ${error.response?.data?.message || error.message}`
        );
        throw error;
    }
};

export const updateAboutIntroduction = async (
    data: AboutIntroduction
): Promise<AboutIntroduction> => {
    try {
        const response = await axios.put(
            `${origin}/api/v1/about-introduction`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        toast.success("About Introduction updated successfully!");
        return response.data.data;
    } catch (error: any) {
        console.error("About Introduction update failed:", error);
        toast.error(
            `Failed to update content: ${error.response?.data?.message || error.message}`
        );
        throw error;
    }
};

