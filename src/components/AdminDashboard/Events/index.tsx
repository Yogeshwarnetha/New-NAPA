

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
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import AdminDashboardLayout from "..";
import CreateEvent from "./create-event";

// Dummy data for Events
const dummyEvents = [
  {
    id: "1",
    heading: "Annual Tech Conference",
    description: "A conference on the latest trends in tech.",
    date: "2024-12-15",
    time: "10:00 AM",
    place: "Tech City Convention Center",
  },
  {
    id: "2",
    heading: "Music Festival",
    description: "A festival featuring top artists from around the world.",
    date: "2024-12-20",
    time: "5:00 PM",
    place: "Stadium Park",
  },
  {
    id: "3",
    heading: "Charity Run",
    description: "A charity run to raise funds for education.",
    date: "2024-12-25",
    time: "8:00 AM",
    place: "Central Park",
  },
];

interface Event {
  id: string;
  heading: string;
  description: string;
  date: string;
  time: string;
  place: string;
}

const EventsDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]); // Initially empty
  const [loading, setLoading] = useState<boolean>(true); // Set loading state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      setEvents(dummyEvents);
      setLoading(false); 
    }, 2000);
  }, []);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const Child = ({ data }: { data: Event }) => (
    <TableRow key={data.id}>
      <TableCell sx={{fontFamily:'Poppins', fontSize:14}}>{data.heading}</TableCell>
      <TableCell sx={{fontFamily:'Poppins', fontSize:14}}>{data.description}</TableCell>
      <TableCell sx={{fontFamily:'Poppins', fontSize:14}}>{data.date}</TableCell>
      <TableCell sx={{fontFamily:'Poppins', fontSize:14}}>{data.time}</TableCell>
      <TableCell sx={{fontFamily:'Poppins', fontSize:14}}>{data.place}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary">
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
          <CreateEvent />
        </Box>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{m:2}}>Events Table</Typography>
        <TableContainer>
        {loading ? (
  <Table className="shimmer-table">
    <TableHead>
      <TableRow>
        <TableCell className="shimmer-placeholder" style={{ width: "30%" }} />
        <TableCell className="shimmer-placeholder" style={{ width: "40%" }} />
        <TableCell className="shimmer-placeholder" style={{ width: "20%" }} />
        <TableCell className="shimmer-placeholder" style={{ width: "10%" }} />
        <TableCell className="shimmer-placeholder" style={{ width: "10%" }} />
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {[...Array(3)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="shimmer-cell" />
          <TableCell className="shimmer-cell" />
          <TableCell className="shimmer-cell" />
          <TableCell className="shimmer-cell" />
          <TableCell className="shimmer-cell" />
          <TableCell />
        </TableRow>
      ))}
    </TableBody>
  </Table>
) : (
  // The actual data rendering
  <Table>
    <TableHead>
      <TableRow>
        <TableCell sx={{fontWeight:700, fontSize:16, fontFamily:'Jost'}}>Event Heading</TableCell>
        <TableCell sx={{fontWeight:700, fontSize:16, fontFamily:'Jost'}}>Description</TableCell>
        <TableCell sx={{fontWeight:700, fontSize:16, fontFamily:'Jost'}}>Date</TableCell>
        <TableCell sx={{fontWeight:700, fontSize:16, fontFamily:'Jost'}}>Time</TableCell>
        <TableCell sx={{fontWeight:700, fontSize:16, fontFamily:'Jost'}}>Place</TableCell>
        <TableCell sx={{fontWeight:700, fontSize:16, fontFamily:'Jost'}}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {events.map((event) => (
        <Child key={event.id} data={event} />
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
    </AdminDashboardLayout>
  );
};

export default EventsDashboard;
