import React from 'react';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Contact() {
    return (
        <>
        <div className='container'>
            <div className='row'>
            <Typography variant="h4" gutterBottom component="div">Have Some Question?</Typography>
            </div>
        </div>
        <div className='container'>
            <div className='row'>
            <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
            </div>
        </div>
        </>
        
    )
}

export default Contact
