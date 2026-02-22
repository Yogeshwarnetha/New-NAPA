import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { useProjectForm } from '../../../hooks/useProjectForm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateProject = () => {
  const [open, setOpen] = React.useState(false);
  const {
    formData,
    errors,
    handleInputChange,
    handleFileChange,
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

          <div className="max-h-[60vh] overflow-y-auto p-4 border border-gray-300 rounded-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
              {/* Image File Upload */}
              <label className="block text-sm font-medium text-gray-700">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
              {errors.imageFile && <p className="text-red-500 text-sm">{errors.imageFile}</p>}

  

              <Input
                id="heading"
                name="heading"
                label="Project Heading"
                placeholder="Enter project heading"
                value={formData.heading}
                onChange={handleInputChange}
                error={errors.heading}
              />

              {/* Rich Text Editor for Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <ReactQuill
                  value={formData.description}
                  onChange={(value) => handleInputChange({ target: { name: 'description', value } } as any)}
                  className="bg-white"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'indent': '-1'}, { 'indent': '+1' }],
                      ['link'],
                      ['clean']
                    ]
                  }}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateProject;
