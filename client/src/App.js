import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Profile from "./pages/User/Profile";
// import PrivateRoute from "./Route/Private";
import Dashboard from "./pages/User/Dashboard";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/Categoryproduct";
import SearchPage from "./pages/SearchPage";
import Order from "./pages/User/Order";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/productdetails/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;
