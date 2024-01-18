import React from 'react'
import { useAuth } from '../../Contex/AuthContext'
import { Box, Breadcrumbs, Container, Grid, Paper, Typography } from '@mui/material'
import UserMenu from '../../Layout/UserMenu'
import Layout from '../../Layout/Layout'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [auth] = useAuth()
    function handleClick(event) {
      event.preventDefault();
      console.info("You clicked a breadcrumb.");
    }
  return (
    <>
    <Layout title={'Dashboard'}>
    <Box
          role="presentation"
          onClick={handleClick}
          color={"white"}
          sx={{ height: "30px", backgroundColor: "#607b8a", padding: "20px" ,maxWidth:'100%'}}
        >
           {/* <Typography color="text.primary" sx={{marginLeft:'auto'}}>Breadcrumbs</Typography> */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link
              underline="hover"
              color="inherit"
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              // icon={<HomeIcon fontSize="small" />}
            >
              Home
            </Link>
           
            <Link
              underline="hover"
              color="inherit"
              to=""
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Dashboard
            </Link>
         
          </Breadcrumbs>
        </Box>
    <UserMenu/>
 <Container>
 
 <Paper elevation={20} sx={{textAlign:'center',margin:'10px auto',width:'40%',padding:'20px',height:'auto',borderRadius:'30px', backgroundColor:'#4f6a78'}}>
 <Typography variant='h3' my={2}> </Typography>
 <img src="/images/user.png" alt="" height="120px"  style={{borderRadius:'50%'}}/>
 <Box  sx={{margin:'50px auto',textAlign:'center',padding:"10px"}}>
  <Typography variant='h6'>Name : {auth?.user?.name} </Typography>  
  <Typography variant='h6'>Email : {auth?.user?.email} </Typography>  
  <Typography variant='h6'>Address : {auth?.user?.address} </Typography>  

 </Box>
 </Paper>

</Container>
    </Layout>
    

    </>
  )
}

export default Dashboard