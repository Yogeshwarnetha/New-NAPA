import { useState } from "react";
import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AdminDashboardLayout from "..";

const PresidentMessage = () => {
  const [data, setData] = useState({
    id: 1,
    name: "John Doe",
    timePeriod: "2022-2024",
    description: "<p>This is the President's message.</p>",
    signatureImageUrl: "https://via.placeholder.com/150",
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: data?.name || "",
    timePeriod: data?.timePeriod || "",
    description: data?.description || "",
    signatureImageUrl: data?.signatureImageUrl || "",
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value:any) => {
    setForm((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = () => {
    if (data) {
      // Update
      setData({ ...data, ...form });
    } else {
      // Create
      setData({ ...form, id: 1 });
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setData(null as any);
  };

  return (

    <AdminDashboardLayout>

    <div className="space-y-6">
      {data ? (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-gray-600">{data.timePeriod}</p>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
            <img src={data.signatureImageUrl} alt="Signature" className="h-16" />
          </div>
          <div className="space-x-4">
            <Button onClick={() => setOpen(true)}>Update</Button>
            <Button variant="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </>
      ) : (
        <div>
          <p>No President message available. Create one now:</p>
          <Button onClick={() => setOpen(true)}>Create a President Message</Button>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="space-y-6">
          <Input
            name="name"
            label="President's Name"
            value={form.name}
            onChange={handleInputChange}
          />
          <Input
            name="timePeriod"
            label="Time Period"
            value={form.timePeriod}
            onChange={handleInputChange}
          />
          <div>
            <label className="block text-sm font-medium">Description</label>
            <ReactQuill value={form.description} onChange={handleDescriptionChange} />
          </div>
          <Input
            name="signatureImageUrl"
            label="Signature Image URL"
            value={form.signatureImageUrl}
            onChange={handleInputChange}
          />
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{data ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
    </AdminDashboardLayout>

  );
};

export default PresidentMessage;
