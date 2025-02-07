import { useState } from "react";
import { createBanner } from "../apirequest/banner";

interface BannerFormData {
  heading: string;
  description: string;
  imageFile: File | null;
}

interface BannerFormState extends BannerFormData {}

interface UseBannerFormReturn {
  formData: BannerFormState;
  errors: Partial<Record<keyof BannerFormState, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useBannerForm(): UseBannerFormReturn {
  const [formData, setFormData] = useState<BannerFormState>({
    heading: "",
    description: "",
    imageFile: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BannerFormState, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is modified
    if (errors[name as keyof BannerFormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type (e.g., only images)
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, imageFile: "Please upload a valid image file (JPG, PNG, GIF)." }));
        setFormData((prev) => ({ ...prev, imageFile: null }));
        return;
      }

      // Validate file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, imageFile: "Image size should be less than 5MB." }));
        setFormData((prev) => ({ ...prev, imageFile: null }));
        return;
      }

      // If valid, set file
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setErrors((prev) => ({ ...prev, imageFile: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, imageFile: "Image is required" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BannerFormState, string>> = {};

    if (!formData.heading) newErrors.heading = "Heading is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.imageFile) newErrors.imageFile = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // 1. Create banner with the image file
      const formDataToSend = new FormData();
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("images", formData.imageFile!);

      // 2. Send the form data to the backend to create the banner
      await createBanner(formDataToSend);
      alert("Banner created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting banner:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      heading: "",
      description: "",
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
