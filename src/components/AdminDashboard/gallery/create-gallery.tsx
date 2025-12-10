import { useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Modal } from "../../ui/Modal";
import { useGalleryForm } from "../../../hooks/useGalleryForm";

const CreateGallery = () => {
    const [open, setOpen] = useState(false);
    const {
        formData,
        errors,
        handleInputChange,
        handleFileChange,
        resetForm,
        handleSubmit,
    } = useGalleryForm();

    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Create Gallery</Button>

            <Modal open={open} onClose={handleClose}>
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Create Gallery Item</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            id="event_name"
                            name="event_name"
                            label="Event Name"
                            value={formData.event_name}
                            onChange={handleInputChange}
                            placeholder="Enter event name"
                            error={errors.event_name}
                        />
                        <Input
                            id="google_photo_url"
                            name="google_photo_url"
                            label="Google Photo URL"
                            value={formData.google_photo_url}
                            onChange={handleInputChange}
                            placeholder="https://photos.google.com/..."
                            error={errors.google_photo_url}
                        />
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            label="Image"
                            onChange={handleFileChange}
                            error={errors.imageFile}
                        />
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button variant="secondary" type="button" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default CreateGallery;
