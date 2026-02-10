import axios from "axios";
import { origin } from "./config";
import { toast } from "react-toastify";

interface ContactForm {
  id: string;
  fullName: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse {
  data: ContactForm[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export const createContactus = async (data: {
  fullName: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<ContactForm> => {
  try {
    const response = await axios.post(`${origin}/api/v1/contact`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Contact form submitted successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Contact form submission failed:", error);
    toast.error(`Failed to submit contact form: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchContactForms = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get(`${origin}/api/v1/contact`, {
      params: { page, limit },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching contact forms:", error);
    toast.error(`Failed to fetch contact forms: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const fetchContactFormById = async (id: string): Promise<ContactForm> => {
  try {
    const response = await axios.get(`${origin}/api/v1/contact/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching contact form:", error);
    toast.error(`Failed to fetch contact form: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const updateContactForm = async (
  id: string,
  data: {
    fullName?: string;
    email?: string;
    subject?: string;
    message?: string;
  }
): Promise<ContactForm> => {
  try {
    const response = await axios.put(`${origin}/api/v1/contact/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Contact form updated successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Error updating contact form:", error);
    toast.error(`Failed to update contact form: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const deleteContactForm = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${origin}/api/v1/contact/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Contact form deleted successfully!");
  } catch (error: any) {
    console.error("Error deleting contact form:", error);
    toast.error(`Failed to delete contact form: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};