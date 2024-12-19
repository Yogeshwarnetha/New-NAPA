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
import { AiOutlineClose } from "react-icons/ai";
import AdminDashboardLayout from "..";
import BoardMembers from "./create-boardmembers";

// Dummy data for Board Members
const dummyBoardMembers = [
  {
    id: "1",
    name: "John Doe",
    position: "Chairman",
    category: "Executive Board",
    imageurl: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Treasurer",
    category: "Executive Board",
    imageurl: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    name: "David Brown",
    position: "Member",
    category: "Advisory Board",
    imageurl: "https://via.placeholder.com/100",
  },
  {
    id: "4",
    name: "Emily Davis",
    position: "Secretary",
    category: "Advisory Board",
    imageurl: "https://via.placeholder.com/100",
  },
];

interface BoardMember {
  id: string;
  name: string;
  position: string;
  category: string;
  imageurl: string;
}

const BoardMembersDashboard = () => {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count] = useState(dummyBoardMembers.length);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Fetching the dummy data
  useEffect(() => {
    setTimeout(() => {
      setBoardMembers(dummyBoardMembers);
      setLoading(false);
    }, 1000);
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

  // Render a single board member
  const MemberRow = ({ data }: { data: BoardMember }) => (
    <TableRow key={data.id}>
      <TableCell sx={{ fontFamily: "Poppins", fontSize: 14 }}>{data.name}</TableCell>
      <TableCell sx={{ fontFamily: "Poppins", fontSize: 14 }}>{data.position}</TableCell>
      <TableCell>
        <img
          src={data.imageurl}
          alt={`${data.name}`}
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

  // Grouping by category
  const groupedBoardMembers = boardMembers.reduce((acc, member) => {
    if (!acc[member.category]) acc[member.category] = [];
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, BoardMember[]>);

  return (
    <AdminDashboardLayout>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <BoardMembers/>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Board Members by Category
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            Object.keys(groupedBoardMembers).map((category) => (
              <Box key={category} sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: 18, mb: 2 }}
                >
                  {category}
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: "Jost" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: "Jost" }}>Position</TableCell>
                        <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: "Jost" }}>Image</TableCell>
                        <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: "Jost" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupedBoardMembers[category].map((member) => (
                        <MemberRow key={member.id} data={member} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 2,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <img
              src={selectedImage}
              alt="Selected Board Member"
              style={{ maxWidth: "600px", height: "auto" }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ position: "absolute", top: 0, right: 0 }}
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

export default BoardMembersDashboard;
