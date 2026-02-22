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
    CircularProgress,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboardLayout from "..";
import { AiOutlineClose } from "react-icons/ai";
import CreateGallery from "./create-gallery";
import { fetchGalleryPagination, deleteGalleryItem, updateGalleryItem } from "../../../apirequest/gallery";

interface GalleryItem {
    id: string | number;
    event_name: string;
    google_photo_url: string;
    image_url: string;
    createdAt?: string;
    updatedAt?: string;
}

const GalleryDashboard = () => {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [count, setCount] = useState(0);
    const [openImageModal, setOpenImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<GalleryItem | null>(null);
    const [editEventName, setEditEventName] = useState("");
    const [editGooglePhotoUrl, setEditGooglePhotoUrl] = useState("");
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string>("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchGalleryPagination(page, limit);
                setGalleryItems(data?.data);
                setCount(data.count);
            } catch (error) {
                console.error("Failed to fetch gallery items:", error);
                toast.error("Failed to load gallery items");
            }
            setLoading(false);
        };
        fetchData();
    }, [page, limit]);

    const handleDeleteClick = (item: GalleryItem) => {
        setItemToDelete(item);
        setDeleteConfirmOpen(true);
    };

    const handleEditClick = (item: GalleryItem) => {
        setItemToEdit(item);
        setEditEventName(item.event_name);
        setEditGooglePhotoUrl(item.google_photo_url);
        setEditImageFile(null);
        setEditImagePreview("");
        setEditModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            await deleteGalleryItem(Number(itemToDelete.id));
            // Refresh the gallery list after deletion
            const data = await fetchGalleryPagination(page, limit);
            setGalleryItems(data?.data);
            setCount(data.count);
            toast.success("Gallery item deleted successfully!");
        } catch (error) {
            console.error("Failed to delete gallery item:", error);
            toast.error("Failed to delete gallery item");
        } finally {
            setDeleteConfirmOpen(false);
            setItemToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmOpen(false);
        setItemToDelete(null);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
        setItemToEdit(null);
        setEditEventName("");
        setEditGooglePhotoUrl("");
        setEditImageFile(null);
        setEditImagePreview("");
    };

    const handleEditSubmit = async () => {
        if (!itemToEdit) return;
        
        try {
            setUpdating(true);
            const formData = new FormData();
            formData.append('event_name', editEventName);
            formData.append('google_photo_url', editGooglePhotoUrl);
            
            if (editImageFile) {
                formData.append('image', editImageFile);
            }
            
            await updateGalleryItem(Number(itemToEdit.id), formData);
            
            // Refresh the gallery list
            const data = await fetchGalleryPagination(page, limit);
            setGalleryItems(data?.data);
            setCount(data.count);
            
            handleEditClose();
        } catch (error) {
            console.error("Failed to update gallery item:", error);
        } finally {
            setUpdating(false);
        }
    };
    
    const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setEditImageFile(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
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

    const Child = ({ data }: { data: GalleryItem }) => (
        <TableRow key={data.id}>
            <TableCell>{data.event_name}</TableCell>
            <TableCell>
                <a href={data.google_photo_url} target="_blank" rel="noopener noreferrer">
                    View Google Photos
                </a>
            </TableCell>
            <TableCell>
                <img
                    src={data.image_url}
                    alt={data.event_name}
                    style={{ maxWidth: "100px", height: "auto", cursor: "pointer" }}
                    onClick={() => openImagePopup(data.image_url)}
                />
            </TableCell>
            <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(data)}
                        sx={{ mr: 1 }}
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
                </Box>
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
                    <CreateGallery />
                </Box>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ m: 2 }}>Gallery Table</Typography>
                    <TableContainer>
                        {loading ? (
                            <Typography sx={{ textAlign: "center", py: 3 }}>Loading...</Typography>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Event Name</TableCell>
                                        <TableCell>Google Photos</TableCell>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {galleryItems.map((item) => (
                                        <Child key={item.id} data={item} />
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
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <img src={selectedImage} alt="Gallery Item" style={{ maxWidth: '600px', height: 'auto' }} />
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
                        Are you sure you want to delete the gallery item "{itemToDelete?.event_name}"? This action cannot be undone.
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

            {/* Edit Modal */}
            <Dialog
                open={editModalOpen}
                onClose={handleEditClose}
                aria-labelledby="edit-dialog-title"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="edit-dialog-title">Edit Gallery Item</DialogTitle>
                <DialogContent dividers sx={{ maxHeight: '70vh' }}>
                    {itemToEdit && (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Event Name"
                                value={editEventName}
                                onChange={(e) => setEditEventName(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                fullWidth
                                label="Google Photos URL"
                                value={editGooglePhotoUrl}
                                onChange={(e) => setEditGooglePhotoUrl(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            {/* Current Image */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                    Current Image:
                                </Typography>
                                <Box
                                    component="img"
                                    src={itemToEdit.image_url}
                                    alt={itemToEdit.event_name}
                                    sx={{
                                        width: '100%',
                                        maxWidth: 400,
                                        height: 'auto',
                                        borderRadius: 1,
                                        border: '1px solid #ddd'
                                    }}
                                />
                            </Box>
                            
                            {/* Upload New Image */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                    Update Image (Optional)
                                </Typography>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >
                                    Upload New Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleEditImageChange}
                                    />
                                </Button>
                                
                                {/* New Image Preview */}
                                {editImagePreview && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                                            New Image Preview:
                                        </Typography>
                                        <Box
                                            component="img"
                                            src={editImagePreview}
                                            alt="Preview"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 400,
                                                height: 'auto',
                                                borderRadius: 1,
                                                border: '2px solid #1976d2'
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary" disabled={updating}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEditSubmit}
                        color="primary"
                        variant="contained"
                        disabled={updating}
                    >
                        {updating ? <CircularProgress size={24} /> : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>
        </AdminDashboardLayout>
    );
};

export default GalleryDashboard;