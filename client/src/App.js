import { BrowserRouter, Routes,Link,Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import AllUsers from './pages/AllUsers';
import SingleUser from './pages/SingleUser';
import CreatePost from './pages/CreatePost';
import AllPosts from './pages/AllPosts';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import { AuthContext } from './helpers/AuthConetxt';
import Footer from './components/Footer'
import { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
const [authState,setAuthState] = useState({username: "",id : 0, status: false});

useEffect(()=>{
  axios.get("http://localhost:3001/post/auth",{headers: {accessToken: localStorage.getItem("accessToken")}}).then((response)=>{
    if(response.data.error){
      setAuthState({...authState, status: false});
    } else{
      // console.log(response.data.username)
    setAuthState({
      username: response.data.username,
      id: response.data.id,
      status: true
    });
    }
  });
// }
},[]);
const logout = () =>{
  localStorage.removeItem("accessToken");
  setAuthState({username: "",id: 0, status: false});
}
  return (
    <>
    <div className='App'>
      <AuthContext.Provider value={{authState,setAuthState}}>
      <BrowserRouter>
      <div className='navbar'>
        <div className='links'>
      <Link to="/">Home</Link>
        {!authState.status ? (
      <>
        <Link to="/registration">Registration</Link>
          <Link to="/login">Login</Link>
          </>) : (
          <>
          <Link to="/createpost">Create Post</Link>
          </>
          )}
          </div>
          <div className='loggedInContainer'>
          <h1>{authState.username}</h1>
          {authState.status && <button onClick={logout}>Logout</button> }
          </div>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/allusers">All Users</Link>
          <Link to="/allposts">All Posts</Link>
      </div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/registration' element={<Registration />} /> 
            <Route path='/login' element={<Login />}/>      
            <Route path='/about' element={<About />} />       
            <Route path='/contact' element={<Contact />} /> 
            <Route path='/allusers' element={<AllUsers />} />  
            <Route path='/singleuser/:id' element={<SingleUser />} />
            <Route path='/createpost' element={<CreatePost />} />  
            <Route path='/allposts' element={<AllPosts />} /> 
            <Route path='/singlepost/:id' element={<SinglePost />} /> 
            <Route exact path='*' element={<PageNotFound />} />
            <Route exact path='/profile/:id' element={<Profile />} />  
          </Routes>
    </BrowserRouter>

    <Footer />
    </AuthContext.Provider>
    </div>
   </>
  );
}

export default App;
