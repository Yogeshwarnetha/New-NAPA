import { useState } from 'react';

interface ProjectFormData {
  imageUrl: string;
  heading: string;
  description: string;
}

interface UseProjectFormReturn {
  formData: ProjectFormData;
  errors: Partial<Record<keyof ProjectFormData, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useProjectForm(): UseProjectFormReturn {
  const [formData, setFormData] = useState<ProjectFormData>({
    imageUrl: '',
    heading: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};

    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required';
    if (!formData.heading || formData.heading.length < 3 || formData.heading.length > 100) newErrors.heading = 'Heading should be between 3 and 100 characters';
    if (!formData.description || formData.description.length < 10 || formData.description.length > 500) newErrors.description = 'Description should be between 10 and 500 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const projectData = {
      ...formData,
    };

    // Here you would typically make an API call
    console.log('Project data:', projectData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      imageUrl: '',
      heading: '',
      description: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleInputChange,
    resetForm,
    handleSubmit,
  };
}
