import { Avatar, Box, Button,CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Services/AxiosInstance";
import { toast } from "react-toastify";
import Layout from "../../Layout/Layout";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
 
  const registerSubmit=async (e)=>{
       e.preventDefault()
       try{
        setLoading(true)
        const response = await axiosInstance.post(`/api/auth/register`,{name,email,password,phone,address,answer})
        //    console.log(response);
           if(response && response?.data?.success){
            toast.success(response?.data?.message)
            setLoading(false)
            navigate('/login')
           }else{
            toast.error(response?.data?.message)
           }
       }catch(error){
        toast.error("something went wrong")
        console.log("error registering");
        setLoading(false)
       }
       
  }
  return (
    <>
   <Layout title={'SignUp'}>
   <Grid container spacing={1}>
          <Paper elevation={10} sx={{ padding: "20px",margin:"20px auto",borderRadius:'15px' ,backgroundColor:'#ebf5ed',width:'600px'}}>
          <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6}>
        <Box>
       
        <Typography variant="h4" align="center" my={2} sx={{fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",}}>
              ShopNex{" "}
            </Typography>
            <hr/>
            <img src='images/reg.avif' alt='' width={'100%'} height={'450px'}/>
        </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h4" fontWeight={'bold'} align="center" my={2}>
              Sign Up{" "}
            </Typography>
            <hr/>
            <form onSubmit={registerSubmit}>
              <Grid item xs={12} my={1}>
                <TextField
                  placeholder="Enter Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} my={1}>
                <TextField
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
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
              <Grid item xs={12} my={1}>
                <TextField
                  placeholder="Enter Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  fullWidth
                  type='number'
                />
              </Grid>
              <Grid item xs={12} my={1}>
                <TextField
                  placeholder="Enter Address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  fullWidth
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
                  <Box sx={{display:'flex',justifyContent:'center'}}> <Button variant="contained" color="success" type="submit">
                  REGISTER <CircularProgress  fontSize="small" sx={{marginLeft:"10px"}}/>
                </Button>  </Box> :
                  
                  (<Box sx={{display:'flex',justifyContent:'center'}}><Button variant="contained" color="success" type="submit">
                    REGISTER
                  </Button> </Box> )}
              <Typography textAlign={'center'} sx={{margin:'10px 0px' ,fontSize:'12px'}}>Already have an account ?
              <Link to={'/login'} style={{textDecoration:'none' ,fontSize:'16px'}} color="success" variant="contained"> Login</Link> </Typography>
            </form>
        </Grid>
        </Grid>
          
           
          </Paper>
        </Grid>
   </Layout>
        
    
    </>
  );
};

export default Register;
