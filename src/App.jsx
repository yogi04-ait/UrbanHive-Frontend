import React from "react";
import NavBar from "./Components/NavBar";
import SellerLogin from "./Components/Seller/SellerLogin";
import SellerNavBar from "./Components/Seller/SellerNavBar";
import ProductList from "./Components/Seller/ProductList";
import SideBar from "./Components/Seller/SideBar";

const App = () => {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <SellerLogin /> */}
      <SellerNavBar />
      <div className="flex">
        <SideBar  />
        <ProductList  />
      </div>
    </div>
  );
};

export default App;
