import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, TextField, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = ({ refreshUser }) => {
  const { state } = useLocation();

  // Ensure initial state is safe
  const initialState = state && state._id ? state : { countryname: "", countrycapital: "" };
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh
    try {
      if (user._id) {
        await axios.put(`http://localhost:5000/api/user/${user._id}`, user);
      } else {
        await axios.post('http://localhost:5000/api/user', user);
      }

      // Reset the form after submission
      setUser({ countryname: "", countrycapital: "" });

      // Refresh the users list
      if (refreshUser) refreshUser();

      // Navigate to the responses page
      navigate('/view-responses');
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'grey', padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography align="center" variant="h6">
          {user._id ? "Edit Details" : "Add New User"}
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Country Name"
            name="countryname"
            value={user.countryname}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Capital Name"
            name="countrycapital"
            value={user.countrycapital}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {user._id ? "Update" : "Submit"}
          </Button>
          <Button onClick={()=>navigate('/view-responses')}>
            View Response
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
