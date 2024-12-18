import { useState } from 'react';
import { format } from 'date-fns';

interface EventFormData {
  name: string;
  description: string;
  place: string;
}

interface EventFormState extends EventFormData {
  date?: Date;
  time: string;
}

interface UseEventFormReturn {
  formData: EventFormState;
  errors: Partial<Record<keyof EventFormState, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EventFormState, string>>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name as keyof EventFormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EventFormState, string>> = {};
    
    if (!formData.name) newErrors.name = 'Event name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.place) newErrors.place = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventData = {
      ...formData,
      date: formData.date ? format(formData.date, 'yyyy-MM-dd') : undefined,
    };

    // Here you would typically make an API call
    console.log('Event data:', eventData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      place: '',
      time: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleInputChange,
    setDate: (date: Date) => setFormData(prev => ({ ...prev, date })),
    setTime: (time: string) => setFormData(prev => ({ ...prev, time })),
    resetForm,
    handleSubmit,
  };
}