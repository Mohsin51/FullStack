import React from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {AuthContext} from '../helpers/AuthConetxt';


function SinglePost() {
  const [singlepost, setSinglePost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {authState} = useContext(AuthContext);
  const navigate = useNavigate();


  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/post/singlepost/byId/${id}`)
      .then((response) => {
        setSinglePost(response.data);
      });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      // console.log(response.data);
      setComments(response.data);
    });
  }, []);
  const addComment = (data) => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        CreatePostId: id,
      },{
          headers: {
              accessToken: localStorage.getItem("accessToken")    
          },
      }
      )
      .then((response) => {
          if(response.data.error){
              console.log(response.data.error)
          } else{
            const commentToAdd = { commentBody: newComment,username: response.data.username };
        setComments([...comments, commentToAdd]);
        setNewComment("");
          }
      });
  };

  const deleteComment = (id) =>{
    // alert(id) 
    axios.delete(`http://localhost:3001/comments/${id}`,{headers: {accessToken: localStorage.getItem('accessToken')}}).then(()=>{
    setComments(comments.filter((val)=>{
        return val.id != id
      }))      
    })
  };

  const deletePost = (id) =>{
    axios.delete(`http://localhost:3001/post/${id}`,{headers: {accessToken: localStorage.getItem('accessToken')}}).then(()=>{
    navigate("/allposts")
    })
  };
const editPost = (option) =>{
  if(option === "title"){
    const newTitle = prompt("Enter New Title");
    axios.put("http://localhost:3001/post/edittitle",{newTitle: newTitle,id:id},{headers: {accessToken: localStorage.getItem('accessToken')}}).then(()=>{
      setSinglePost({...singlepost,title: newTitle});

  });
  } else{
    const newText = prompt("Enter New Text");
    axios.put("http://localhost:3001/post/edittext",{newText: newText,id:id},{headers: {accessToken: localStorage.getItem('accessToken')}}).then(()=>{
      setSinglePost({...singlepost,body: newText});
  });
  }

}
const profilePage = (id) =>{
  axios.get(`http://localhost:3001/post/profile/${id}`,{headers: {accessToken: localStorage.getItem('accessToken')}}).then(()=>{
    })
}

  return (
    <>
      <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">
            <div className="title" onClick={()=>{if(authState.username == singlepost.user){editPost("title")}}}>Post Title : {singlepost.title}</div>
            <div className="body" onClick={()=>{if(authState.username == singlepost.user){editPost("body")}}}>{singlepost.body}</div>
            <div className="footer" onClick={()=>{if(authState.username == singlepost.user)profilePage(singlepost.id)}}>User : {singlepost.user}
            {authState.username == singlepost.user && <button onClick={()=>{deletePost(singlepost.id)}}>Delete Post</button>}
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="addCommentContainer">
            <input
              type="text"
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              placeholder="Comments.. "
              autoComplete="off"
            />
            <button onClick={addComment}> Add Comment</button>
          </div>
          <div className="listOfComments">
            {comments.map((comment, key) => {
              return (
                <div className="comment" key={key}>
                  {comment.commentBody}
                  
                  <strong> Username : {comment.username} </strong>
                  {authState.username === comment.username && <button onClick={()=>{deleteComment(comment.id)}}>X</button>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
