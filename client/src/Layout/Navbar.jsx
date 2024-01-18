import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contex/AuthContext";
import Swal from "sweetalert2";
import "./Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../Contex/CartContex";
import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useCategory from "../Contex/UseCategory";
import SearchInput from "../pages/components/SearchInput";

const publicPages = ["Home", "Products", "Login", "Register"];
const privatePages = ["Home", "Products", "Contact"];
const settings = ["Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const categories = useCategory();
  const totalQuantity = cart.reduce((acc, curr) => acc + (curr.totalquantity), 0);
  const [anchorElCategory, setAnchorElCategory] = React.useState(null);

  const handleOpenCategoryMenu = (event) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElCategory(null);
  };

  const handleOpenNavMenu = (event) => {
    console.log("Opening menu");
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to Logout ?",
      html: "<span style='color: white;'>Hope You Enjoyed !</span>",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1f292e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Logout!",

      customClass: {
        popup: "custom-popup-class",
        title: "custom-title-class",
        content: "custom-content-class",
        confirmButton: "custom-confirm-button-class",
        cancelButton: "custom-cancel-button-class",

        customClass: {
          popup: "custom-popup-class",
          title: "custom-title-class",
          content: "custom-content-class",
        },
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setAuth({
          ...auth,
          user: null,
          token: "",
        });

        localStorage.removeItem("auth");
        navigate("/login");
        Swal.fire({
          title: "Logged Out!",

          html: "<span style='color: white;'>You have been logged out successfully.!</span> <br><span style='color: white;'>Good Bye!</span>",

          icon: "success",
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
            content: "custom-content-class",
            confirmButton: "custom-confirm-button-class",
            cancelButton: "custom-cancel-button-class",

            customClass: {
              popup: "custom-popup-class",
              title: "custom-title-class",
              content: "custom-content-class",
            },
          },
        });
        handleCloseUserMenu();
      }
    });
  };
  // console.log("cart", cart);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -1,
      top: 1,
      border: `1px solid white`,
      padding: "0 4px",
    },
  }));
  // console.log("Categories:", categories);

  const handleMenuItemClick = (setting) => {
    setAnchorElUser(null);

    if (setting === "Logout") {
      handleLogout();
    }
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#33424a",
          }}
        >
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Avatar
            src={"/images/logo_2.jpg"}
            alt=""
            height={"50px"}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            ShopNex
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              marginLeft: "auto",
              color: "black",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{color:"white"}}/>
            </IconButton>

            {/* Render category menu */}
            { !auth.user ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none", color: "black" },
                }}
              >
               <Avatar
            src={"/images/logo_2.jpg"}
            alt=""
            height={"50px"}
            // sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              // display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            ShopNex
          </Typography>
                {publicPages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
                <IconButton
                  size="large"
                  aria-label="category"
                  aria-controls="menu-category"
                  aria-haspopup="true"
                  onClick={handleOpenCategoryMenu}
                  color="inherit"
                >
                  <Typography fontSize="12px" noWrap component="div">
                    CATEGORIES <KeyboardArrowDownIcon fontSize="small" />
                  </Typography>
                </IconButton>

                <Menu
                  id="menu-category"
                  anchorEl={anchorElCategory}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElCategory)}
                  onClose={handleCloseCategoryMenu}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category._id}
                      onClick={handleCloseCategoryMenu}
                    >
                      {/* Handle category selection */}
                      <Link
                        to={`/category/${category.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">
                          {category.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton
                  aria-label="cart"
                  sx={{ marginRight: "10px", color: "white" }}
                  
                >
                  <StyledBadge
                    badgeContent={totalQuantity}
                    color="success"
                    component={Link}
                    to="/cart"
                    sx={{color:'white !important'}}
                  >
                    <ShoppingCartIcon sx={{ color: 'white !important' }}/>
                  </StyledBadge>
                </IconButton>

                <SearchInput />
              </Menu>
            ) : <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none", color: "black" },
                }}
              >
               <Avatar
            src={"/images/logo_2.jpg"}
            alt=""
            height={"50px"}
            // sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              // display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            ShopNex
          </Typography>
                {privatePages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
                <IconButton
                  size="large"
                  aria-label="category"
                  aria-controls="menu-category"
                  aria-haspopup="true"
                  onClick={handleOpenCategoryMenu}
                  color="inherit"
                >
                  <Typography fontSize="12px" noWrap component="div">
                    CATEGORIES <KeyboardArrowDownIcon fontSize="small" />
                  </Typography>
                </IconButton>

                <Menu
                  id="menu-category"
                  anchorEl={anchorElCategory}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElCategory)}
                  onClose={handleCloseCategoryMenu}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category._id}
                      onClick={handleCloseCategoryMenu}
                    >
                      {/* Handle category selection */}
                      <Link
                        to={`/category/${category.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">
                          {category.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton
                  aria-label="cart"
                  sx={{ marginRight: "10px" }}
                  
                >
                  <StyledBadge
                    badgeContent={totalQuantity}
                    color="success"
                    component={Link}
                    to="/cart"
                    // sx={{color:'white !important'}}
                  >
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>

                <SearchInput />
              </Menu>}
          </Box>

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <img src={'/images/logo_2.png'} alt="" height={'50px'} style={{ display: { xs: "flex", md: "none" }, mr: 1 }}/> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ShopNex
          </Typography>

          {!auth.user ? (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
             
              {/* <SearchInput /> */}
              {publicPages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
              <IconButton
                size="large"
                aria-label="category"
                aria-controls="menu-category"
                aria-haspopup="true"
                onClick={handleOpenCategoryMenu}
                color="inherit"
              >
                <Typography fontSize="14px" sx={{paddingBottom:'5px'}} noWrap component="div">
                  CATEGORIES <KeyboardArrowDownIcon fontSize="small" />
                </Typography>
              </IconButton>

              <Menu
                id="menu-category"
                anchorEl={anchorElCategory}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElCategory)}
                onClose={handleCloseCategoryMenu}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category._id}
                    onClick={handleCloseCategoryMenu}
                  >
                    {/* Handle category selection */}
                    <Link
                      to={`/category/${category.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">
                        {category.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton aria-label="cart" sx={{ marginRight: "10px" }}>
                <StyledBadge
                  badgeContent={totalQuantity}
                  color="success"
                  component={Link}
                  to="/cart"
                >
                  <ShoppingCartIcon sx={{color:'white !important'}}/>
                </StyledBadge>
              </IconButton>
              <SearchInput />
            </Box>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {/* search */}
                {/* <SearchInput /> */}
                {privatePages.map((page) => (
                  <Button
                    key={page}
                    component={Link}
                    to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
                <IconButton
                  size="large"
                  aria-label="category"
                  aria-controls="menu-category"
                  aria-haspopup="true"
                  onClick={handleOpenCategoryMenu}
                  color="inherit"
                >
                  <Typography fontSize="14px" sx={{paddingBottom:'5px'}} noWrap component="div">
                    CATEGORIES <KeyboardArrowDownIcon fontSize="small" />
                  </Typography>
                </IconButton>

                <Menu
                  id="menu-category"
                  anchorEl={anchorElCategory}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElCategory)}
                  onClose={handleCloseCategoryMenu}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category._id}
                      onClick={handleCloseCategoryMenu}
                    >
                      {/* Handle category selection */}
                      <Link
                        to={`/category/${category.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">
                          {category.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton aria-label="cart" sx={{ marginRight: "10px" }}>
                  <StyledBadge
                    badgeContent={totalQuantity}
                    color="success"
                    component={Link}
                    to="/cart"
                  >
                    <ShoppingCartIcon sx={{ color: 'white !important' }} />
                  </StyledBadge>

                </IconButton>
                <SearchInput />
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={auth.user.name.charAt(0).toUpperCase()}
                      src="/static/images/avatar/2.jpg"
                      sx={{ marginRight: "10px", bgcolor: "#2c2f36" }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleMenuItemClick(setting)}
                    >
                      {setting === "Dashboard" ? (
                        <Link
                          to={`/dashboard`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </Link>
                      ) : (
                        <Typography textAlign="center">{setting}</Typography>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
