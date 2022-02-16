import React from 'react';
import {Link} from 'react-router-dom';
import Home from './Home';

function PageNotFound() {
  return <div>
      <h1>Page Not Found : </h1>
      <h1>Go To Home Page : <Link to="/">Home</Link></h1>
      
  </div>;
}

export default PageNotFound;
