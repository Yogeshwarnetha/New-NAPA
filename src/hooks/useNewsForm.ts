import { useState } from 'react';
import { format } from 'date-fns';
import { createNews } from '../apirequest/news';

interface NewsFormData {
  heading: string;
  description: string;
  venue: string;
  imageFile: File | null;
}

interface NewsFormState extends NewsFormData {
  date?: Date;
  time: string;
}

interface UseNewsFormReturn {
  formData: NewsFormState;
  errors: Partial<Record<keyof NewsFormState, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (value: string) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useNewsForm(): UseNewsFormReturn {
  const [formData, setFormData] = useState<NewsFormState>({
    heading: '',
    description: '',
    venue: '',
    time: '',
    imageFile: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof NewsFormState, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof NewsFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, imageFile: 'Please upload a valid image file (JPG, PNG, GIF).' }));
        setFormData((prev) => ({ ...prev, imageFile: null }));
        return;
      }
      
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, imageFile: 'Image size should be less than 5MB.' }));
        setFormData((prev) => ({ ...prev, imageFile: null }));
        return;
      }
      
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setErrors((prev) => ({ ...prev, imageFile: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, imageFile: 'Image is required' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewsFormState, string>> = {};
    
    if (!formData.heading) newErrors.heading = 'News heading is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.venue) newErrors.venue = 'Venue is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.imageFile) newErrors.imageFile = 'Image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('heading', formData.heading);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('venue', formData.venue);
      formDataToSend.append('date', format(formData.date!, 'yyyy-MM-dd'));
      formDataToSend.append('time', formData.time);
      formDataToSend.append('images', formData.imageFile!);
      
      await createNews(formDataToSend);
      alert('News created successfully!');
      resetForm();
    } catch (error) {
      console.error('Error submitting news:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      heading: '',
      description: '',
      venue: '',
      time: '',
      imageFile: null,
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleFileChange,
    handleDescriptionChange,
    setDate: (date: Date) => setFormData(prev => ({ ...prev, date })),
    setTime: (time: string) => setFormData(prev => ({ ...prev, time })),
    resetForm,
    handleSubmit,
  };
}
