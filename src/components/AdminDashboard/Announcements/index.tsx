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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Paper,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboardLayout from "..";
import {
  fetchAnnouncementsPagination,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  Announcement,
} from "../../../apirequest/announcement";

const AnnouncementsDashboard = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0); // MUI TablePagination is 0-indexed
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  
  // Modals
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Delete Confirm
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);

  const fetchData = async (currentPage: number, currentLimit: number) => {
    setLoading(true);
    try {
      // Backend expects 1-indexed page
      const data = await fetchAnnouncementsPagination(currentPage + 1, currentLimit);
      setAnnouncements(data.data);
      setCount(data.count);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      toast.error("Failed to load announcements");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setText("");
    setLink("");
    setIsActive(true);
    setOpenModal(true);
  };

  const handleOpenEdit = (announcement: Announcement) => {
    setIsEditMode(true);
    setCurrentId(announcement.id);
    setText(announcement.text);
    setLink(announcement.link || "");
    setIsActive(announcement.is_active);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Announcement text is required");
      return;
    }

    try {
      if (isEditMode && currentId) {
        await updateAnnouncement(currentId, {
          text,
          link: link.trim() || undefined,
          is_active: isActive,
        });
      } else {
        await createAnnouncement({
          text,
          link: link.trim() || undefined,
          is_active: isActive,
        });
      }
      setOpenModal(false);
      fetchData(page, limit);
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  const handleDeleteClick = (announcement: Announcement) => {
    setAnnouncementToDelete(announcement);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!announcementToDelete) return;
    try {
      await deleteAnnouncement(announcementToDelete.id);
      setDeleteConfirmOpen(false);
      setAnnouncementToDelete(null);
      // If we deleted the last item on the page, go to prev page
      const newPage = (announcements.length === 1 && page > 0) ? page - 1 : page;
      setPage(newPage);
      fetchData(newPage, limit);
    } catch (error) {
      console.error("Failed to delete announcement:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setAnnouncementToDelete(null);
  };

  const handleToggleActive = async (announcement: Announcement) => {
    try {
      await updateAnnouncement(announcement.id, {
        is_active: !announcement.is_active,
      });
      fetchData(page, limit);
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '85vh', borderRadius: 4 }}>
        <ToastContainer position="top-right" autoClose={3000} />
        
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
              Announcements Management
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#64748b', mt: 0.5 }}>
              Manage scrolling marquee announcements shown on the homepage header.
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleOpenAdd}
            sx={{
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' },
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: '600',
              borderRadius: 2,
              boxShadow: '0 4px 6px -1px rgb(59 130 246 / 0.1), 0 2px 4px -2px rgb(59 130 246 / 0.1)'
            }}
          >
            Add Announcement
          </Button>
        </Box>

        {/* Table Content */}
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)', overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: '#f1f5f9' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Announcement Text</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Hyperlink</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#475569', width: '120px' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#475569', width: '180px' }}>Created Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569', width: '150px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#64748b' }}>
                    Loading announcements...
                  </TableCell>
                </TableRow>
              ) : announcements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#64748b' }}>
                    No announcements found. Click "Add Announcement" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                announcements.map((announcement) => (
                  <TableRow key={announcement.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: '#334155', fontWeight: '500' }}>
                      {announcement.text}
                    </TableCell>
                    <TableCell>
                      {announcement.link ? (
                        <a
                          href={announcement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 hover:underline break-all"
                        >
                          {announcement.link}
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={announcement.is_active}
                            onChange={() => handleToggleActive(announcement)}
                            color="primary"
                            size="small"
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: '0.875rem', fontWeight: '600', color: announcement.is_active ? '#10b981' : '#ef4444' }}>
                            {announcement.is_active ? "Active" : "Inactive"}
                          </Typography>
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#64748b' }}>
                      {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenEdit(announcement)}
                          sx={{
                            color: '#64748b',
                            borderColor: '#cbd5e1',
                            '&:hover': { borderColor: '#94a3b8', bgcolor: '#f8fafc' },
                            minWidth: 'auto',
                            p: 1,
                            borderRadius: 1.5
                          }}
                        >
                          <MdEdit size={18} />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(announcement)}
                          sx={{
                            borderColor: '#fee2e2',
                            color: '#ef4444',
                            '&:hover': { borderColor: '#fca5a5', bgcolor: '#fef2f2' },
                            minWidth: 'auto',
                            p: 1,
                            borderRadius: 1.5
                          }}
                        >
                          <MdDelete size={18} />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
          />
        </TableContainer>
      </Box>

      {/* Add / Edit Dialog */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', pb: 1 }}>
            {isEditMode ? "Edit Announcement" : "Add Announcement"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <TextField
                required
                fullWidth
                label="Announcement Text"
                placeholder="Enter announcement text scrolling on marquee"
                multiline
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Hyperlink (Optional)"
                placeholder="e.g. https://napaconvention.org/"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                variant="outlined"
                helperText="Link when announcement is clicked (opens in new tab)."
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography sx={{ fontWeight: '500' }}>
                    Show in Marquee (Active)
                  </Typography>
                }
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button onClick={handleCloseModal} sx={{ color: '#64748b', textTransform: 'none', fontWeight: '600' }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' }, textTransform: 'none', fontWeight: '600', px: 3, borderRadius: 2 }}>
              {isEditMode ? "Save Changes" : "Add Announcement"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleCancelDelete} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Delete Announcement</DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          Are you sure you want to delete this announcement? This action cannot be undone.
          {announcementToDelete && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 2, borderLeft: '4px solid #ef4444' }}>
              <Typography variant="body2" sx={{ color: '#334155', fontWeight: '500' }}>
                {announcementToDelete.text}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCancelDelete} sx={{ color: '#64748b', textTransform: 'none', fontWeight: '600' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" sx={{ textTransform: 'none', fontWeight: '600', px: 3, borderRadius: 2 }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default AnnouncementsDashboard;
