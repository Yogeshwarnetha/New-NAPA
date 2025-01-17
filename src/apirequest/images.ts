import axios from "axios";
import { adminCookie, origin } from "./config";
import Cookies from "js-cookie";

// Get a presigned URL for uploading an image
export const getPresignedUrl = async () => {
    const token = Cookies.get("jwt_token");
    try {
        const response = await axios.get(`${origin}api/v1/get-upload-url`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err: any) {
        console.error(`Error getting presigned URL: ${err.message}`);
        throw err;
    }
};

// Save an image URL to the database
export const saveImage = async (data: any) => {
    const token = Cookies.get(adminCookie);
    try {
        const response = await axios.post(`${origin}/api/v1/images`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err: any) {
        console.error(`Error saving image: ${err.message}`);
        throw err;
    }
};

// Delete images by their URLs
export const deleteImagesUrl = async (imgUrls: string[]) => {
    const token = Cookies.get("jwt_token");
    try {
        const response = await axios.patch(
            `${origin}api/v1/get-url`,
            { data: imgUrls },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (err: any) {
        console.error(`Error deleting images: ${err.message}`);
        throw err;
    }
};
