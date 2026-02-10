import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateChapterLeads from "./createchapter";
import AdminDashboardLayout from "..";
import { fetchChaptersPagination, deleteChapter, updateChapter } from "../../../apirequest/chapter";

interface Chapter {
  id: number; // Changed to number to match backend
  title: string;
  description: string;
  images: string[];
  chapterLeads: number[]; // Changed to number[] to match backend
}

const CreateChaptersDashboard = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState<Chapter | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchChaptersPagination(page, limit);

        // Convert API response to match our Chapter interface
        const chaptersWithDefaults = response.data.map((chapter: any) => ({
          ...chapter,
          id: Number(chapter.id), // Ensure id is number
          chapterLeads: chapter.chapterLeads ? chapter.chapterLeads.map((id: any) => Number(id)) : [], // Ensure chapterLeads are numbers
        }));

        setChapters(chaptersWithDefaults);
        setCount(response.count || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load chapters");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  const handleDeleteClick = (chapter: Chapter) => {
    setChapterToDelete(chapter);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!chapterToDelete) return;

    try {
      await deleteChapter(chapterToDelete.id); // Now using number ID
      const response = await fetchChaptersPagination(page, limit);
      const updatedChapters = response.data.map((chapter: any) => ({
        ...chapter,
        id: Number(chapter.id),
        chapterLeads: chapter.chapterLeads ? chapter.chapterLeads.map((id: any) => Number(id)) : [],
      }));
      setChapters(updatedChapters);
      setCount(response.count);
      toast.success("Chapter deleted successfully!");
    } catch (error) {
      console.error("Error deleting chapter:", error);
      toast.error("Failed to delete chapter");
    } finally {
      setDeleteConfirmOpen(false);
      setChapterToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setChapterToDelete(null);
  };

  const handleEditClick = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!currentChapter) return;

    try {
      const formData = new FormData();
      formData.append('title', currentChapter.title);
      formData.append('description', currentChapter.description);

      await updateChapter(currentChapter.id, formData); // Now using number ID
      const response = await fetchChaptersPagination(page, limit);
      const updatedChapters = response.data.map((chapter: any) => ({
        ...chapter,
        id: Number(chapter.id),
        chapterLeads: chapter.chapterLeads ? chapter.chapterLeads.map((id: any) => Number(id)) : [],
      }));
      setChapters(updatedChapters);
      setCount(response.count);
      toast.success("Chapter updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating chapter:", error);
      toast.error("Failed to update chapter");
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setCurrentChapter(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentChapter) return;
    setCurrentChapter({
      ...currentChapter,
      [e.target.name]: e.target.value
    });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const openImagePopup = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const closeImagePopup = () => {
    setOpenImageModal(false);
  };

  return (
    <>
      <AdminDashboardLayout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CreateChapterLeads />
          </Box>
          <Typography variant="h6" sx={{ m: 2 }}>
            Chapters List
          </Typography>

          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>S.No</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chapters.map((chapter, index) => (
                    <TableRow key={chapter.id}>
                      <TableCell sx={{ fontSize: 14 }}>{index + 1 + (page - 1) * limit}</TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{chapter.title}</TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{chapter.description}</TableCell>
                      <TableCell>
                        {chapter.images.length > 0 && (
                          <img
                            src={chapter.images[0]}
                            alt={chapter.title}
                            style={{ maxWidth: "100px", height: "auto", cursor: "pointer" }}
                            onClick={() => openImagePopup(chapter.images[0])}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => handleEditClick(chapter)}
                        >
                          <MdEdit fontSize={20} /> Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteClick(chapter)}
                        >
                          <MdDelete fontSize={20} /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={count}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>

        {/* Image Preview Modal */}
        <Modal open={openImageModal} onClose={closeImagePopup}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <img
                src={selectedImage}
                alt="Selected Chapter Image"
                style={{ maxWidth: "600px", height: "auto" }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={closeImagePopup}
              >
                <AiOutlineClose />
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmOpen}
          onClose={handleCancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the chapter "{chapterToDelete?.title}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Chapter Modal */}
        <Modal open={editModalOpen} onClose={handleEditCancel}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>Edit Chapter</Typography>
            {currentChapter && (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={currentChapter.title}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={currentChapter.description}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  multiline
                  rows={4}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button onClick={handleEditCancel} sx={{ mr: 1 }}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditSubmit}
                  >
                    Save Changes
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </AdminDashboardLayout>
    </>
  );
};

export default CreateChaptersDashboard;