import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

export interface AboutMissionVision {
    id: number;
    missionvision_heading: string;
    missionvision_description: string;
    vision_mainHeading: string;
    vision_para1: string;
    vision_para2: string;
    mission_mainHeading: string;
    mission_para1: string;
    mission_para2: string;
    joinourcommunity: string;
    createdAt?: string;
    updatedAt?: string;
}

// GET request to fetch About Mission & Vision content
export const fetchAboutMissionVision = async (): Promise<AboutMissionVision> => {
    try {
        const response = await axios.get(`${origin}/api/v1/about-mission-vision`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching About Mission & Vision:", error);
        toast.error(
            `Failed to fetch content: ${error.response?.data?.message || error.message}`
        );
        throw error;
    }
};

// PUT request to update About Mission & Vision content
export const updateAboutMissionVision = async (
    data: AboutMissionVision
): Promise<AboutMissionVision> => {
    try {
        const response = await axios.put(
            `${origin}/api/v1/about-mission-vision`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        toast.success("About Mission & Vision updated successfully!");
        return response.data.data;
    } catch (error: any) {
        console.error("About Mission & Vision update failed:", error);
        toast.error(
            `Failed to update content: ${error.response?.data?.message || error.message}`
        );
        throw error;
    }
};
