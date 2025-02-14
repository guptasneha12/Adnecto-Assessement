import React,{useState} from 'react';
import axios from 'axios';
import {Container,Table,TableBody,TableHead,TableContainer,TableCell,TableRow,Button,Box, Typography} from '@mui/material';
import { useLocation,useNavigate } from 'react-router-dom';

const ViewPage = ({refreshUser,users}) => {
const navigate=useNavigate();

const handleDelete=async(id)=>{
  try{
    await axios.delete(`http://localhost:5000/api/user/${id}`);
    refreshUser();

  }catch(err){
    console.log(err);
  }
}

const handleEdit=(user)=>{
  navigate('/',{state:user});
}


  return (
    <Container maxWidth="sm" sx={{backgroundColor:'grey',paddingTop:3,paddingBottom:3}}>
     <Typography align='center'>View Response</Typography>
     <Button onClick={()=>navigate('/')}>Add new user</Button>
     <TableContainer>
      <TableHead>
        <TableRow>
          <TableCell>Country Name</TableCell>
          <TableCell>Capital Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
  {users.map((user)=>(
    <TableRow key={user._id}>
    <TableCell>{user.countryname}</TableCell>
    <TableCell>{user.countrycapital}</TableCell>
    <TableCell>
      <Button onClick={()=>handleEdit(user)}>Edit</Button>
      <Button onClick={()=>handleDelete(user._id)}>Delete</Button>
    </TableCell>
  </TableRow>
  ))}    
      </TableBody>
     </TableContainer>
    </Container>
  )
}

export default ViewPage