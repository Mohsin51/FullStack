import React from 'react';
import '../App.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <>
    <div className='footers'>
      <FacebookIcon /><MarkEmailUnreadIcon /><TwitterIcon /><LinkedInIcon />
    </div>

    </>
  )
}

export default Footer