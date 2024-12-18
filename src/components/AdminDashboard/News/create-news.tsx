import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import ReactQuill from 'react-quill'; // Rich text editor library
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useNewsForm } from '../../../hooks/useNewsForm';

const CreateNews = () => {
  const [open, setOpen] = useState(false);
  const { formData, errors, handleInputChange, handleDescriptionChange, resetForm, handleSubmit } = useNewsForm();

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Create News
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New News</h2>
            <p className="text-gray-600 mt-1">Fill in the details below to create a new news article.</p>
          </div>

          {/* Scrollable container for the form */}
          <div className="max-h-[60vh] overflow-y-auto p-4 border border-gray-300 rounded-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  label="News Image URL"
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  error={errors.imageUrl}
                />

                <Input
                  id="heading"
                  name="heading"
                  label="News Heading"
                  placeholder="Enter news heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  error={errors.heading}
                />

                <Input
                  id="date"
                  name="date"
                  label="News Date"
                  placeholder="Enter news date"
                  value={formData.date}
                  onChange={handleInputChange}
                  error={errors.date}
                />

                <Input
                  id="time"
                  name="time"
                  label="News Time"
                  placeholder="Enter news time"
                  value={formData.time}
                  onChange={handleInputChange}
                  error={errors.time}
                />

                <Input
                  id="venue"
                  name="venue"
                  label="News Venue"
                  placeholder="Enter venue (optional)"
                  value={formData.venue}
                  onChange={handleInputChange}
                  error={errors.venue}
                />

                {/* Rich Text Editor for Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <ReactQuill
                    id="description"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    className="mt-1"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create News
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateNews;
