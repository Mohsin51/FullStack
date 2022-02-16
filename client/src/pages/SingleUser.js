import React from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
// import SingleUserCard from '../components/SingleUserCard';

function SingleUser() {
    const [user,setUser]=useState({});
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3001/post/singleuser/byId/${id}`).then((response)=>{
            setUser(response.data);
             });
    },[]);
    return (
        <>
        <Card sx={{ maxWidth: 700 }} className='userCard'>
      <CardContent>
      <Typography sx={{ fontSize: 40 }} color="text.primary" gutterBottom >
          User Info <AccountCircleIcon /> <Divider />
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom >
         < CreateSharpIcon /> First Name: {user.fname}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
        < CreateSharpIcon /> Last Name: {user.lname}
        </Typography><Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            { (user.gender === 'female') ? < FemaleIcon/> : <MaleIcon/> }
            Gender:  {user.gender}
        </Typography><Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          <EmailIcon /> Email : {user.email}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          <HomeIcon /> Address : {user.address}
        </Typography>
      </CardContent>
    </Card>
        </>
    )
}

export default SingleUser
