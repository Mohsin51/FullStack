import React from 'react';
import axios from 'axios';
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../App.css';

function Home() {
  let navigate = useNavigate();
const [listOfUser,setlistOfUser]=useState([]);
const [searchword, setSearchWord] = useState("");

useEffect(()=>{
    axios.get("http://localhost:3001/post").then((response)=>{
      setlistOfUser(response.data);
    });
  },[]);
  const filteredUser = listOfUser.filter((user)=>{
    return user.fname.toLowerCase().includes(searchword.toLowerCase());
  })
    return (
        <div className="App">
          <div className='searchUser'>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Search Users By Name
        </InputLabel>
        <Input
        onChange={(e)=>{setSearchWord(e.target.value)}}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
          </div>
      {filteredUser.map((value,key)=>{
        return (
          <>
        <div className='post' onClick={()=>navigate(`/singleuser/${value.id}`)}>
          <div key={key} className='title'>Frist Name : {value.fname}</div>
          <div key={key} className='title'>Last Name : {value.lname}</div>
          <div key={key} className='title'>Gender : {value.gender}</div>
          <div key={key} className='title'>Email : {value.email}</div>
          <div key={key} className='footer'>Address : {value.address}</div>
          </div>
          </>
        )
      })}
    </div>
    )
}

export default Home
