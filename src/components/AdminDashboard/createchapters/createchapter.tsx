import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { createChapter } from '../../../apirequest/chapter';
import { fetchChapterLeads, fetchChapterDirectors } from '../../../apirequest/boardMember';
import Select from 'react-select'; // Import react-select

interface ChapterLead {
  id: number;
  name: string;
}

interface FormDataType {
  title: string;
  description: string;
  images: File[];
  chapterDirector: number[];
  chapterLeads: number[];
}

interface ErrorsType {
  title?: string;
  description?: string;
  images?: string;
  chapterDirector?: string;
  chapterLeads?: string;
}

const CreateChapter = () => {
  const [open, setOpen] = useState(false);
  const [chapterLeads, setChapterLeads] = useState<ChapterLead[]>([]);
  const [chapterDirectors, setChapterDirectors] = useState<ChapterLead[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    description: '',
    images: [],
    chapterDirector: [],
    chapterLeads: []
  });
  const [errors, setErrors] = useState<ErrorsType>({} as any);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  // Fetch chapter leads and directors
  useEffect(() => {
    const loadChapterData = async () => {
      try {
        const leadsData = await fetchChapterLeads();
        const directorsData = await fetchChapterDirectors();
        setChapterLeads(leadsData);
        setChapterDirectors(directorsData);
      } catch (error) {
        console.error('Error fetching chapter data:', error);
      }
    };
    loadChapterData();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle file changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
      setErrors((prev) => ({ ...prev, images: '' }));

      // Create preview URLs for the new images
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  // Handle chapter leads selection
  const handleChapterLeadsChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
    setFormData(prev => ({ ...prev, chapterLeads: selectedIds }));
    setErrors(prev => ({ ...prev, chapterLeads: '' }));
  };

  // Handle chapter director selection
  const handleChapterDirectorChange = (selectedOption: any) => {
    console.log('Selected Director:', selectedOption); // Debugging line
    setFormData(prev => ({ ...prev, chapterDirector: [selectedOption.value] }));
    setErrors(prev => ({ ...prev, chapterDirector: '' }));
  };

  // Remove selected chapter lead
  const removeSelectedChapterLead = (id: number) => {
    setFormData(prev => ({
      ...prev,
      chapterLeads: prev.chapterLeads.filter(leadId => leadId !== id)
    }));
  };

  // Remove image
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: ErrorsType = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    if (formData.chapterDirector.length === 0) newErrors.chapterDirector = 'Chapter director is required';
    if (formData.chapterLeads.length === 0) newErrors.chapterLeads = 'At least one chapter lead must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
      formData.chapterDirector.forEach((directorId) => {
        formDataToSend.append('chapterDirector', directorId.toString());
      });
      formData.chapterLeads.forEach((leadId) => {
        formDataToSend.append('chapterLeads', leadId.toString());
      });

      await createChapter(formDataToSend);
      alert('Chapter created successfully!');
      handleClose();
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: '',
      description: '',
      images: [],
      chapterDirector: [],
      chapterLeads: [],
    });
    // Cleanup image preview URLs
    imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    setImagePreviewUrls([]);
    setErrors({});
  };

  // Map chapter leads to options for the dropdown
  const chapterLeadOptions = chapterLeads.map(lead => ({
    value: lead.id,
    label: lead.name,
  }));

  // Filter selected chapter leads
  const selectedChapterLeads = chapterLeads.filter(lead => formData.chapterLeads.includes(lead.id));

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Create Chapter
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className="space-y-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">Create Chapter</h2>
          <p className="text-gray-600 mt-1">Fill in the details below to create a new chapter.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleInputChange}
              error={errors.title}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Chapter Director Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Chapter Director</label>
              <Select
                options={chapterDirectors.map(director => ({
                  value: director.id,
                  label: director.name,
                }))}
                value={chapterDirectors.find(director => director.id === formData.chapterDirector[0]) ? {
                  value: formData.chapterDirector[0],
                  label: chapterDirectors.find(director => director.id === formData.chapterDirector[0])?.name
                } : null}
                onChange={handleChapterDirectorChange}
                className="mt-1"
              />
              {errors.chapterDirector && (
                <p className="text-red-500 text-sm">{errors.chapterDirector}</p>
              )}
            </div>

            {/* Chapter Leads Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Chapter Leads</label>
              <Select
                isMulti
                options={chapterLeadOptions}
                value={chapterLeadOptions.filter(option => formData.chapterLeads.includes(option.value))}
                onChange={handleChapterLeadsChange}
                className="mt-1"
              />
              {errors.chapterLeads && (
                <p className="text-red-500 text-sm">{errors.chapterLeads}</p>
              )}
            </div>

            {/* Selected Chapter Leads */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Selected Chapter Leads</label>
              <div className="flex flex-wrap gap-2">
                {selectedChapterLeads.map(lead => (
                  <div key={lead.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                    <span>{lead.name}</span>
                    <button
                      type="button"
                      onClick={() => removeSelectedChapterLead(lead.id)}
                      className="text-blue-800 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}
            </div>

            {/* Image Previews */}
            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Create Chapter</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateChapter;