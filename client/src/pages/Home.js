import React,{useState} from 'react';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
function Home() {
    
    return (
        <>
        <div className='container'>
            <div className='row'>
                <div className='innerPage'>
                    <h1 className='innerPage-title'>How to push code on github <GitHubIcon onClick={()=>{alert('clicked')}} /></h1>
                    <Divider />
                    <p>Following steps are only for the first time when you want to push your cod on github.</p>
                    <p>a) <strong>git config -global user.name ...</strong></p>
                    <p>b) <strong>git config -global user.email ...</strong></p>
                    <h3>Main steps will be used to push code on github</h3>
                    <p>i) <strong>touch .gitignore </strong> this command will be used to add a file in which you will add all those files that you don't want to add in your repository e.g <strong>node_modules.</strong> </p>
                    <p>ii) First you have to initialize your folder that you want to push on github.</p>
                    <strong>git init </strong> this command will be used for that purpose.
                    <p>iii) After that you have to add you file that you push on github</p>
                    <strong>git add .</strong>
                    <p>iv) Next step is to commit which will move your file from stagging area to comit stage.Commit is just
                     like a message that will remind you what you change in your file.</p>
                    <strong>git commit -m </strong> "Your message about commit"
                    <p>v) Next address of  remote origin that you have created on github.</p>
                    <strong>git remote add origin https://github.com/Useranme/yourRepository</strong>
                    <p>vi) Next you need to push your code on github repository.</p>
                    <strong>git push origin master</strong>
                </div>
            </div>
        </div>
        </>  
    )
}

export default Home
