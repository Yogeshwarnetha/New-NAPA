import React, { ReactNode, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CiMenuFries } from "react-icons/ci";
import { FaCalendarAlt, FaProjectDiagram, FaPhotoVideo, FaNewspaper, FaAddressBook, FaDonate, FaEnvelopeOpenText, FaUsers, FaImages, FaUserTie, FaUsersCog, FaUserPlus, FaInfoCircle, FaChevronRight, FaBuilding, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import the navigate function for redirection
import Cookies from "js-cookie"; // Import Cookies to read and remove cookies
import './index.css';

// Admin menu items with corresponding icons
const adminList = [
  { id: 1, text: "Events", route: "/admin/events", icon: <FaCalendarAlt /> },
  { id: 2, text: "Projects", route: "/admin/projects", icon: <FaProjectDiagram /> },
  { id: 3, text: "Media", route: "/admin/gallery", icon: <FaPhotoVideo /> },
  { id: 4, text: "News", route: "/admin/news", icon: <FaNewspaper /> },
  { id: 5, text: "Contact Details", route: "/admin/contact", icon: <FaAddressBook /> },
  { id: 6, text: "Donations", route: "/admin/donations", icon: <FaDonate /> },
  { id: 7, text: "President Message", route: "/admin/president-message", icon: <FaEnvelopeOpenText /> },
  { id: 8, text: "Users", route: "/admin/users", icon: <FaUsers /> },
  { id: 9, text: "Banner Carousels", route: "/admin/banner-carousels", icon: <FaImages /> },
  { id: 10, text: "Create Chapters", route: "/admin/create-chapters", icon: <FaBuilding /> },
  { id: 11, text: "Chapter Directors", route: "/admin/create-chapterdirectors", icon: <FaUserShield /> },
  { id: 12, text: "Chapter Leads", route: "/admin/create-chapterleads", icon: <FaUserShield /> },
  { id: 13, text: "Board Category", route: "/admin/board-category", icon: <FaUserTie /> },
  { id: 14, text: "Members Board", route: "/admin/members-board", icon: <FaUserTie /> },
  { id: 15, text: "Special Committees", route: "/admin/special-committees", icon: <FaUsersCog /> },
  { id: 16, text: "Create Admin", route: "/admin/create-admin", icon: <FaUserPlus /> },
  { id: 17, text: "About NAPA", route: "/admin/about-napa", icon: <FaInfoCircle /> },
  { id: 18, text: "About Introduction", route: "/admin/about-introduction", icon: <FaInfoCircle /> },
  { id: 19, text: "Home Page", route: "/admin/home-page", icon: <FaInfoCircle /> },

];

interface AdminDashboardProps {
  children: ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardProps> = ({ children }) => {
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const adminAuthToken = Cookies.get("adminAuthToken") || Cookies.get("adminToken");
    if (!adminAuthToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("adminAuthToken");
    navigate("/admin/login");
  };

  return (
    <Box className="flex min-h-screen bg-gray-100 shadow-lg">
      {/* Left Sidebar */}
      <div className="left-side-menu w-80 bg-white text-black p-5 space-y-4">
        <Typography variant="h6" className="text-xl font-semibold">
          Admin Menu
        </Typography>
        {adminList.map((item) => (
          <Box key={item.id} className="hover:bg-gray-700 rounded-lg">
            <a href={item.route} className="py-2 px-3 text-black hover:text-gray-300 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{item.icon}</span>
                <span className="text-list mr-auto">{item.text}</span>
              </div>
              <span className="text-sm font-medium">
                <FaChevronRight />
              </span>
            </a>
          </Box>
        ))}
      </div>

      {/* Main Content Area */}
      <Box className="flex-1 bg-white p-5">
        <nav className="bg-white shadow-lg fixed w-full z-10 top-0 left-0 p-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Button className="text-gray-600 md:hidden">
              <CiMenuFries className="text-2xl" />
            </Button>
            <Typography variant="h6" component="a" href="/admin" className="font-semibold text-xl text-gray-800">
              ADMIN
            </Typography>
          </div>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleLogout} // Call handleLogout on button click
          >
            Log Out
          </Button>
        </nav>

        {/* Main Content */}
        <Box className="pt-16">
          {children || <div>Welcome to the Admin Dashboard</div>}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
