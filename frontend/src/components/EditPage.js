import React,{useState} from 'react';
import {Container,Page,Typography,Button,Box,TextField, Paper, capitalize} from '@mui/material';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

const EditPage = () => {
const navigate=useNavigate();
const {state}=useLocation();
const {_id,countryname,countrycapital}=state;
const [updateCountry,setUpdateCountry]=useState(countryname);
const [updateCapital,setUpdateCapital]=useState(countrycapital);

const handleSubmit=async(e)=>{
  e.preventDefault();
  const updatedUser={countryname:updateCountry,countrycapital:updateCapital};
  try {
    await axios.put(`http://localhost:5000/api/user/${_id}`,updatedUser);
    navigate('/view-responses');
  } catch (error) {
    console.log(error);

  }
}

  return (
    <Container>
      <Typography>Edit User</Typography>
      <Box>
        <TextField
        label="Country Name"
        value={updateCountry}
        onChange={(e)=>setUpdateCountry(e.target.value)}
        />
        <TextField
        label="Capital Name"
        value={updateCapital}
        onChange={(e)=>setUpdateCapital(e.target.value)}
        />
        <Button
        type='submit'
        >
         Update
        </Button>
      </Box>
    </Container>
  )
}

export default EditPage