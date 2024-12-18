import { useState } from 'react';

interface BannerFormData {
  heading: string;
  description: string;
  image_url: string;
}

interface BannerFormState extends BannerFormData {}

interface UseBannerFormReturn {
  formData: BannerFormState;
  errors: Partial<Record<keyof BannerFormState, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useBannerForm(): UseBannerFormReturn {
  const [formData, setFormData] = useState<BannerFormState>({
    heading: '',
    description: '',
    image_url: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BannerFormState, string>>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BannerFormState, string>> = {};

    if (!formData.heading) newErrors.heading = 'Heading is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.image_url) newErrors.image_url = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const bannerData = {
      ...formData,
    };

    // Here you would typically make an API call to save the banner data
    console.log('Banner data:', bannerData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      heading: '',
      description: '',
      image_url: '',
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
