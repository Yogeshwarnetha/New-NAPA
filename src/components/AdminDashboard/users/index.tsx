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
  Tooltip,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboardLayout from "..";
import { fetchUsersPaginationsData, updateUser, deleteUser } from "../../../apirequest/users";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  occupation: string;
  companyName: string;
  gothram: string;
  referredBy: string;
}

const UsersDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(3);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchUsersPaginationsData(page, limit);
        const users = data?.data;
        const paginationInfo = data?.pagination;

        setUsers(users); 
        setCount(paginationInfo?.totalItems || 0); 

        console.log(data)
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  const handleDeleteClick = (user: UserData) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      const data = await fetchUsersPaginationsData(page, limit);
      setUsers(data.data);
      setCount(data.pagination?.totalItems || 0);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    } finally {
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleEditClick = (user: UserData) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!currentUser) return;

    try {
      await updateUser(currentUser.id, {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        gender: currentUser.gender,
        address1: currentUser.address1,
        address2: currentUser.address2,
        city: currentUser.city,
        state: currentUser.state,
        country: currentUser.country,
        zip: currentUser.zip,
        occupation: currentUser.occupation,
        companyName: currentUser.companyName,
        gothram: currentUser.gothram,
        referredBy: currentUser.referredBy,
      });
      const data = await fetchUsersPaginationsData(page, limit);
      setUsers(data.data);
      setCount(data.pagination?.totalItems || 0);
      toast.success("User updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setCurrentUser(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value
    });
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const Child = ({ data }: { data: UserData }) => (
    <TableRow key={data.id}>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.firstName} {data.lastName}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.email}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.phoneNumber}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.gender}</TableCell>

      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>
        <Tooltip title={`${data.address1}, ${data.address2}, ${data.city}, ${data.state}, ${data.country}`}>
          <span>{`${data.address1}, ${data.address2}, ${data.city}`}</span>
        </Tooltip>
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
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Users Table
          </Typography>
          <TableContainer>
            {loading ? (
              <Table className="shimmer-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="shimmer-placeholder" style={{ width: "25%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "25%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "30%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "20%" }} />
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
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Full Name</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Mobile Number</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Gender</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((x) => (
                    <Child key={x.id} data={x} />
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
            Are you sure you want to delete user "{userToDelete?.firstName} {userToDelete?.lastName}"? This action cannot be undone.
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

      {/* Edit User Modal */}
      <Modal open={editModalOpen} onClose={handleEditCancel}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>Edit User</Typography>
          {currentUser && (
            <>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={currentUser.firstName}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={currentUser.lastName}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={currentUser.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={currentUser.phoneNumber}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={currentUser.gender}
                  onChange={(e) => setCurrentUser({...currentUser, gender: e.target.value})}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Address Line 1"
                name="address1"
                value={currentUser.address1}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address Line 2"
                name="address2"
                value={currentUser.address2}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                value={currentUser.city}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="State"
                name="state"
                value={currentUser.state}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={currentUser.country}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="ZIP Code"
                name="zip"
                value={currentUser.zip}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Occupation"
                name="occupation"
                value={currentUser.occupation}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={currentUser.companyName}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Gothram"
                name="gothram"
                value={currentUser.gothram}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Referred By"
                name="referredBy"
                value={currentUser.referredBy}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button onClick={handleEditCancel} variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleEditSubmit} variant="contained" color="primary">
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

export default UsersDashboard;
