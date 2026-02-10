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
import { fetchBoardofDirectorsPagination, updateBoardMember, deleteBoardMember } from "../../../apirequest/boardMember";
import CreateBoardofDirector from "./createBoardofDirectors";

interface BoardMember {
  id: number;
  name: string;
  imageUrl: string;
}

const BoardofDirectorsDashboard = () => {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editMember, setEditMember] = useState<BoardMember | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchBoardofDirectorsPagination(page, limit);
        setBoardMembers(response.data || []);
        setCount(response.count || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page
  };

  const openImagePopup = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const closeImagePopup = () => {
    setOpenImageModal(false);
  };

  const handleEditOpen = (member: BoardMember) => {
    setEditMember(member);
    setEditName(member.name);
    setEditImage(null);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditMember(null);
    setEditName("");
    setEditImage(null);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editMember) return;
    setEditLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', editName);
      if (editImage) formData.append('image', editImage);
      await updateBoardMember(editMember.id, formData);
      handleEditClose();
      setPage(1);
    } catch (error) {
      alert('Failed to update member');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await deleteBoardMember(id);
      setPage(1);
    } catch (error) {
      alert('Failed to delete member');
    }
  };

  return (
      <>
      <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CreateBoardofDirector />
        </Box>
          <Typography variant="h6" sx={{ m: 2 }}>
          Board of Directors Members
          </Typography>

          {loading ? (
              <Typography>Loading...</Typography>
          ) : (
              <TableContainer>
                  <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Name</TableCell>
                              <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Image</TableCell>
                              <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Actions</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {boardMembers.map((member) => (
                              <TableRow key={member.id}>
                                  <TableCell sx={{ fontSize: 14 }}>{member.name}</TableCell>
                                  <TableCell>
                                      <img
                                          src={member.imageUrl}
                                          alt={member.name}
                                          style={{ maxWidth: "100px", height: "auto", cursor: "pointer" }}
                                          onClick={() => openImagePopup(member.imageUrl)} />
                                  </TableCell>
                                  <TableCell>
                                      <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleEditOpen(member)}>
                                          <MdEdit fontSize={20} /> Edit
                                      </Button>
                                      <Button variant="contained" color="error" onClick={() => handleDelete(member.id)}>
                                          <MdDelete fontSize={20} /> Delete
                                      </Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          )}

          <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={count}
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeRowsPerPage} />
      </Box><Modal open={openImageModal} onClose={closeImagePopup}>
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
                          style={{ maxWidth: "600px", height: "auto" }} />
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
          <Modal open={editModalOpen} onClose={handleEditClose}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
              minWidth: 300,
            }}>
              <Typography variant="h6">Edit Board of Directors Member</Typography>
              <form onSubmit={handleEditSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    placeholder="Name"
                    required
                  />
                  <input
                    type="file"
                    onChange={e => setEditImage(e.target.files?.[0] || null)}
                  />
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button type="button" variant="outlined" onClick={handleEditClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={editLoading}>Save</Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Modal></>
  );
};

export default BoardofDirectorsDashboard;
