import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import Layout from '../Layout/Layout'

const Contact = () => {

  return (
    <>
      <Layout title={'ContactUs'}>
        
        <Box>

          <iframe title="Map of our Location in Sector V, Bidhannagar, Kolkata" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.291556012733!2d88.42368323450214!3d22.57637703532011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b020703c0d%3A0xece6f8e0fc2e1613!2sSector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1697651661690!5m2!1sen!2sin" width="100%" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </Box>


        <Box sx={{ marginTop: "50px" ,marginBottom:'50px'}}>
          <Paper elevation={10} sx={{ paddingBottom: '20px', width: '78%', margin: 'auto', backgroundColor: '#dedede' ,borderRadius:'30px'}}>
            <Grid container spacing={2} align='center'>

              <Grid item md={4}>
                <Typography variant='h6'>Location </Typography>
                <Typography variant='p'>265/B1 D-Block </Typography>
                <br />
                <Typography variant='p'>Sector V Kol 76 </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography variant='h6'>Mail Us </Typography>
                <Typography variant='p'>shopnex@gmail.com </Typography>
                <br />
                <Typography variant='p'>shop@gmail.com </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography variant='h6'>Call Us </Typography>
                <Typography variant='p'>1800987654321 </Typography>
                <br />
                <Typography variant='p'>1800987654322 </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

      </Layout>
    </>
  )
}

export default Contact