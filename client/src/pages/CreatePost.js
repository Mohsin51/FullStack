import { React, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthConetxt';
import {Formik , Form ,Field ,ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
  
function CreatePost() {
let navigate = useNavigate(); 
const {authState} = useContext (AuthContext);
    const initialValues={
        title: "",
        body: "",
        // user: "",
       
    };
    useEffect(()=>{
        if(!authState.status){
            navigate("/login");
        }
    },[])
    const validationSchema = Yup.object().shape({
        title : Yup.string().required("You must input a title"),
        body : Yup.string().required("You must input a body"),
        // user: Yup.string().required("You must input a username"),
        
    });
    const onSubmit=(data)=>{
        axios.post("http://localhost:3001/post/createpost",data,{headers:{accessToken: localStorage.getItem('accessToken')}}).then((response)=>{
        console.log("it worked");
        navigate("/allposts");
    })       
    }; 
    return (
        <div className='createUser'>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
          <Form className='formContainer'>
                    <label>Title : </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field id="inputCreatePost" name="title" placeholder="Ex Title..." />
                    <label>Post : </label>
                    <ErrorMessage name="body" component="span"/>
                    <Field id="inputCreatePost" name="body" placeholder="Post " />
                    {/* <label>Username : </label> */}
                    {/* <ErrorMessage name="user" component="span"/> */}
                    {/* <Field id="inputCreatePost" name="user" placeholder="Post " /> */}
                    
                    <button type="submit">Create Post</button>
                </Form>
      </Formik>
            
        </div>
    )
}

export default CreatePost

