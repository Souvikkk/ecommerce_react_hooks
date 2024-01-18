import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Contex/AuthContext'
import { Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const [auth,setAuth]=useAuth()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading,setLoading] = useState(false)
    // Get User Data

    useEffect(()=>{

        console.log("auth?.user:", auth?.user);
      const {email,phone,name,address} = auth?.user
      setName(name)
      setEmail(email)
      setPhone(phone)
      setAddress(address)
    },[auth?.user])
    const updateSubmit=async (e)=>{
        e.preventDefault()
        try{
            setLoading(true)
          const res = await axios.put(`${process.env.REACT_APP_API}/api/auth/profile`,{
            name,email,password,phone,address
          })
          console.log('res',res);
          setLoading(false)
          if(res?.data?.error){
            toast.error(res?.data?.error)
          }else{
            setAuth({...auth,user:res?.data?.updateUser});
            let ls = localStorage.getItem('auth');
            ls = JSON.parse(ls);
            ls.user=res.data.updateUser;
            localStorage.setItem('auth',JSON.stringify(ls))
            toast.success("Profile Updated Successfully")
          }
        }catch(error){
          console.log(error);
          toast.error("something went wrong")
          setLoading(false)
        }
    }
  return (
    <>
 <Grid container>
          <Paper elevation={10} sx={{ padding: "20px", width:'50%',margin:"20px auto"}}>
            <Typography variant="h4" align="center" my={2}>
             Update User Profile{" "}
            </Typography>
            <form onSubmit={updateSubmit}>
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
              
              {loading? 
                  <Grid> <Button variant="contained" color="success" type="submit">
                  UPDATE <CircularProgress  fontSize="small" sx={{marginLeft:"10px"}}/>
                </Button>  </Grid> :
                  
                  (<Button variant="contained" color="success" type="submit">
                    UPDATE
                  </Button>)}
            
            </form>
          </Paper>
        </Grid>
    </>
  )
}

export default Profile