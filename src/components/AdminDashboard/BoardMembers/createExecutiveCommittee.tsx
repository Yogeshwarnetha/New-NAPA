import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { createExecutiveCommittee } from '../../../apirequest/boardMember';

interface FormDataType {
  name: string;
  designation: string;
  imageUrl: File | null;
}

interface ErrorsType {
  name?: string;
  designation?: string;
  imageUrl?: string;
}

const CreateExecutiveCommittee = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    designation: '',
    imageUrl: null,
  });
  const [errors, setErrors] = useState<ErrorsType>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, imageUrl: file })); 
      setErrors((prev) => ({ ...prev, imageUrl: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: ErrorsType = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.designation) newErrors.designation = 'Description is required';
    if (!formData.imageUrl) newErrors.imageUrl = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('image', formData.imageUrl as File);
      await createExecutiveCommittee(formDataToSend);
      alert('Executive Committee created successfully!');
      handleClose();
    } catch (error) {
      console.error('Error submitting Executive Committee:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', designation: '', imageUrl: null });
    setErrors({});
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Create Executive Committee
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Executive Committee</h2>
          <p className="text-gray-600 mt-1">Fill in the details below to create a new Executive Committee.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input name="name" label="Name" value={formData.name} onChange={handleInputChange} error={errors.name} />
            <Input
              name="designation"
              label="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              error={errors.designation} />
            <Input type="file" name="imageUrl" label="Upload Image" onChange={handleFileChange} error={errors.imageUrl} />
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button type="submit">Create Executive Committee</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateExecutiveCommittee;
;
