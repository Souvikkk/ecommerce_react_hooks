import { Box, Typography } from "@mui/material";
import React from "react";
import Layout from "../Layout/Layout";

const Home = () => {
  const styleImage = {
    backgroundImage: "url('images/img_5.webp')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };
  return (
    <>
    <Layout title={'Home'}>
    <Box style={styleImage}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              margin: "50px auto",
              color: "black",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            {" "}
            Welcome to ShopNex
          </Typography>
        </Box>
      </Box>
    </Layout>
     
    </>
  );
};

export default Home;
