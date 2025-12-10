import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

export interface HomepageData {
    id: number;
    homeAboutuspara1: string;
    homeAboutuspara2: string;
    homeAboutuspara3: string;
    homepresidentName: string;
    homepresidentpara: string;
    homeDonateTodaytext: string;
    servicesMatrimony: string;
    ourgallery: string;
    createdAt?: string;
    updatedAt?: string;
}

// GET: Fetch homepage content
export const fetchHomepageData = async (): Promise<HomepageData> => {
    try {
        const response = await axios.get(`${origin}/api/v1/homepage`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching homepage content:", error);
        toast.error(
            `Failed to fetch homepage content: ${error.response?.data?.message || error.message}`
        );
        throw error;
    }
};

// PUT: Update homepage content
export const updateHomepageData = async (
    data: HomepageData
): Promise<HomepageData> => {
    try {
        const response = await axios.put(`${origin}/api/v1/homepage`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        toast.success("Homepage content updated successfully!");
        return response.data.data;
    } catch (error: any) {
        console.error("Homepage content update failed:", error);
        toast.error(
            `Failed to update homepage content: ${error.response?.data?.message || error.message}`
        );
        throw error;
    }
};
