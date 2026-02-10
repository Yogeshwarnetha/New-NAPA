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
    Typography,
    Modal,
    TextField,
    CircularProgress,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    fetchHomepageData,
    updateHomepageData,
    HomepageData,
} from "../../../apirequest/homepage";
import AdminDashboardLayout from "..";

const HomepageDashboard = () => {
    const [content, setContent] = useState<HomepageData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentContent, setCurrentContent] = useState<HomepageData | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const loadContent = async () => {
            try {
                setLoading(true);
                const data = await fetchHomepageData();
                setContent(data);
            } catch (error) {
                toast.error("Failed to load homepage content");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, []);

    const handleEditClick = () => {
        if (content) {
            setCurrentContent({ ...content });
            setEditModalOpen(true);
        }
    };

    const handleSave = async () => {
        if (!currentContent) return;
        try {
            setUpdating(true);
            const updatedContent = await updateHomepageData(currentContent);
            setContent(updatedContent);
            toast.success("Homepage content updated successfully!");
            setEditModalOpen(false);
        } catch (error) {
            toast.error("Failed to update homepage content");
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentContent) {
            setCurrentContent({
                ...currentContent,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <AdminDashboardLayout>
            <ToastContainer />
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5">Homepage Content</Typography>
                    <Button
                        variant="contained"
                        startIcon={<MdEdit />}
                        onClick={handleEditClick}
                        disabled={loading || !content}
                    >
                        Edit Content
                    </Button>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : content ? (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Field</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Content</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(content).map(([key, value]) => {
                                    if (key === 'id' || key === 'createdAt' || key === 'updatedAt') return null;
                                    return (
                                        <TableRow key={key}>
                                            <TableCell sx={{ fontWeight: '600' }}>
                                                {key
                                                    .replace(/([A-Z])/g, " $1")
                                                    .replace(/^./, str => str.toUpperCase())
                                                    .split(/(?=[A-Z])/)
                                                    .join(" ")}
                                            </TableCell>
                                            <TableCell>{value}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography>No homepage content available</Typography>
                )}
            </Box>

            {/* Edit Modal */}
            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 1,
                    maxHeight: '80vh',
                    overflowY: 'auto'
                }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>Edit Homepage Content</Typography>

                    {currentContent && (
                        <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                            <TextField
                                fullWidth
                                label="About Us Paragraph 1"
                                name="homeAboutuspara1"
                                value={currentContent.homeAboutuspara1}
                                onChange={handleChange}
                                multiline
                                rows={2}
                            />
                            <TextField
                                fullWidth
                                label="About Us Paragraph 2"
                                name="homeAboutuspara2"
                                value={currentContent.homeAboutuspara2}
                                onChange={handleChange}
                                multiline
                                rows={2}
                            />
                            <TextField
                                fullWidth
                                label="About Us Paragraph 3"
                                name="homeAboutuspara3"
                                value={currentContent.homeAboutuspara3}
                                onChange={handleChange}
                                multiline
                                rows={2}
                            />
                            <TextField
                                fullWidth
                                label="President Name"
                                name="homepresidentName"
                                value={currentContent.homepresidentName}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="President Paragraph"
                                name="homepresidentpara"
                                value={currentContent.homepresidentpara}
                                onChange={handleChange}
                                multiline
                                rows={3}
                            />
                            <TextField
                                fullWidth
                                label="Donate Today Text"
                                name="homeDonateTodaytext"
                                value={currentContent.homeDonateTodaytext}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Services Matrimony"
                                name="servicesMatrimony"
                                value={currentContent.servicesMatrimony}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Our Gallery"
                                name="ourgallery"
                                value={currentContent.ourgallery}
                                onChange={handleChange}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button onClick={() => setEditModalOpen(false)} sx={{ mr: 2 }}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    disabled={updating}
                                >
                                    {updating ? <CircularProgress size={24} /> : 'Save Changes'}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
        </AdminDashboardLayout>
    );
};

export default HomepageDashboard;
