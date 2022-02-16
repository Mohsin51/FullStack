import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik , Form ,Field ,ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import '../App.css';
import Alert from '@mui/material/Alert';

function Registration() {
let navigate = useNavigate(); 
const initialValues = {
    fname: "",
    lname: "",
    gender: '',
    email: "",
    address: "",
    password: "",
  };
  
  const onSubmit = (values) => {
    axios.post("http://localhost:3001/post",values).then((response)=>{
      if(response.data.message){
        if(response.data.message === "SORRY USER ALREADY IS IN USE"){
           alert(response.data.message)         
        } else{
          alert(response.data.message) 
          navigate("/allusers");
        }
      }
    });
  };
  const validationSchema = Yup.object({
    fname: Yup.string().min(3).max(15).required("Required !"),
    lname: Yup.string().min(3).max(15).required("Required !"),
    gender: Yup.string().required("Required !"),
    email: Yup.string().email("Invalid Email Format").required("Required !"),
    address: Yup.string().min(3).max(50).required("Required !"),
    password: Yup.string().min(7).max(15).required("Required !"),
  });
    return (
        <div className='createUser'>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <h2>Registration</h2>
          <div className="form-control">
            <label htmlFor="fname">First Name : </label>
            <Field
              type="text"
              id="inputUser"
              name="fname"
              placeholder="Enter First Name"
            />
            <ErrorMessage name="fname" component='span'/>

          </div>
          <div className="form-control">
            <label htmlFor="lname">Last Name : </label>
            <Field
              type="text"
              id="inputUser"
              name="lname"
              placeholder="Enter Last Name"
            />
          <ErrorMessage name="lname" component='span' />
          </div>

          <div className="form-control">
            <label  htmlFor="email">Gender : </label>
            <Field type="radio" name="gender"  value="male" />Male
            <Field type="radio" name="gender"  value="female" />Female
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <ErrorMessage name="gender" component='span' />
          </div>
          <div className="form-control">
            <label  htmlFor="email">Email : </label>
            <Field
              type="text"
              id="inputUser"
              name="email"
              placeholder="Enter Email"
            />
            
            <ErrorMessage name="email" component='span' />
          </div>

          <div className="form-control">
            <label  htmlFor="email">Password : </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
            
            <ErrorMessage name="password" component='span' />
          </div>
            
          <div className="form-control">
            <label  htmlFor="age">Address : </label>
            <Field
              type="text"
              id="inputUser"
              name="address"
              placeholder="Enter Address"
            />
            
            <ErrorMessage name="address" component='span' />
          </div>
          <div>
            <button type="reset" id="b1">Reset</button>
            <button type="submit" id="b2">Submit</button>
          </div>
        </Form>
      </Formik>
            
        </div>
    )
}

export default Registration
