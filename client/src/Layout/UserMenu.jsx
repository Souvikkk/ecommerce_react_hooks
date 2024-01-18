import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <Paper elevation={5} sx={{bgcolor:'#7695a6',width:'50%',margin:'20px auto',textAlign:'center',borderRadius:'15px'}}>
        <li style={{listStyle:'none'}}>
          <Typography variant="h4" p={2}>Dashboard </Typography>
          <hr/>
          <Typography variant="h4"> <Link style={{textDecoration:'none',margin:'10px auto'}} to={"/profile"}>Profile</Link> </Typography>
          <Typography variant="h4"><Link style={{textDecoration:'none'}}  to={"/orders"}>Orders</Link> </Typography>
         
          <br/>
          
        </li>
      </Paper>
    </>
  );
};

export default UserMenu;
