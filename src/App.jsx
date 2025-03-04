import React from "react";
import NavBar from "./Components/NavBar";
import SellerLogin from "./Components/Seller/SellerLogin";
import SellerNavBar from "./Components/Seller/SellerNavBar";
import ProductList from "./Components/Seller/ProductList";
import SideBar from "./Components/Seller/SideBar";
import AddItem from "./Components/Seller/AddItem";

const App = () => {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <SellerLogin /> */}
      <SellerNavBar />
      <div className="flex">
        <SideBar />
        {/* <ProductList  /> */}
        <AddItem />
      </div>
    </div>
  );
};

export default App;
