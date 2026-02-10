import axios from "axios";
import { toast } from "react-toastify";
import { origin } from "./config";

interface Gallery {
    id: string;
    event_name: string;
    google_photo_url: string;
    image_url: string;
    createdAt?: string;
    updatedAt?: string;
}

export const createGallery = async (data: FormData): Promise<Gallery> => {
    try {
        const response = await axios.post(`${origin}/api/v1/gallery`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery item created successfully!");
        return response.data.data;
    } catch (error: any) {
        console.error("Gallery creation error:", error);
        toast.error(error.response?.data?.message || "Failed to create gallery item");
        throw error;
    }
};

export const fetchGalleryData = async (): Promise<Gallery[]> => {
    try {
        const response = await axios.get(`${origin}/api/v1/gallery`);
        return response.data.data;
    } catch (error: any) {
        console.error("Failed to fetch gallery:", error);
        toast.error("Failed to fetch gallery data");
        throw error;
    }
};

export const fetchGalleryPagination = async (
    page: number,
    limit: number
): Promise<{
    data: Gallery[];
    count: number;
    page: number;
    limit: number;
    noOfPages: number;
}> => {
    try {
        const response = await axios.get(
            `${origin}/api/v1/gallery/pagination?page=${page}&limit=${limit}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error fetching paginated gallery items:", error);
        toast.error(`Failed to fetch gallery items: ${error.response?.data?.message || error.message}`);
        throw error;
    }
};

export const fetchAllGalleryItems = async (): Promise<Gallery[]> => {
    try {
        const response = await axios.get(`${origin}/api/v1/gallery`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching gallery items:", error);
        toast.error(`Failed to fetch gallery items: ${error.response?.data?.message || error.message}`);
        throw error;
    }
};

export const deleteGalleryItem = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${origin}/api/v1/gallery/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        toast.success("Gallery item deleted successfully!");
    } catch (error: any) {
        console.error("Error deleting gallery item:", error);
        toast.error(`Failed to delete gallery item: ${error.response?.data?.message || error.message}`);
        throw error;
    }
};