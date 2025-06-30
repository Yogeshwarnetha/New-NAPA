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
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboardLayout from "..";
import { AiOutlineClose } from "react-icons/ai";
import CreateGallery from "./create-gallery";
import { fetchGalleryPagination, deleteGalleryItem } from "../../../apirequest/gallery";

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
    };

    const handleEditSubmit = async (editedItem: GalleryItem) => {
        try {
            // Here you would typically call an API to update the item
            // For now, we'll just update the local state
            const updatedItems = galleryItems.map(item =>
                item.id === editedItem.id ? editedItem : item
            );
            setGalleryItems(updatedItems);
            toast.success("Gallery item updated successfully!");
            handleEditClose();
        } catch (error) {
            console.error("Failed to update gallery item:", error);
            toast.error("Failed to update gallery item");
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
                <DialogContent>
                    {itemToEdit && (
                        <Box sx={{ mt: 2 }}>
                            {/* You can reuse your CreateGallery component here or create a separate EditGallery component */}
                            {/* For now, I'll show a simple form - replace this with your actual edit form */}
                            <Typography variant="h6">Editing: {itemToEdit.event_name}</Typography>
                            <Box sx={{ my: 2 }}>
                                <img
                                    src={itemToEdit.image_url}
                                    alt={itemToEdit.event_name}
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </Box>
                            {/* Add your form fields here */}
                            {/* Example: */}
                            {/* <TextField 
                                label="Event Name"
                                value={itemToEdit.event_name}
                                onChange={(e) => setItemToEdit({...itemToEdit, event_name: e.target.value})}
                                fullWidth
                                sx={{ mb: 2 }}
                            /> */}
                            {/* Add other fields similarly */}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => itemToEdit && handleEditSubmit(itemToEdit)}
                        color="primary"
                        variant="contained"
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </AdminDashboardLayout>
    );
};

export default GalleryDashboard;