import React from "react";
import { useSearch } from "../Contex/SearchContext";
import { Link, useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useCart } from "../Contex/CartContex";
import { toast } from "react-toastify";
import ForwardIcon from '@mui/icons-material/Forward';
import Layout from "../Layout/Layout";
import LocalMallIcon from '@mui/icons-material/LocalMall';
const SearchPage = () => {
  const [values, setValues] = useSearch();
  const [cart,setCart] = useCart()
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <>
    <Layout title={'SearchResults'}>
    <Box
          role="presentation"
          onClick={handleClick}
          color={"white"}
          sx={{ height: "30px", backgroundColor: "#607b8a", padding: "20px" ,maxWidth:'100%'}}
        >
          
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link
              underline="hover"
              color="inherit"
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              
            >
              Home
            </Link>
           
            <Link
              underline="hover"
              color="inherit"
              to=""
              style={{ color: 'white', textDecoration: 'none' }}
            >
             Search Results - {values.keyword.charAt(0).toUpperCase() + values.keyword.substring(1)}
            </Link>
         
          </Breadcrumbs>
        </Box>
    <Container>
 
    <Typography variant="h5" textAlign={"center"} sx={{margin:"20px"}}>
          Search Result <ForwardIcon/> 
          {values?.results.length < 1
            ?    <Box sx={{height:'80vh',marginTop:'50px',fontSize:'40px'}}> "No Results Found"</Box> 
            :  `Found  ${ values?.results?.length} product/s`}
        </Typography>
   
       
        <Grid container mb={1}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2} justifyContent={"center"}>
              {  values?.results.map((item, index) => {
                 return (
                  <>
                    <Grid item xs={12} sm={12} md={4} key={index} align='center'>
                      <Paper elevation={10} sx={{padding:'10px' ,borderRadius:'15px',height:"auto"}}>
                        <img
                          src={`${process.env.REACT_APP_API}/api/product/product-photo/${item._id}`}
                          alt=""
                          height={"350px"}
                          width={"100%"}
                          style={{borderRadius:'15px'}}
                        />
                        <Typography>{item.name.slice(0,23)} </Typography>
                        <Typography>
                         Price : {item.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}{" "}
                        </Typography>
                        <Typography> {item.description.substring(0, 45)}...</Typography>
                        <Box sx={{ display: "flex",justifyContent:'center' }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => navigate(`/productdetails/${item.slug}`)}
                      sx={{ margin: "10px ",backgroundColor:'#4a2332',fontSize:'10px'  }}
                    >
                      Details
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{
                        height: "35px",
                        margin: "10px ",
                        padding: "15px",
                        fontSize: "10px",
                        backgroundColor:'#295928',
                      
                      }}
                      onClick={() => {
                        setCart([...cart, item]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, item])
                        );
                        toast.success("item Added to cart");
                      }}
                      
                    >
                      <LocalMallIcon sx={{fontSize:'13px',paddingRight:'2px'}}/>  Add to Cart
                    </Button>
                  </Box>
                      </Paper>
                     
                    </Grid>
                    
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Link  to={'/products'}style={{textDecoration:'none'}}><Box sx={{display:'flex',justifyContent:'center'}}>
        <Button sx={{margin:'15px auto'}} variant="outlined" color="warning">Back to Product Page </Button>
        </Box> </Link> 
      </Container>
    </Layout>
      
    </>
  );
};

export default SearchPage;
