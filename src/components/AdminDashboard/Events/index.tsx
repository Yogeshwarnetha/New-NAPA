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
  DialogContentText,
  DialogActions,
  Modal,
  TextField,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboardLayout from "..";
import CreateEvent from "./create-event";
import { fetchEventsPagination, deleteEvent, updateEvent } from "../../../apirequest/events";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  place: string;
}

const EventsDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchEventsPagination(page, limit);
        setEvents(data.data);
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        toast.error("Failed to load events");
      }
      setLoading(false);
    };
    fetchData();
  }, [page, limit]);

  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      await deleteEvent(eventToDelete.id);
      // Refresh the events list after deletion
      const data = await fetchEventsPagination(page, limit);
      setEvents(data.data);
      setCount(data.count);
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event");
    } finally {
      setDeleteConfirmOpen(false);
      setEventToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setEventToDelete(null);
  };

  const handleEditClick = (event: Event) => {
    setCurrentEvent(event);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!currentEvent) return;

    try {
      await updateEvent(currentEvent.id, {
        name: currentEvent.name,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        place: currentEvent.place
      });
      // Refresh the events list after update
      const data = await fetchEventsPagination(page, limit);
      setEvents(data.data);
      setCount(data.count);
      toast.success("Event updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Failed to update event");
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setCurrentEvent(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentEvent) return;
    setCurrentEvent({
      ...currentEvent,
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

  const Child = ({ data }: { data: Event }) => (
    <TableRow key={data.id}>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.name}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.description}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.date}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.time}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.place}</TableCell>
      <TableCell>
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
      </TableCell>
    </TableRow>
  );

  return (
    <AdminDashboardLayout>
      {/* Toast Container - Add this at the top of your JSX */}
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
          <CreateEvent />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ m: 2 }}>Events Table</Typography>
          <TableContainer>
            {loading ? (
              <Table className="shimmer-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="shimmer-placeholder" style={{ width: "30%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "40%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "20%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "10%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "10%" }} />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(3)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="shimmer-cell" />
                      <TableCell className="shimmer-cell" />
                      <TableCell className="shimmer-cell" />
                      <TableCell className="shimmer-cell" />
                      <TableCell className="shimmer-cell" />
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Event Name</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Place</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <Child key={event.id} data={event} />
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
            Are you sure you want to delete the event "{eventToDelete?.name}"? This action cannot be undone.
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

      {/* Edit Event Modal */}
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
          <Typography variant="h6" sx={{ mb: 2 }}>Edit Event</Typography>
          {currentEvent && (
            <>
              <TextField
                fullWidth
                label="Event Name"
                name="name"
                value={currentEvent.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={currentEvent.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date"
                name="date"
                value={currentEvent.date}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Time"
                name="time"
                value={currentEvent.time}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Place"
                name="place"
                value={currentEvent.place}
                onChange={handleChange}
                sx={{ mb: 2 }}
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

export default EventsDashboard;