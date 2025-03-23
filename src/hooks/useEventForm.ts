import { useState } from 'react';
import { format } from 'date-fns';
import { createEvent } from '../apirequest/events';

interface EventFormData {
  name: string;
  description: string;
  place: string;
  imageFile: File | null;
}

interface EventFormState extends EventFormData {
  date?: Date;
  time: string;
}

interface UseEventFormReturn {
  formData: EventFormState;
  errors: Partial<Record<keyof EventFormState, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useEventForm(): UseEventFormReturn {
  const [formData, setFormData] = useState<EventFormState>({
    name: '',
    description: '',
    place: '',
    time: '',
    imageFile: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EventFormState, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof EventFormState]) {
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
    const newErrors: Partial<Record<keyof EventFormState, string>> = {};
    
    if (!formData.name) newErrors.name = 'Event name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.place) newErrors.place = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.imageFile) newErrors.imageFile = 'Image is required';

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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('place', formData.place);
      formDataToSend.append('date', format(formData.date!, 'yyyy-MM-dd'));
      formDataToSend.append('time', formData.time);
      formDataToSend.append('images', formData.imageFile!);

      await createEvent(formDataToSend);
      alert('Event created successfully!');
      resetForm();
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      place: '',
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
    setDate: (date: Date) => setFormData(prev => ({ ...prev, date })),
    setTime: (time: string) => setFormData(prev => ({ ...prev, time })),
    resetForm,
    handleSubmit,
  };
}
