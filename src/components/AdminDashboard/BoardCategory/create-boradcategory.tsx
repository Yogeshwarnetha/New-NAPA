import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { PlusCircle } from "lucide-react";
import { useBoardCategory } from "../../../hooks/useBoardCategoryForm";

const BoardCategory = () => {
  const [open, setOpen] = useState(false);
  const { formData, errors, handleInputChange, resetForm, handleSubmit } = useBoardCategory();

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleInputChange(e as any);
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<PlusCircle />}
        onClick={() => setOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        Add Board Category
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Add Board Category
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Fill in the details below to add a new board member.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Member Name */}
              <TextField
                id="categoryName"
                name="name" // Match the key in formData
                label="Category Name"
                placeholder="Enter Category Name"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Add Category Name
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default BoardCategory;
