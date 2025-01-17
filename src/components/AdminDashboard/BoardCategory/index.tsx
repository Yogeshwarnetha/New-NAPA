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
import axios from "axios";
import { fetchBoardCategoriesPaginationsData } from "../../../apirequest/boardCategory";
import BoardCategory from "./create-boradcategory";

interface BoardCategory {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BoardCategoriesDashboard = () => {
  const [categories, setCategories] = useState<BoardCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BoardCategory | null>(null);

  // Fetch Board Categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchBoardCategoriesPaginationsData(page, limit)
        setCategories(response.data);
        setCount(response.data.totalCount);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, limit]);

  // Handlers
  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const openEditModal = (category: BoardCategory) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCategory(null);
    setEditModalOpen(false);
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await axios.delete(`/api/board-categories/${id}`);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <AdminDashboardLayout>
       <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <BoardCategory/>
        </Box>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Board Categories
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: "Jost" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: "Jost" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16, fontFamily: "Jost" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories?.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => openEditModal(category)}
                        >
                          <MdEdit fontSize={20} /> Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <MdDelete fontSize={20} /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={count}
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}

        {/* Edit Modal */}
        <Modal open={editModalOpen} onClose={closeEditModal}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 4,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Edit Category
            </Typography>
            {selectedCategory && (
              <>
                <Typography>ID: {selectedCategory.id}</Typography>
                <Typography>Name: {selectedCategory.name}</Typography>
                {/* Add form fields here for editing */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // Handle save logic
                      closeEditModal();
                    }}
                  >
                    Save
                  </Button>
                  <Button variant="contained" color="secondary" onClick={closeEditModal}>
                    Cancel
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </AdminDashboardLayout>
  );
};

export default BoardCategoriesDashboard;
