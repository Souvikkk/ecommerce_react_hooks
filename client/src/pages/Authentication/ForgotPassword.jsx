import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { axiosInstance } from '../../Services/AxiosInstance'
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../Layout/Layout';
const ForgotPassword = () => {
    const [email,setEmail]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [answer,setAnswer]=useState("")
    const [loading,setLoading] = useState(false)
    const  naviage = useNavigate()
const forgotPasswordSubmit =async(e)=>{
    e.preventDefault()
    try{
        setLoading(true)
     const response = await axiosInstance.post(`/api/auth/forgot-password`,{email,newPassword,answer})
     if(response && response?.data?.success){
        toast.success(response?.data?.message)
        setLoading(false)
        naviage('/login')
     }else{
        toast.error(response?.data?.message)
     }

    }catch(error){

    }
}
  return (
    <>
    <Layout title={'ForgotPassword'}>
    <Grid container>
          <Paper elevation={10} sx={{ padding: "20px",margin:"30px auto",borderRadius:'15px',backgroundColor:'#ebf5ed'}}>
          <Typography variant="h4" align="center" my={2} sx={{fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",}}>
              ShopNex{" "}
            </Typography>
            <hr/>
            <Typography variant="h4" align="center" my={2}>
              Reset Your Password{" "}
            </Typography>
            <form onSubmit={forgotPasswordSubmit}>
              
              <Grid item xs={12} my={1}>
                <TextField
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} my={1}>
                <TextField
                  placeholder="Enter New Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  fullWidth
                  type='password'
                />
              </Grid>
              <Grid item xs={12} my={1}>
                <TextField
                  placeholder="Enter Secret Answer"
                  name="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  fullWidth
               
                />
              </Grid>
              {loading? 
                  <Box sx={{display:'flex',justifyContent:'center',marginTop:'20px'}}> <Button variant="contained" color="primary" type="submit">
                  RESET PASSWORD <CircularProgress color="secondary"  fontSize="small" sx={{marginLeft:"10px"}}/>
                </Button>  </Box> :
                  
                  (<Box sx={{display:'flex',justifyContent:'center',marginTop:'20px'}}><Button variant="contained" color="primary" type="submit">
                  RESET PASSWORD
                  </Button> </Box> )} 
              <Typography sx={{margin:'10px 5px'}} textAlign={'center'}>Remember Password ?
              <Link style={{textDecoration:'none'}} to={'/login'} color="success" variant="contained"> Login</Link></Typography> 
            </form>
          </Paper>
        </Grid>

    </Layout>
 
    </>
  )
}

export default ForgotPassword