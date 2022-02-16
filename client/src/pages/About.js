import React from 'react';
import image from '../imgs/image.jpg';
function About() {
     
    return (
        <>
         <div className='container'>
            <div className='header'>
            <img className='image' src={image} alt='image' height={400} />
            <img className='image' src={image} alt='image' height={400} />
            </div>
        </div>
            <div className='content'>
                <h2>About Page</h2>
                <p>this is my about page on the full stack app example</p>
                
            </div>
        </>
       
            
        
    )
}

export default About
