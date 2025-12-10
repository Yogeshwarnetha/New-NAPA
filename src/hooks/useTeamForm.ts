import { useState } from 'react';

interface TeamFormData {
  imageUrl: string;
  name: string;
  designation: string;
}

interface UseTeamFormReturn {
  formData: TeamFormData;
  errors: Partial<Record<keyof TeamFormData, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useTeamForm(): UseTeamFormReturn {
  const [formData, setFormData] = useState<TeamFormData>({
    imageUrl: '',
    name: '',
    designation: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TeamFormData, string>>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name as keyof TeamFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TeamFormData, string>> = {};

    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required';
    if (!formData.name || formData.name.length < 3 || formData.name.length > 100)
      newErrors.name = 'Name should be between 3 and 100 characters';
    if (!formData.designation || formData.designation.length < 3 || formData.designation.length > 100)
      newErrors.designation = 'Designation should be between 3 and 100 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const teamMemberData = {
      ...formData,
    };

    // Here you would typically make an API call to save the data
    console.log('Team Member data:', teamMemberData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      imageUrl: '',
      name: '',
      designation: '',
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
