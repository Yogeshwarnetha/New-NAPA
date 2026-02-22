import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AdminDashboardLayout from ".."; // Adjust if needed
import {
  fetchPresidentMessage,
  updatePresidentMessage,
  PresidentMessage,
} from "../../../apirequest/presidentMessage";

const PresidentMessageDashboard = () => {
  const [content, setContent] = useState<PresidentMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<Omit<PresidentMessage, 'id' | 'image_url'>>({
    president_name: "",
    president_period: "",
    president_description1: "",
    president_description2: "",
    president_description3: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPresidentMessage();
        setContent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleEditClick = () => {
    if (!content) return;
    const {
      president_name,
      president_period,
      president_description1,
      president_description2,
      president_description3,
    } = content;

    setFormState({
      president_name,
      president_period,
      president_description1,
      president_description2,
      president_description3,
    });

    setPreview(content.image_url);
    setModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    try {
      setSubmitting(true);
      const updated = await updatePresidentMessage(formData);
      setContent(updated);
      setModalOpen(false);
      toast.success("President message updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update content.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <ToastContainer />
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">President Message</Typography>
          <Button
            variant="contained"
            startIcon={<MdEdit />}
            onClick={handleEditClick}
            disabled={loading}
          >
            Edit
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : content ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(content).map(([key, value]) =>
                  key !== "id" && key !== "image_url" ? (
                    <TableRow key={key}>
                      <TableCell>{key.replace(/_/g, " ")}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ) : null
                )}
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>
                    <Avatar
                      src={content.image_url}
                      alt="President"
                      sx={{ width: 64, height: 64 }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No content available.</Typography>
        )}
      </Box>

      {/* Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit President Message
          </Typography>

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              name="president_name"
              label="President Name"
              value={formState.president_name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="president_period"
              label="President Period"
              value={formState.president_period}
              onChange={handleInputChange}
              fullWidth
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                President Description 1
              </Typography>
              <ReactQuill
                value={formState.president_description1}
                onChange={(value) =>
                  setFormState((prev) => ({ ...prev, president_description1: value }))
                }
                style={{ backgroundColor: "white", borderRadius: "4px" }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                President Description 2
              </Typography>
              <ReactQuill
                value={formState.president_description2}
                onChange={(value) =>
                  setFormState((prev) => ({ ...prev, president_description2: value }))
                }
                style={{ backgroundColor: "white", borderRadius: "4px" }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                President Description 3
              </Typography>
              <ReactQuill
                value={formState.president_description3}
                onChange={(value) =>
                  setFormState((prev) => ({ ...prev, president_description3: value }))
                }
                style={{ backgroundColor: "white", borderRadius: "4px" }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            </Box>

            <Button variant="outlined" component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </Button>

            {preview && (
              <Avatar
                src={preview}
                alt="Preview"
                sx={{ width: 100, height: 100 }}
              />
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={() => setModalOpen(false)} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </AdminDashboardLayout>
  );
};

export default PresidentMessageDashboard;
