import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import AdminDashboardLayout from "..";
import { signupAdmin } from "../../../apirequest/adminAuth";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      await signupAdmin(formData);
      setMessage({ type: "success", text: "Admin created successfully." });
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error: any) {
      setMessage({ type: "error", text: error?.response?.data?.message || "Failed to create admin." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3, maxWidth: 520 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Create Admin
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? "Creating..." : "Create Admin"}
            </Button>
          </Box>
        </Box>
      </Box>
    </AdminDashboardLayout>
  );
};

export default CreateAdmin;
