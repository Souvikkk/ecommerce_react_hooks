import React, { useEffect, useState } from "react";
import { GetAllCategory, GetAllProduct } from "../Services/AllApi";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  Grid,
  Pagination,
  Paper,
  Radio,
  Skeleton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Contex/CartContex";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
import { axiosInstance } from "../Services/AxiosInstance";
import { Prices } from "./components/PriceFilter";
import LocalMallIcon from "@mui/icons-material/LocalMall";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();

  const GetProductList = async () => {
    const response = await GetAllProduct();
    // const response =await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${page}`)
    // console.log(response);
    setProducts(response?.data?.products);
  };

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

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, []);
  const getTotal = async () => {
    try {
      const { data } = await axiosInstance.get("/api/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetProductList();
    getTotal();
  }, []);

  const getCategory = async () => {
    try {
      setLoading(true);
      const response = await GetAllCategory();
      setCategory(response?.data?.category);
      setLoading(false);
    } catch (error) {
      console.log("error fetching cat", error);
    }
  };
  useEffect(() => {
    GetProductList();
    getCategory();
    getTotal();
  }, []);
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    console.log("Current Radio Value:", radio);
  }, [radio]);
  const handleRadio = (value) => {
    setRadio(value);
  };

  useEffect(() => {
    console.log("Current Checkbox Value:", checked);
  }, [checked]);

  useEffect(() => {
    console.log("Current Radio Value:", radio);
  }, [radio]);
  const filterProduct = async () => {
    try {
      const response = await axiosInstance.post(`/api/product/filter-product`, {
        checked,
        radio,
      });
      // console.log("Response:", response);
      setProducts(response?.data?.products);
    } catch (error) {
      console.error("Error Filtering:", error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) GetProductList();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (!checked.length || !radio.length) filterProduct();
  }, [checked, radio]);
  // console.log("set",radio);

  const productPerPage = 6;
  const IndexOfLastProduct = productPerPage * currentPage;
  const IndexOfFirstProduct = IndexOfLastProduct - productPerPage;
  const CurrentProduct = products.slice(
    IndexOfFirstProduct,
    IndexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <>
      <Layout title={"AllProduct"}>
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
              style={{ color: "white", textDecoration: "none" }}
            >
              Products
            </Link>
          </Breadcrumbs>
        </Box>
        <Container>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={12} md={9}>
              <Grid container spacing={2} justifyContent={"center"}>
                {loading &&
                  // Show skeletons while loading
                  Array.from({ length: 6 }).map((_, index) => (
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
                        <Skeleton variant="rectangular" height={200} />
                        <Box>
                          <Typography
                            sx={{ fontSize: "17px", fontWeight: "bold" }}
                          >
                            <Skeleton />
                          </Typography>
                          <Typography
                            sx={{ fontSize: "17px", fontWeight: "bold" }}
                          >
                            <Skeleton />
                          </Typography>
                        </Box>
                        <Box>
                          <Button disabled>
                            <Skeleton />
                          </Button>
                          <Button disabled>
                            <Skeleton />
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                {!loading &&
                  CurrentProduct?.map((item, index) => (
                    <Grid key={index} item xs={12} sm={12} md={4}>
                      <Paper
                        elevation={5}
                        sx={{
                          height: "auto",
                          textAlign: "center",
                          // padding: "10px",
                          margin: "20px auto",
                          // borderRadius: "20px",
                        }}
                      >
                        <Box sx={{ padding: "10px" }}>
                          <Typography
                            sx={{ fontSize: "17px", fontWeight: "bold" }}
                          >
                            {item.name.slice(0, 23)}
                          </Typography>
                        </Box>
                        <img
                          src={`${process.env.REACT_APP_API}/api/product/product-photo/${item._id}`}
                          alt=""
                          height={"260px"}
                          width={"100%"}
                          // style={{ borderRadius: "20px" }}
                        />
                        <Box>
                          {/* <Typography
                          sx={{ fontSize: "17px", fontWeight: "bold" }}
                        >
                          {item.name.slice(0, 25)}
                        </Typography> */}
                          <Typography
                            sx={{ fontSize: "17px", fontWeight: "bold" }}
                          >
                            Price :{" "}
                            {item.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </Typography>
                        </Box>
                        <Box>
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            onClick={() =>
                              navigate(`/productdetails/${item.slug}`)
                            }
                            sx={{
                              margin: "10px",
                              backgroundColor: "#4a2332",
                              fontSize: "10px",
                            }}
                          >
                            Details
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            // onClick={() => {
                            //   setCart([...cart, item]);
                            //   localStorage.setItem(
                            //     "cart",
                            //     JSON.stringify([...cart, item])
                            //   );
                            //   toast.success("item Added to cart");
                            // }}
                            onClick={() => handleAdd(item)}
                            sx={{
                              backgroundColor: "#295928",
                              fontSize: "10px",
                            }}
                          >
                            <LocalMallIcon
                              sx={{ fontSize: "13px", paddingRight: "2px" }}
                            />{" "}
                            ADD TO CART
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>

              <Box
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={Math.ceil(products.length / productPerPage)}
                  page={currentPage}
                  color="success"
                  onChange={(event, value) => paginate(value)}
                  style={{ margin: "0px 5px" }}
                  variant="outlined"
                  shape="rounded"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Container>
                <Paper
                  // elevation={10}
                  sx={{
                    padding: "10px",
                    margin: "20px 0px",
                    // borderRadius: "15px",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", margin: "10px 0px" }}>
                    Search By Category{" "}
                  </Typography>
                  {category?.map((items, index) => {
                    return (
                      <>
                        <li key={index} style={{ listStyle: "none" }}>
                          <Checkbox
                            onChange={(e) =>
                              handleFilter(e.target.checked, items._id)
                            }
                            color="success"
                          />
                          {items.name}
                        </li>
                      </>
                    );
                  })}
                </Paper>
                <Paper
                  // elevation={10}
                  sx={{
                    margin: "59px 0px",
                    padding: "10px",
                    // borderRadius: "15px",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", margin: "10px 0px" }}>
                    Search By Price
                  </Typography>

                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio
                        checked={radio === p.array}
                        onChange={() => handleRadio(p.array)}
                        color="primary"
                      />
                      {p.name}
                    </div>
                  ))}

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => window.location.reload()}
                    >
                      {" "}
                      RESET FILTER
                    </Button>
                  </Box>
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default AllProducts;
