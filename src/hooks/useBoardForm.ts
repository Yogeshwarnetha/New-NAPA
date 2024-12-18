import { useState } from "react";

interface MemberFormData {
  name: string;
  photo_url: string;
  designation: string;
  category_id: number | null;
}

interface Category {
  id: number;
  name: string;
  members: Omit<MemberFormData, "category_id">[]; // Exclude category_id from individual members in the category
}

interface UseBoardMembersReturn {
  categories: Category[];
  formData: MemberFormData;
  errors: Partial<Record<keyof MemberFormData, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetForm: () => void;
  handleAddMember: (categoryId: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  expanded: Record<number, boolean>;
  toggleExpand: (categoryId: number) => void;
}

export function useBoardMembers(): UseBoardMembersReturn {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Advisory Council", members: [] },
    { id: 2, name: "Executive Committee", members: [] },
    { id: 3, name: "Past Presidents", members: [] },
    { id: 4, name: "Board of Directors", members: [] },
    { id: 5, name: "Overseas Directors", members: [] },
  ]);

  const [formData, setFormData] = useState<MemberFormData>({
    name: "",
    photo_url: "",
    designation: "",
    category_id: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MemberFormData, string>>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category_id" ? Number(value) : value,
    }));

    // Clear error when field is modified
    if (errors[name as keyof MemberFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MemberFormData, string>> = {};

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "Member name must be at least 3 characters long.";
    }
    if (!formData.photo_url || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(formData.photo_url)) {
      newErrors.photo_url = "A valid photo URL is required.";
    }
    if (!formData.designation || formData.designation.trim().length < 3) {
      newErrors.designation = "Designation must be at least 3 characters long.";
    }
    if (!formData.category_id) {
      newErrors.category_id = "Category is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMember = (categoryId: number) => {
    setFormData({
      name: "",
      photo_url: "",
      designation: "",
      category_id: categoryId,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setCategories((prev) =>
      prev.map((category) => {
        if (category.id === formData.category_id) {
          return {
            ...category,
            members: [...category.members, {
              name: formData.name.trim(),
              photo_url: formData.photo_url.trim(),
              designation: formData.designation.trim(),
            }],
          };
        }
        return category;
      })
    );

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      photo_url: "",
      designation: "",
      category_id: null,
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
    categories,
    formData,
    errors,
    handleInputChange,
    resetForm,
    handleAddMember,
    handleSubmit,
    expanded,
    toggleExpand,
  };
}
