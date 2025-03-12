import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sellerReducer from "./sellerSlice"
import wishlistReducer from "./wishlistSlice"
import cartReducer from "./cartSlice";


const appStore = configureStore({
    reducer:{
        user:userReducer,
        wishlist:wishlistReducer,
        seller:sellerReducer,
        cart:cartReducer
    }
})

export default appStore;