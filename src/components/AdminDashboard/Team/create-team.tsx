import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { useTeamForm } from '../../../hooks/useTeamForm';

const OurTeamModal = () => {
  const [open, setOpen] = React.useState(false);
  const {
    formData,
    errors,
    handleInputChange,
    resetForm,
    handleSubmit,
  } = useTeamForm();

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Add Team Member
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Team Member</h2>
            <p className="text-gray-600 mt-1">Fill in the details below to create a new team member.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                id="imageUrl"
                name="imageUrl"
                label="Image URL"
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
                error={errors.imageUrl}
              />

              <Input
                id="name"
                name="name"
                label="Name"
                placeholder="Enter team member's name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
              />

              <Input
                id="designation"
                name="designation"
                label="Designation"
                placeholder="Enter team member's designation"
                value={formData.designation}
                onChange={handleInputChange}
                error={errors.designation}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                Add Team Member
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default OurTeamModal;
