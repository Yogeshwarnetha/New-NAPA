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
import { AiOutlineClose } from "react-icons/ai";
import CreateBanner from "./create-banner";

// Dummy data for Banners
const dummyBanners = [
  {
    id: "1",
    title: "New Year Sale",
    description: "Get 50% off on all products this New Year!",
    imageurl: "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg?w=1920&q=60&fm=webp",
  },
  {
    id: "2",
    title: "Black Friday Deals",
    description: "Massive discounts on electronics and gadgets.",
    imageurl: "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg?w=1920&q=60&fm=webp",
  },
  {
    id: "3",
    title: "Summer Collection",
    description: "Check out our new arrivals for the summer season.",
    imageurl: "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg?w=1920&q=60&fm=webp",
  },
];

interface Banner {
  id: string;
  title: string;
  description: string;
  imageurl: string;
}

const BannersDashboard = () => {
  const [banners, setBanners] = useState<Banner[]>([]); // Initially empty
  const [loading, setLoading] = useState<boolean>(true); // Set loading state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count] = useState(3);
  const [openImageModal, setOpenImageModal] = useState(false); // State for image modal
  const [selectedImage, setSelectedImage] = useState<string>(""); // State for selected image

  useEffect(() => {
    setTimeout(() => {
      setBanners(dummyBanners);
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

  const Child = ({ data }: { data: Banner }) => (
    <TableRow key={data.id}>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.title}</TableCell>
      <TableCell sx={{ fontFamily: 'Poppins', fontSize: 14 }}>{data.description}</TableCell>
      <TableCell>
        <img
          src={data.imageurl}
          alt="Banner Image"
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
          <CreateBanner />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ m: 2 }}>Banner Table</Typography>
          <TableContainer>
            {loading ? (
              <Table className="shimmer-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="shimmer-placeholder" style={{ width: "30%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "40%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "20%" }} />
                    <TableCell className="shimmer-placeholder" style={{ width: "10%" }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(3)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="shimmer-cell" />
                      <TableCell className="shimmer-cell" />
                      <TableCell className="shimmer-cell" />
                      <TableCell className="shimmer-cell" />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              // The actual data rendering
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Jost' }}>Image</TableCell>
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
    </AdminDashboardLayout>
  );
};

export default BannersDashboard;
