import React from "react";
import { Box, Typography, Card, CardContent, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaProjectDiagram,
  FaPhotoVideo,
  FaNewspaper,
  FaAddressBook,
  FaDonate,
  FaEnvelopeOpenText,
  FaImages,
  FaUsers,
  FaUserTie,
  FaUsersCog,
  FaUserPlus,
  FaInfoCircle,
  FaBuilding,
  FaUserShield,
} from "react-icons/fa";
import './index.css';

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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex flex-col items-center bg-white-100 min-h-screen p-5">
      <Typography variant="h4" className="font-semibold mb-5 py-4" style={{ fontFamily: 'Poppins' }}>
        Admin Dashboard
      </Typography>
      <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {adminList.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-lg transition-shadow"
            onClick={() => navigate(item.route)}
          >
            <CardActionArea>
              <CardContent className="flex flex-col items-center text-center" style={{ gap: 4, margin: 5 }}>
                <Box className="text-3xl text-blue-500 mb-2">{item.icon}</Box>
                <Typography variant="h6" className="font-medium" style={{ fontFamily: 'Poppins' }}>
                  {item.text}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
