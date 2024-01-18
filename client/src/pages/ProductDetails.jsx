import { Box, Breadcrumbs, Button, Container, Grid, Paper, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useCart } from "../Contex/CartContex";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
import { axiosInstance } from "../Services/AxiosInstance";
import LocalMallIcon from '@mui/icons-material/LocalMall';
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [loading,setLoading] =useState(false)
  const getProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(
        `/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  // let productname = product.name.split(" ")
  const handleAdd = (product) => {
    const existedItem = cart.find((item) => item._id === product._id);
    if (existedItem) {
      const updatedCartItem = cart.map((cartitem) =>
        cartitem._id === product._id
          ? { ...cartitem, totalquantity: cartitem.totalquantity + 1 }
          : cartitem
      );
      setCart(updatedCartItem);
      localStorage.setItem("cart", JSON.stringify(updatedCartItem));
      console.log("Updated Carts:", updatedCartItem);
      console.log(
        "Local Storage Carts:",
        JSON.parse(localStorage.getItem("cart"))
      );
    } else {
      setCart([...cart, { ...product, totalquantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, totalquantity: 1 }])
      );
    }
    // toast.success("Item added to cart");
  };
  return (
    <>
    <Layout title={'ProductDetails'}>
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
              Product Details
            </Link>
         
          </Breadcrumbs>
        </Box>
    <Container>
    {
      loading?
      <Grid container spacing={2}>       
          <Grid item xs={12} sm={12} md={6} align={"center"}>
          
            <Box sx={{ margin: " auto", height: "800px", padding: "20px" }}>
              <Skeleton
                 variant="rectangular"
                height={"450px"}
                width={"100%"}
                style={{ borderRadius: "15px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                padding: "10px",
                margin: "20px auto",
                borderRadius: "15px",
              }}
            >
              <Box>
                <Typography variant="h5" textAlign={"center"} p={2}>
                  <b>
                    {" "}
                    <u><Skeleton/></u>
                  </b>
                </Typography>
                <Typography>
                <Skeleton/>
                </Typography>
                <Typography textAlign={"justify"}>
                <Skeleton/>
                </Typography>
                <Typography>
                  {" "}
                  <Skeleton/>
                  <Skeleton/>
                </Typography>
                <Typography>
                <Skeleton/>
                </Typography>
                <Button disabled>
                 <Skeleton/>
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
    :
    (
      <Grid container spacing={1}>       
          <Grid item xs={12} sm={12} md={6} align={"center"}>
          
            <Box sx={{ margin: " auto", height: "400px", padding: "20px" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
                alt={product.name}
                height={"450px"}
                width={"100%"}
                style={{ borderRadius: "15px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                padding: "10px",
                margin: "20px auto",
                borderRadius: "15px",
              }}
            >
              <Box>
                <Typography variant="h5" textAlign={"center"} p={2}>
                  <b>
                    {" "}
                    <u>Product Details</u>
                  </b>
                </Typography>
                <Typography>
                  <b>Item : </b> {product.name}
                </Typography>
                <Typography textAlign={"justify"}>
                  <b> Desc : </b> {product.description}
                </Typography>
                <Typography>
                  {" "}
                  <b> Price : </b>{" "}
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Typography>
                <Typography>
                  <b>Category </b> : {product?.category?.name}{" "}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ marginY: "10px",backgroundColor:'#295928' }}
                  onClick={()=> handleAdd(product)}
                >
                  <LocalMallIcon sx={{fontSize:'13px',paddingRight:'2px'}}/>  Add to Cart
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
    )}


  
        {/* similar products */}
        <Typography variant="h5" textAlign={"center"} my={5}>
          <b>
            {" "}
            <u>Similar Products</u>
          </b>{" "}
        </Typography>
        {relatedProducts?.length < 1 ? (
          <Typography textAlign={"center"}>
            No Similar Products found
          </Typography>
        ) : null}

        <Grid container spacing={2} sx={{mb:2}}>
          <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2} justifyContent={'center'} >
          {relatedProducts?.map((items, index) => {
            return (
              <>
             
              <Grid item xs={12} sm={6} md={4} align ='center'>
              <Paper
                  elevation={10}
                  sx={{ padding: "10px", borderRadius: "15px", }}
                >
                <Box sx={{padding:'10px',}}>
                        <Typography
                          sx={{ fontSize: "17px", fontWeight: "bold" }}
                        >
                          {items.name.slice(0, 23)}
                        </Typography>
                        </Box>
                  <img
                    src={`${process.env.REACT_APP_API}/api/product/product-photo/${items._id}`}
                    height={"400px"}
                    width={"100%"}
                    alt={items.name}
                    style={{ borderRadius: "15px" }}
                  />
                  <Typography>
                    {" "}
                    <b> Price : </b>{" "}
                    {items?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Typography>

                  <Typography sx={{padding:'0px 20px'}}>
                    <b> Desc : </b>
                    {items.description && items.description.substring(0, 60)}...
                  </Typography>
                  <Box sx={{ display: "flex",justifyContent:'center' }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => navigate(`/productdetails/${items.slug}`)}
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
                      onClick={() => {handleAdd(items) }}
                      
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
          
     
      </Container>
    </Layout>
      
    </>
  );
};

export default ProductDetails;
