import React,{useState,useEffect} from 'react';
import axios from 'axios';

import HomePage from './components/HomePage';
import ViewPage from './components/ViewPage';
import {Routes,Route} from 'react-router-dom';
import './App.css';

function App() {
  // const {state}=useLocation();
  const [users,setUser]=useState([]);

  // const navigate=useNavigate();
  const refreshUser=async()=>{
   try {
    const response=await axios.get('http://localhost:5000/api/user');
   setUser(response.data);
   } catch (error) {
    console.log(error);
   }
  }

  useEffect(()=>{
    refreshUser();
  },[]);

  return (
    <Routes>
      <Route path="/" element={<HomePage refreshUser={refreshUser}/>}/>
      <Route path="/view-responses" element={<ViewPage refreshUser={refreshUser} users={users}/>} />
    </Routes>
  );
}

export default App;
