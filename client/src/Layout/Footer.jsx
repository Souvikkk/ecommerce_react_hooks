import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import SearchInput from "../pages/components/SearchInput";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          height: "auto",
          maxWidth: "100%",
          backgroundColor: "#1f292e",
          color: "white",
          padding: "20px",
        //   position: "fixed",
        //   bottom: 0,
        }}
      >
        <Grid container spacing={4} align="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Grid container alignItems="center" justifyContent="center">
                <Avatar
                  src={"/images/logo_2.jpg"}
                  alt=""
                  height={"50px"}
                  style={{ marginRight: 1 }}
                />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  ShopNex
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "justify" }}>
              <Typography variant="h6">Address</Typography>
              <Typography variant="p" fontSize={"12px"}>
                265/B1 D-Block Sector V Kol 76
                <br />
              </Typography>
              <Typography variant="p" fontSize={"12px"}>
                Mail Us : shopnex@gmail.com
                <br />
              </Typography>
              <Typography variant="p" fontSize={"12px"}>
                Call Us : 1800987654321 <br />
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "justify" }}>
              <Typography variant="h6">Links</Typography>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography variant="p" fontSize={"12px"} color="white">
                  Home
                </Typography>
              </Link>{" "}
              <br />
              <Link to={"/products"} style={{ textDecoration: "none" }}>
                <Typography variant="p" fontSize={"12px"} color="white">
                  Products
                </Typography>
              </Link>{" "}
              <br />
              <Link to={"/contact"} style={{ textDecoration: "none" }}>
                <Typography variant="p" fontSize={"12px"} color="white">
                  Contact Us
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box>
            <SearchInput/>
              <br/>
              <br/>
              <Link
              target="_blank"
                to={"/https://www.facebook.com/"}
                style={{ textDecoration: "none", color: "#3b5998 " }}
              >
                <FacebookIcon />{" "}
              </Link>{" "}
            
              <Link
               target="_blank"
                to={"/https://www.whatsapp.com/"}
                style={{ textDecoration: "none", color: "#075e54" }}
              >
                <WhatsAppIcon />{" "}
              </Link>{" "}
          
              <Link
               target="_blank"
                to={"/https://www.twitter.com/"}
                style={{ textDecoration: "none", color: "#00acee" }}
              >
                <TwitterIcon />{" "}
              </Link>{" "}
              
              <Link
               target="_blank"
                to={"/https://www.instagram.login/"}
                style={{ textDecoration: "none", color: " #8a3ab9" }}
              >
                <InstagramIcon />{" "}
              </Link>
              
              <Link
               target="_blank"
                to={"/https://www.pinterest.login/"}
                style={{ textDecoration: "none", color: "#c8232c" }}
              >
                <PinterestIcon />{" "}
              </Link>
             
            </Box>
          </Grid>
        </Grid>
        <Paper elevation={10}
        sx={{
          height: "40px",
          backgroundColor: "#0d1417",
          textAlign: "center",
          padding: "15px",
          maxWidth: "80%",
          margin:'20px auto',
          borderRadius:'15px'
        //   position: "fixed",
          // bottom: 0,
        }}
      >
        <Typography color={"white"} fontSize={"10px"}>
          © Copyright{" "}
          <strong>
            <span>Company</span>
          </strong>
          . All Rights Reserved <br /> Designed by SD
        </Typography>
      </Paper>
      </Box>
      
    </>
  );
};

export default Footer;
