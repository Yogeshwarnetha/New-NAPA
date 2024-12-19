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
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import AdminDashboardLayout from "..";
import CreateTeamMember from "./create-team";
import { AiOutlineClose } from "react-icons/ai";

const dummyTeamMembers = [
  {
    id: "1",
    name: "John Doe",
    role: "Project Manager",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Developer",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "3",
    name: "Sam Wilson",
    role: "Designer",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

const TeamDashboard = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]); // Initially empty
  const [loading, setLoading] = useState<boolean>(true); // Set loading state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count] = useState(3);
  const [openImageModal, setOpenImageModal] = useState(false); // State for image modal
  const [selectedImage, setSelectedImage] = useState<string>(""); // State for selected image

  useEffect(() => {
    setTimeout(() => {
      setTeamMembers(dummyTeamMembers);
      setLoading(false);
    }, 2000);
  }, []);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const openImagePopup = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const closeImagePopup = () => {
    setOpenImageModal(false);
  };

  const Child = ({ data }: { data: TeamMember }) => (
    <TableRow key={data.id}>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.name}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.role}</TableCell>
      <TableCell>
        <img
          src={data.imageUrl}
          alt="Team Member"
          style={{ maxWidth: '100px', height: 'auto', cursor: 'pointer' }}
          onClick={() => openImagePopup(data.imageUrl)} // Handle image click
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
          <MdEdit fontSize={20} /> Edit
        </Button>
        <Button variant="contained" color="error">
          <MdDelete fontSize={20} /> Delete
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <AdminDashboardLayout>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CreateTeamMember /> {/* Component to create a new team member */}
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ m: 2 }}>Team Member Table</Typography>
          <TableContainer>
            {loading ? (
              <Table className="shimmer-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="shimmer-placeholder" style={{ width: "30%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "40%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "20%" }} />
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
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              // The actual data rendering
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.map((teamMember) => (
                    <Child key={teamMember.id} data={teamMember} />
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

      {/* Image Popup Modal */}
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
            <img src={selectedImage} alt="Selected Team Member" style={{ maxWidth: '600px', height: 'auto' }} />
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
    </AdminDashboardLayout>
  );
};

export default TeamDashboard;
