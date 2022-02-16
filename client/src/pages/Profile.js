import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
     const [fname , setFname] = useState([]);
    //const [lname , setLname] = useState([]);
    // const [email , setEmail] = useState("");
    // const [address , setAddress] = useState("");
    const {id} = useParams();
     useEffect(()=>{
         axios.get(`http://localhost:3001/post/profile/${id}`).then((response)=>{
             setFname(response.data.fname);
         })
    },[])
  return <div className='profilePageContainer'>
      <div className='basicInfo'><h1>Username : {fname}</h1></div>
      <div className='listOfPosts'></div>

  </div>;
}

