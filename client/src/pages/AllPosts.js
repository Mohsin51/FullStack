import React from 'react';
import axios from 'axios';
import {useEffect,useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthConetxt';
import '../App.css';

function AllPosts() {
const {id} = useParams();
let navigate = useNavigate();
const [listOfPosts,setlistOfPosts] = useState([]);
const [likedPosts,setLikedPosts] = useState([]);
const {authState} = useContext(AuthContext);

useEffect(()=>{
  if(!authState.status){
    navigate("/login");
  } else {
    axios.get("http://localhost:3001/post/allposts",{headers: {accessToken: localStorage.getItem('accessToken')}}).then((response)=>{
      setlistOfPosts(response.data.listOfPosts);
      setLikedPosts(response.data.likedPosts.map((like)=>{
        return like.CreatePostId;
      }));
      console.log(response.data.likedPosts);
    });
  }
  },[]);
  const likeAPost =(id) =>{
    axios.post("http://localhost:3001/likes",{CreatePostId: id},{headers: {accessToken: localStorage.getItem('accessToken')}}).then((response)=>{
    setlistOfPosts(listOfPosts.map((post)=>{
      if(post.id === id){
        if(response.data.liked){
          return {...post, Likes: [...post.Likes,0]}
        } else{
          const likesArray = post.Likes;
          likesArray.pop();
          return {...post, Likes: likesArray}
        }
      }
      else{
        return post
      }
    }));
    if(likedPosts.includes(id)){
      setLikedPosts(likedPosts.filter((CreatePostId)=>{
        return id != CreatePostId;
      }))
    } else {
      setLikedPosts([...likedPosts,id]);
    }
    })
  };
    return (
        <div className="App">
      {listOfPosts.map((value,key)=>{
        return (
          <>
        <div className='post'>
          <div key={key} className='title'>Post Title : {value.title}</div>
          <div key={key} className='body' onClick={()=>navigate(`/singlepost/${value.id}`)}> {value.body}</div>
          <div key={key} className='footer'>
            <div className='username'>{value.user}</div>
            <div className='buttons'>
              <ThumbUpAltIcon className={likedPosts.includes(value.id) ? 'likeBttn' : 'unlikeBttn'} onClick={()=>{likeAPost(value.id)}}/>
            <label>{value.Likes.length}</label>
            </div>
            </div>
          </div>
          </>
        )
      })}
    </div>
    )
}

export default AllPosts
