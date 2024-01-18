import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useCart } from "../Contex/CartContex";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
import { axiosInstance } from "../Services/AxiosInstance";
import LocalMallIcon from '@mui/icons-material/LocalMall';
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const getPrductsByCat = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(
        `/api/product/product-category/${params.slug}`
      );
      setLoading(false)
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <Layout title={"CategoryProductDetails"}>
      <Box
        role="presentation"
        onClick={handleClick}
        color={"white"}
        sx={{
          height: "30px",
          backgroundColor: "#607b8a",
          padding: "20px",
          maxWidth: "100%",
        }}
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
            style={{ color: "white", textDecoration: "none" }}
          >
            Category - {category?.name}
          </Link>
        </Breadcrumbs>
      </Box>
      <Container>
      

        {products?.length < 1 ? (
          <Box sx={{ height: "80vh", marginTop: "50px", fontSize: "40px" }}>
            {" "}
            <Typography textAlign={"center"} variant="h5" my={2}>
              {" "}
              0 Product/s Found
            </Typography>
          </Box>
        ) : (
          <Typography textAlign={"center"} variant="h5" my={2}>
            {products?.length} Product/s Found
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2} justifyContent={"center"}>
              { loading ?
                <Grid item xs={12} sm={12} md={4} justifyContent={"center"}>
                  <Paper
                    elevation={10}
                    sx={{
                      height: "auto",
                      textAlign: "center",
                      padding: "10px",
                      margin: "20px auto",
                      borderRadius: "20px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={"200px"}
                      width={"75%"}
                      style={{ borderRadius: "20px" }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                        <Skeleton/>
                      </Typography>
                      <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                      <Skeleton/>
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                      disabled
                      >
                        <Skeleton/>
                      </Button>
                      <Button
                      disabled
                      >
                        <Skeleton/>
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              
               : (products?.map((item, index) => (
                 <Grid key={index} item xs={12} sm={12} md={4}>
                  <Paper
                    elevation={10}
                    sx={{
                      height: "auto",
                      textAlign: "center",
                      padding: "10px",
                      margin: "20px auto",
                      borderRadius: "20px",
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/product/product-photo/${item._id}`}
                      alt=""
                      height={"400px"}
                      width={"100%"}
                      style={{ borderRadius: "20px" }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                        {item.name.slice(0, 27)}
                      </Typography>
                      <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                        Price :{" "}
                        {item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => navigate(`/productdetails/${item.slug}`)}
                        sx={{ margin: "10px",backgroundColor:'#4a2332',fontSize:'10px'  }}
                      >
                        Details
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                          setCart([...cart, item]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, item])
                          );
                          toast.success("item Added to cart");
                        }}
                        sx={{backgroundColor:'#295928',fontSize:'10px'}}
                      >
                       <LocalMallIcon sx={{fontSize:'13px',paddingRight:'2px'}}/> ADD TO CART
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ) ) ) 
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CategoryProduct;
