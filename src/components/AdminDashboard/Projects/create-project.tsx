import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Modal } from '../../ui/Modal';
import { useProjectForm } from '../../../hooks/useProjectForm';

const CreateProject = () => {
  const [open, setOpen] = React.useState(false);
  const {
    formData,
    errors,
    handleInputChange,
    resetForm,
    handleSubmit,
  } = useProjectForm();

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Create a Project
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
            <p className="text-gray-600 mt-1">Fill in the details below to create a new project.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                id="imageUrl"
                name="imageUrl"
                label="Project Image URL"
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
                error={errors.imageUrl}
              />

              <Input
                id="heading"
                name="heading"
                label="Project Heading"
                placeholder="Enter project heading"
                value={formData.heading}
                onChange={handleInputChange}
                error={errors.heading}
              />

              <Textarea
                id="description"
                name="description"
                label="Project Description"
                placeholder="Enter project description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                error={errors.description}
              />

            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                Create Project
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateProject;
