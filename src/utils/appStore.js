import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice"


const appStore = configureStore({
    reducer:{
        user:userReducer,
        wishlist:wishlistReducer,
    }
})

export default appStore;