import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { PlusCircle } from "lucide-react";
import { useBoardMembers } from "../../../hooks/useBoardForm";

const BoardMembers = () => {
  const [open, setOpen] = useState(false);
  const { formData, errors, handleInputChange, resetForm, handleSubmit, categories } = useBoardMembers();

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
        Add Board Member
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
            Add Board Member
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Fill in the details below to add a new board member.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Member Name */}
              <TextField
                id="memberName"
                name="memberName"
                label="Member Name"
                placeholder="Enter member name"
                value={formData.name}
                onChange={handleChange} 
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
              />

              {/* Category Select */}
              <FormControl fullWidth error={Boolean(errors.category_id)}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="categoryId"
                  name="categoryId"
                  value={formData.category_id ?? ""}
                  onChange={(e:any) => handleChange(e)}
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {categories.map((category: any) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.category_id}</FormHelperText>
              </FormControl>

              {/* Image URL */}
              <TextField
                id="photo_url"
                name="photo_url"
                label="Image URL"
                placeholder="Enter image URL"
                value={formData.photo_url}
                onChange={handleChange}
                error={Boolean(errors.photo_url)}
                helperText={errors.photo_url}
                fullWidth
              />

              {/* Designation */}
              <TextField
                id="designation"
                name="designation"
                label="Designation"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={(e) => handleChange(e)}
                error={Boolean(errors.designation)}
                helperText={errors.designation}
                fullWidth
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Add Member
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default BoardMembers;
