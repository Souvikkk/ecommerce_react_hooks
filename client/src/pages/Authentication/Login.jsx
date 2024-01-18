import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../Services/AxiosInstance'
import { toast } from 'react-toastify'
import { useAuth } from '../../Contex/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';
import Layout from '../../Layout/Layout'
const Login = () => {
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [loading,setLoading] = useState(false)
    const naviagte = useNavigate()
    const [auth,setAuth]=useAuth()
    const loginSubmit=async (e)=>{
      e.preventDefault()
      try{
        setLoading(true)
         const response = await axiosInstance.post(`api/auth/login`,{email,password})
         if(response && response?.data?.success){
            toast.success(response?.data?.message)
            setLoading(false)
            naviagte('/')
            setAuth({...auth,user:response?.data?.user,token:response?.data?.token})
            localStorage.setItem('auth',JSON.stringify(response?.data))
         }else{
            toast.error(response?.data?.message)
            setLoading(false)
         }
      }catch(error){
        toast.error("something went wrong")
        setLoading(false)
      }
    }
  return (
    <>
    <Layout title={'Login'}>
    <Grid container spacing={1}> 
    <Paper elevation={10} sx={{ padding: "20px",margin:"30px auto",borderRadius:'15px',backgroundColor:'#ebf5ed',width:'500px'}}>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6}>
        <Box>
        <Typography variant="h4" align="center" my={2} sx={{fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",}}>
              ShopNex{" "}
            </Typography>
            <hr/>
          <img src='images/img_2.jpg' alt='' width={'100%'} height={"250px"}/>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
      
            <Typography variant="h4" fontWeight={'bold'} align="center" my={2}>
              Login{" "}
            </Typography>
            <hr/>
            <form onSubmit={loginSubmit} >
              
              <Grid item xs={12}  my={1} >
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
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  type='password'
                />
              </Grid>
              {loading? 
                  <Box sx={{display:'flex',justifyContent:'center'}}> <Button variant="contained" color="success" type="submit">
                  LOGIN <CircularProgress color="secondary"  fontSize="small" sx={{marginLeft:"10px"}}/>
                </Button>  </Box> :
                  
                  (<Box sx={{display:'flex',justifyContent:'center'}}><Button variant="contained" color="success" type="submit">
                    LOGIN
                  </Button></Box> )} 
              <Typography sx={{margin:'10px 0px' ,fontSize:'12px'}} textAlign={'center'}>Don't have an account ? <Link to={'/register'} style={{textDecoration:'none',fontSize:'16px'}} color="success" variant="contained">Sign up</Link> </Typography>
              <Typography textAlign={'center'} sx={{fontSize:'12px'}}>
              <Link style={{textDecoration:'none',fontSize:'14px'}} to={'/forgotpassword'} color="success" variant="contained">Forgot Password ?</Link> </Typography>
            </form>
      </Grid>
      </Grid>
      </Paper> 
        </Grid>
    </Layout>

    

    </>
  )
}

export default Login