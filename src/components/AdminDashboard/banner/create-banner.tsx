import  { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Modal } from '../../ui/Modal';
import { useBannerForm } from '../../../hooks/useBanner';

const CreateBanner = () => {
  const [open, setOpen] = useState(false);
  const { formData, errors, handleInputChange, resetForm, handleSubmit } = useBannerForm();

  const handleClose = () => {
    setOpen(false);
    resetForm(); // Reset form when modal is closed
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        Create a Banner
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Banner</h2>
            <p className="text-gray-600 mt-1">Fill in the details below to create a new banner.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                id="heading"
                name="heading"
                label="Banner Heading"
                placeholder="Enter banner heading"
                value={formData.heading}
                onChange={handleInputChange}
                error={errors.heading} // Display validation error
              />

              <Textarea
                id="description"
                name="description"
                label="Description"
                placeholder="Enter banner description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                error={errors.description} // Display validation error
              />

              <Input
                id="image_url"
                name="image_url"
                label="Image URL"
                placeholder="Enter image URL"
                value={formData.image_url}
                onChange={handleInputChange}
                error={errors.image_url} // Display validation error
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                Create Banner
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateBanner;
