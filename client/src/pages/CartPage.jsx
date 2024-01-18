import React, { useEffect, useState } from "react";
import { useCart } from "../Contex/CartContex";
import { useAuth } from "../Contex/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import DropIn from "braintree-web-drop-in-react";
import Layout from "../Layout/Layout";
import { axiosInstance } from "../Services/AxiosInstance";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // delete Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  // total cart price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price * item.totalquantity));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // get payment getaway token

  const getToken = async () => {
    try {
      const response = await axiosInstance.get(`/api/product/braintree/token`);
      setClientToken(response?.data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handleincrease = (product) => {
    const existedItem = cart.find((item) => item._id === product._id);
    if (existedItem) {
      const updatedCartItem = cart.map((cartitem) =>
        cartitem._id === product._id
          ? { ...cartitem, totalquantity: cartitem.totalquantity + 1 }
          : cartitem
      );
      setCart(updatedCartItem);
      localStorage.setItem("cart", JSON.stringify(updatedCartItem));
    } else {
      setCart([...cart, { ...product, totalquantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, totalquantity: 1 }])
      );
    }
  };

  const handledecrease = (product) => {
    const existedItem = cart.find((item) => item._id === product._id);
    if (existedItem.totalquantity === 1) {
      const updated = setCart(cart.filter((itm) => itm._id !== product._id));
      localStorage.setItem("cart", JSON.stringify(updated));
    } else {
      const updated = setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, totalquantity: item.totalquantity - 1 }
            : item
        )
      );
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  const clearcart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  return (
    <>
      <Layout title={"CartPage"}>
        <Container>
          {!auth.user ? (
            <Typography variant="h5" textAlign={"center"} my={2}>
              Hello 'Guest'
            </Typography>
          ) : (
            <Typography
              variant="h5"
              textAlign={"center"}
              fontWeight={"bold"}
              my={1}
            >
              Hello '{auth?.token && auth?.user?.name}'
            </Typography>
          )}
          {cart?.length ? (
            <Typography variant="h6" textAlign={"center"} my={2}>
              You have <span style={{ color: "red" }}>{cart.length} </span>{" "}
              items in your cart
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link to={"/products"}>
                  {" "}
                  <Button variant="outlined" color="success">
                    Add More Products
                  </Button>
                </Link>
              </Box>
              {auth?.token ? "" : "Please Login to Checkout !"}
            </Typography>
          ) : (
            <Typography variant="h6" textAlign={"center"}>
              Your Cart is Empty{" "}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link to={"/products"}>
                  {" "}
                  <Button variant="outlined" color="success">
                    Hurry! Shop Now
                  </Button>
                </Link>
              </Box>{" "}
            </Typography>
          )}
          {cart.length > 0 && (
            <Box>
              <Button onClick={clearcart} variant="outlined" color="error">
                Clear Cart{" "}
              </Button>{" "}
            </Box>
          )}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={8}>
              {cart &&
                cart?.map((p) => {
                  return (
                    <>
                      <Paper
                        elevation={5}
                        key={p._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          margin: "5px ",
                          borderRadius: "10px",
                          padding: "15px",
                        }}
                      >
                        <img
                          src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                          width="18%"
                          height={"100px"}
                          alt=""
                          style={{ borderRadius: "25px" }}
                        />
                        <Box>
                          <Typography>
                            <b>{p?.name && p?.name.slice(0, 15)}...</b>{" "}
                          </Typography>

                          {/* <Typography>
                            {p?.description && p?.description.slice(0, 40)}...
                          </Typography> */}

                          <Typography>
                            Price : $ {p.price}{" "}
                          </Typography>
                          <Typography sx={{paddingTop:'10px'}}>
                           <b>Total : </b>   
                            {(p.price * p.totalquantity).toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "USD",
                              }
                            )}{" "}
                          </Typography>
                        </Box>
                        <Box>
                          <Button
                            sx={{ fontSize: "25px" }}
                            onClick={() => handleincrease(p)}
                          >
                            +
                          </Button>
                          <span> ( {p.totalquantity} ) </span>
                          <Button
                            sx={{ fontSize: "25px" }}
                            onClick={() => handledecrease(p)}
                          >
                            -
                          </Button>
                        </Box>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ height: "35px", marginTop: "20px" }}
                          size="small"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </Button>
                      </Paper>
                    </>
                  );
                })}
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Paper
                elevation={10}
                sx={{
                  padding: "30px",
                  borderRadius: "15px",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  textAlign={"center"}
                  sx={{ fontSize: "25px", fontWeight: "bold" }}
                >
                  Cart Summary{" "}
                </Typography>
                <Typography textAlign={"center"}>
                  Total | Checkout | Payment{" "}
                </Typography>

                <hr />

                <Typography>
                  <b>Total </b> : {totalPrice()}
                </Typography>

                {auth?.user?.address ? (
                  <>
                    <Typography>Current Address : </Typography>
                    <Typography>{auth?.user?.address}</Typography>

                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => navigate("/profile")}
                    >
                      Update Address
                    </Button>
                  </>
                ) : (
                  <>
                    {auth?.token ? (
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => navigate("/profile")}
                      >
                        Update Address
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          navigate("/login", { state: "/cart" });
                        }}
                      >
                        Please Login to Checkout
                      </Button>
                    )}
                  </>
                )}

                <Box my={2}>
                  {!clientToken || !auth.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <Button
                        variant="contained"
                        // onClick={handlePayment}
                        color="success"
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Buy Now"}
                      </Button>
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default CartPage;
