import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Modal } from '../../ui/Modal';
import { DateTimePicker } from '../../DateTimePicker';
import { useEventForm } from '../../../hooks/useEventForm';

const CreateEvent = () => {
  const [open, setOpen] = React.useState(false);
  const {
    formData,
    errors,
    handleInputChange,
    handleFileChange,
    setDate,
    setTime,
    resetForm,
    handleSubmit,
  } = useEventForm();

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Create an Event
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
            <p className="text-gray-600 mt-1">Fill in the details below to create a new event.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                id="name"
                name="name"
                label="Event Name"
                placeholder="Enter event name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
              />

              <Textarea
                id="description"
                name="description"
                label="Description"
                placeholder="Enter event description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                error={errors.description}
              />

              <Input
                id="place"
                name="place"
                label="Location"
                placeholder="Enter event location"
                value={formData.place}
                onChange={handleInputChange}
                error={errors.place}
              />

              <DateTimePicker
                date={formData.date}
                time={formData.time}
                onDateChange={setDate}
                onTimeChange={setTime}
              />

              <Input
                id="imageFile"
                type="file"
                name="imageFile"
                label="Upload Image"
                onChange={handleFileChange}
                error={errors.imageFile}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                Create Event
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateEvent;
