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
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import AdminDashboardLayout from "..";
import { AiOutlineClose } from "react-icons/ai";
import CreateBanner from "./create-banner";
import { fetchBannerPagination } from "../../../apirequest/banner";

const BannersDashboard = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchBannerPagination(page, limit);
        setBanners(data.data);
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, limit]);

  const handleChangePage = (_:any, newPage:any) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const openImagePopup = (imageUrl:any) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const closeImagePopup = () => {
    setOpenImageModal(false);
  };

  const Child = ({ data }:any) => (
    <TableRow key={data?.id}>
      <TableCell>{data?.heading}</TableCell>
      <TableCell>{data?.description}</TableCell>
      <TableCell>
        <img
          src={data?.images[0]}
          alt="Banner Image"
          style={{ maxWidth: "100px", height: "auto", cursor: "pointer" }}
          onClick={() => openImagePopup(data.imageurl)}
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
          <CreateBanner />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ m: 2 }}>Banner Table</Typography>
          <TableContainer>
            {loading ? (
              <Typography sx={{ textAlign: "center", py: 3 }}>Loading...</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {banners?.map((banner:any) => (
                    <Child key={banner?.id} data={banner} />
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
