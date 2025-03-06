import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sellerReducer from "./sellerSlice"
import wishlistReducer from "./wishlistSlice"


const appStore = configureStore({
    reducer:{
        user:userReducer,
        wishlist:wishlistReducer,
        seller:sellerReducer,
    }
})

export default appStore;