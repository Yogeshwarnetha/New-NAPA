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
import CreateEvent from "./create-project";
import { AiOutlineClose } from "react-icons/ai";

// Dummy data for Events
const dummyProjects = [
  {
    id: "1",
    heading: "Annual Tech Conference",
    description: "A conference on the latest trends in tech.",
    imageurl: "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg?w=1920&q=60&fm=webp",
  },
  {
    id: "2",
    heading: "Music Festival",
    description: "A festival featuring top artists from around the world.",
    imageurl: "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg?w=1920&q=60&fm=webp",
  },
  {
    id: "3",
    heading: "Charity Run",
    description: "A charity run to raise funds for education.",
    imageurl: "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg?w=1920&q=60&fm=webp",
  },
];

interface Event {
  id: string;
  heading: string;
  description: string;
  imageurl: string;
}

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState<Event[]>([]); // Initially empty
  const [loading, setLoading] = useState<boolean>(true); // Set loading state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count] = useState(3);
  const [openImageModal, setOpenImageModal] = useState(false); // State for image modal
  const [selectedImage, setSelectedImage] = useState<string>(""); // State for selected image

  useEffect(() => {
    setTimeout(() => {
      setProjects(dummyProjects);
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

  const Child = ({ data }: { data: Event }) => (
    <TableRow key={data.id}>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.heading}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.description}</TableCell>
      <TableCell>
        <img
          src={data.imageurl}
          alt="Project Image"
          style={{ maxWidth: '100px', height: 'auto', cursor: 'pointer' }}
          onClick={() => openImagePopup(data.imageurl)} // Handle image click
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" color="primary" sx={{mr:1}}>
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
          <CreateEvent />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ m: 2 }}>Project Table</Typography>
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
              // The actual data rendering
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Heading</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project) => (
                    <Child key={project.id} data={project} />
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
            <img src={selectedImage} alt="Selected Project" style={{ maxWidth: '600px', height: 'auto' }} />
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

export default ProjectsDashboard;
