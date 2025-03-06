import React, { useEffect } from "react";
import Item from "../Seller/Item";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const ProductList = () => {

  const getProducts = async ()=>{
      try {
        const res = await axios.get(BASE_URL + "/seller/profile",{withCredentials:true});
        console.log(res)
        
      } catch (error) {
        
      }
  }

  useEffect(getProducts,[])

  return (
    <div className="w-full flex flex-col gap-1 py-7 px-12 font-[Outfit]">
      <h1 className="mb-2 text-gray-500 font-semibold">All Products List</h1>
      <div className="bg-gray-100 flex justify-between p-0.5 pl-3 pr-10 text-gray-600 ">
        <div className="flex gap-24 min-w-2xs">
          <p className="font-semibold">Image</p>
          <p className="font-semibold">Name</p>
        </div>
        <div className="flex gap-16">
          <p className="font-semibold">Category</p>
          <p className="font-semibold">Price</p>
          <p className="font-semibold">Action</p>
        </div>
      </div>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default ProductList;
