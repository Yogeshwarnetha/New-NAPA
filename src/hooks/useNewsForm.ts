import { useState } from 'react';

interface NewsFormData {
  imageUrl: string;
  heading: string;
  date: string;
  time: string;
  venue: string;
  description: string;
}

interface UseNewsFormReturn {
  formData: NewsFormData;
  errors: Partial<Record<keyof NewsFormData, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDescriptionChange: (value: string) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useNewsForm(): UseNewsFormReturn {
  const [formData, setFormData] = useState<NewsFormData>({
    imageUrl: '',
    heading: '',
    date: '',
    time: '',
    venue: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof NewsFormData, string>>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof NewsFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewsFormData, string>> = {};

    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required';
    if (!formData.heading || formData.heading.length < 3 || formData.heading.length > 100) newErrors.heading = 'Heading should be between 3 and 100 characters';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.description.length < 10 || formData.description.length > 500) newErrors.description = 'Description should be between 10 and 500 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newsData = {
      ...formData,
    };

    // Here you would typically make an API call to save the news data
    console.log('News data:', newsData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      imageUrl: '',
      heading: '',
      date: '',
      time: '',
      venue: '',
      description: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleDescriptionChange,
    resetForm,
    handleSubmit,
  };
}
