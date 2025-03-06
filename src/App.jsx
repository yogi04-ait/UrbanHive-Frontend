import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavBar from "./Components/User/NavBar";
import SellerLogin from "./Components/Seller/SellerLogin";
import SellerNavBar from "./Components/Seller/SellerNavBar";
import ProductList from "./Components/Seller/ProductList";
import AddItem from "./Components/Seller/AddItem";
import Homepage from "./Pages/Homepage";
import Feed from "./Components/User/Feed";
import UserLogin from "./Components/User/UserLogin";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import UserProfile from "./Components/User/UserProfile";
import Sellerpage from "./Pages/Sellerpage";
import Orders from "./Components/Seller/Orders";
import Wishlist from "./Components/User/Wishlist";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Route>
            <Route path="/seller/login" element={<SellerLogin />} />
            <Route path="/seller" element={<Sellerpage />}>
              <Route path="/seller/products" element={<ProductList />} />
              <Route path="/seller/add" element={<AddItem />} />
              <Route path="/seller/orders" element={<Orders />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
