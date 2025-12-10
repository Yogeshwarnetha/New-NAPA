import { useState } from "react";
import { adminPostBoardCategoryData } from "../apirequest/boardCategory";

interface CategoryFormData {
  name: string;
}

interface UseBoardCategoryReturn {
  formData: CategoryFormData;
  errors: Partial<Record<keyof CategoryFormData, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetForm: () => void;
  handleAddCategory: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  expanded: Record<number, boolean>;
  toggleExpand: (categoryId: number) => void;
}

export function useBoardCategory(): UseBoardCategoryReturn {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CategoryFormData, string>>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is modified
    if (errors[name as keyof CategoryFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CategoryFormData, string>> = {};

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "Category name must be at least 3 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCategory = () => {
    setFormData({
      name: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await adminPostBoardCategoryData(formData);
      console.log("Category added successfully:", response);

      resetForm();
    } catch (error) {
      console.error("Failed to add category:", error);
      throw error;
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
    });
    setErrors({});
  };

  const toggleExpand = (categoryId: number) => {
    setExpanded((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return {
    formData,
    errors,
    handleInputChange,
    resetForm,
    handleAddCategory,
    handleSubmit,
    expanded,
    toggleExpand,
  };
}
