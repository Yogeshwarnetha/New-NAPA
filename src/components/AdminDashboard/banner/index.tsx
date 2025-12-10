import { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboardLayout from "..";
import { AiOutlineClose } from "react-icons/ai";
import CreateBanner from "./create-banner";
import { fetchBannerPagination, deleteBanner, updateBanner } from "../../../apirequest/banner";

interface Banner {
  id: string;
  heading: string;
  description: string;
  images: string[];
  is_deleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const BannersDashboard = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchBannerPagination(page, limit);
        setBanners(data.data);
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
        toast.error("Failed to load banners");
      }
      setLoading(false);
    };
    fetchData();
  }, [page, limit]);

  const handleDeleteClick = (banner: Banner) => {
    setBannerToDelete(banner);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bannerToDelete) return;

    try {
      await deleteBanner(bannerToDelete.id);
      // Refresh the banner list after deletion
      const data = await fetchBannerPagination(page, limit);
      setBanners(data.data);
      setCount(data.count);
      toast.success("Banner deleted successfully!");
    } catch (error) {
      console.error("Failed to delete banner:", error);
      toast.error("Failed to delete banner");
    } finally {
      setDeleteConfirmOpen(false);
      setBannerToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setBannerToDelete(null);
  };

  const handleEditClick = (banner: Banner) => {
    setCurrentBanner(banner);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!currentBanner) return;

    try {
      const formData = new FormData();
      formData.append('heading', currentBanner.heading);
      formData.append('description', currentBanner.description);

      await updateBanner(currentBanner.id, formData);
      const data = await fetchBannerPagination(page, limit);
      setBanners(data.data);
      setCount(data.count);
      toast.success("Banner updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update banner:", error);
      toast.error("Failed to update banner");
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setCurrentBanner(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentBanner) return;
    setCurrentBanner({
      ...currentBanner,
      [e.target.name]: e.target.value
    });
  };

  const handleChangePage = (_: unknown, newPage: number) => {
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

  const Child = ({ data }: { data: Banner }) => (
    <TableRow key={data.id}>
      <TableCell>{data.heading}</TableCell>
      <TableCell>{data.description}</TableCell>
      <TableCell>
        <img
          src={data.images[0]}
          alt="Banner"
          style={{ maxWidth: "100px", height: "auto", cursor: "pointer" }}
          onClick={() => openImagePopup(data.images[0])}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
          onClick={() => handleEditClick(data)}
        >
          <MdEdit fontSize={20} /> Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteClick(data)}
        >
          <MdDelete fontSize={20} /> Delete
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
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
          <CreateBanner />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ m: 2 }}>Banner Table</Typography>
          <TableContainer>
            {loading ? (
              <Typography sx={{ textAlign: "center", py: 3 }}>Loading...</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {banners.map((banner) => (
                    <Child key={banner.id} data={banner} />
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={count}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>

      {/* Image Preview Modal */}
      <Modal open={openImageModal} onClose={closeImagePopup}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <img src={selectedImage} alt="Selected Banner" style={{ maxWidth: '600px', height: 'auto' }} />
            <Button
              variant="contained"
              color="secondary"
              sx={{ position: 'absolute', top: 0, right: 0 }}
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
            Are you sure you want to delete the banner "{bannerToDelete?.heading}"? This action cannot be undone.
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

      {/* Edit Banner Modal */}
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
          <Typography variant="h6" sx={{ mb: 2 }}>Edit Banner</Typography>
          {currentBanner && (
            <>
              <TextField
                fullWidth
                label="Heading"
                name="heading"
                value={currentBanner.heading}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={currentBanner.description}
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
  );
};

export default BannersDashboard;