import { useState } from 'react';
import { createProject } from '../apirequest/projects';

interface ProjectFormData {
  heading: string;
  description: string;
  imageFile: File | null;
}

interface UseProjectFormReturn {
  formData: ProjectFormData;
  errors: Partial<Record<keyof ProjectFormData, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useProjectForm(): UseProjectFormReturn {
  const [formData, setFormData] = useState<ProjectFormData>({
    heading: '',
    description: '',
    imageFile: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, imageFile: 'Invalid file type. Only JPG, PNG, and GIF are allowed.' }));
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, imageFile: 'File size should be less than 5MB.' }));
        return;
      }

      setFormData((prev) => ({ ...prev, imageFile: file }));
      setErrors((prev) => ({ ...prev, imageFile: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};

    if (!formData.heading || formData.heading.length < 3 || formData.heading.length > 100) newErrors.heading = 'Heading should be between 3 and 100 characters';
    if (!formData.description || formData.description.length < 10 || formData.description.length > 500) newErrors.description = 'Description should be between 10 and 500 characters';
    if (!formData.imageFile) newErrors.imageFile = 'Image file is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
 
     if (!validateForm()) {
       return;
     }
 
     try {
       const formDataToSend = new FormData();
       formDataToSend.append('heading', formData.heading);
       formDataToSend.append('description', formData.description);
       formDataToSend.append('images', formData.imageFile!);
 
       await createProject(formDataToSend);
       alert('Project created successfully!');
       resetForm();
     } catch (error) {
       console.error('Error submitting Project:', error);
     }
   };

  const resetForm = () => {
    setFormData({
      heading: '',
      description: '',
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
