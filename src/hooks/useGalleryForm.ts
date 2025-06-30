import { useState } from "react";
import { createGallery } from "../apirequest/gallery";

interface GalleryFormData {
    event_name: string;
    google_photo_url: string;
    imageFile: File | null;
}

interface GalleryFormState extends GalleryFormData { }

interface UseGalleryFormReturn {
    formData: GalleryFormState;
    errors: Partial<Record<keyof GalleryFormState, string>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetForm: () => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useGalleryForm(): UseGalleryFormReturn {
    const [formData, setFormData] = useState<GalleryFormState>({
        event_name: "",
        google_photo_url: "",
        imageFile: null,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof GalleryFormState, string>>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof GalleryFormState]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!validImageTypes.includes(file.type)) {
                setErrors((prev) => ({ ...prev, imageFile: "Upload a valid image file (JPG, PNG, GIF)." }));
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setErrors((prev) => ({ ...prev, imageFile: "Image size should be under 5MB." }));
                return;
            }

            setFormData((prev) => ({ ...prev, imageFile: file }));
            setErrors((prev) => ({ ...prev, imageFile: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof GalleryFormState, string>> = {};

        if (!formData.event_name) newErrors.event_name = "Event name is required";
        if (!formData.google_photo_url) newErrors.google_photo_url = "Google Photo URL is required";
        if (!formData.imageFile) newErrors.imageFile = "Image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("event_name", formData.event_name);
            formDataToSend.append("google_photo_url", formData.google_photo_url);
            formDataToSend.append("image", formData.imageFile!);

            await createGallery(formDataToSend);
            alert("Gallery item created!");
            resetForm();
        } catch (error) {
            console.error("Gallery submission error:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            event_name: "",
            google_photo_url: "",
            imageFile: null,
        });
        setErrors({});
    };

    return {
        formData,
        errors,
        handleInputChange,
        handleFileChange,
        resetForm,
        handleSubmit,
    };
}
