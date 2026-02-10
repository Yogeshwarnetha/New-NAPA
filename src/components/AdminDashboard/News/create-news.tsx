import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { DateTimePicker } from '../../DateTimePicker';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNewsForm } from '../../../hooks/useNewsForm';

const CreateNews = () => {
  const [open, setOpen] = useState(false);
  const {
    formData,
    errors,
    handleInputChange,
    handleDescriptionChange,
    resetForm,
    handleSubmit,
    handleFileChange,
    setDate,
    setTime,
  } = useNewsForm();

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
                {/* Image Upload */}
                <div>
                  <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
                    Upload News Image
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    name="imageUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.imageFile && <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>}
                </div>

                <Input
                  id="heading"
                  name="heading"
                  label="News Heading"
                  placeholder="Enter news heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  error={errors.heading}
                />

                <DateTimePicker
                  date={formData.date}
                  time={formData.time}
                  onDateChange={setDate}
                  onTimeChange={setTime}
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
