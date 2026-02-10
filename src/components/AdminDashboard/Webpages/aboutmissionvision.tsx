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
    fetchAboutMissionVision,
    updateAboutMissionVision,
    AboutMissionVision,
} from "../../../apirequest/aboutmissionvision";

const AboutMissionVisionDashboard = () => {
    const [content, setContent] = useState<AboutMissionVision | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentContent, setCurrentContent] = useState<AboutMissionVision | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const loadContent = async () => {
            try {
                setLoading(true);
                const data = await fetchAboutMissionVision();
                setContent(data);
            } catch (error) {
                toast.error("Failed to load content");
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
            const updated = await updateAboutMissionVision(currentContent);
            setContent(updated);
            toast.success("Content updated successfully!");
            setEditModalOpen(false);
        } catch (error) {
            toast.error("Failed to update content");
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
        <><ToastContainer /><Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5">About Mission & Vision Content</Typography>
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
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : content ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Field</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Content</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(content).map(([key, value]) => {
                                if (key === "id" || key === "createdAt" || key === "updatedAt") return null;
                                return (
                                    <TableRow key={key}>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            {key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                                        </TableCell>
                                        <TableCell>{value}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No content available</Typography>
            )}
        </Box>

            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxWidth: 800,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 1,
                        maxHeight: "80vh",
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Edit About Mission & Vision Content
                    </Typography>

                    {currentContent && (
                        <Box component="form" sx={{ "& .MuiTextField-root": { mb: 2 } }}>
                            <TextField
                                fullWidth
                                label="Mission & Vision Heading"
                                name="missionvision_heading"
                                value={currentContent.missionvision_heading}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Mission & Vision Description"
                                name="missionvision_description"
                                value={currentContent.missionvision_description}
                                onChange={handleChange}
                                multiline
                                rows={3}
                            />
                            <TextField
                                fullWidth
                                label="Vision Main Heading"
                                name="vision_mainHeading"
                                value={currentContent.vision_mainHeading}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Vision Paragraph 1"
                                name="vision_para1"
                                value={currentContent.vision_para1}
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                            <TextField
                                fullWidth
                                label="Vision Paragraph 2"
                                name="vision_para2"
                                value={currentContent.vision_para2}
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                            <TextField
                                fullWidth
                                label="Mission Main Heading"
                                name="mission_mainHeading"
                                value={currentContent.mission_mainHeading}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Mission Paragraph 1"
                                name="mission_para1"
                                value={currentContent.mission_para1}
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                            <TextField
                                fullWidth
                                label="Mission Paragraph 2"
                                name="mission_para2"
                                value={currentContent.mission_para2}
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                            <TextField
                                fullWidth
                                label="Join Our Community"
                                name="joinourcommunity"
                                value={currentContent.joinourcommunity}
                                onChange={handleChange}
                                multiline
                                rows={2}
                            />

                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                <Button onClick={() => setEditModalOpen(false)} sx={{ mr: 2 }}>
                                    Cancel
                                </Button>
                                <Button variant="contained" onClick={handleSave} disabled={updating}>
                                    {updating ? <CircularProgress size={24} /> : "Save Changes"}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default AboutMissionVisionDashboard;
