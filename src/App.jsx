import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavBar from "./Components/User/NavBar";
import SellerLogin from "./Components/Seller/SellerLogin";
import SellerNavBar from "./Components/Seller/SellerNavBar";
import ProductList from "./Components/Seller/ProductList";
import SideBar from "./Components/Seller/SideBar";
import AddItem from "./Components/Seller/AddItem";
import Homepage from "./Pages/Homepage";
import Feed from "./Components/User/Feed";
import UserLogin from "./Components/User/UserLogin";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import UserProfile from "./Components/User/UserProfile";

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
            </Route>
            <Route path="/seller/login" element={<SellerLogin />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
