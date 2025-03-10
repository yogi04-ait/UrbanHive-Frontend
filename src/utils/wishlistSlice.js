import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addList: (state, action) => {
            return action.payload;  
        },

        addProduct: (state, action) => {
            state.push(action.payload);  
        },

        removeProduct: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },

        clearWishlist: () => {
            return [];  
        },
    }
});

export const checkProduct = (id) => (state) =>
    state.wishlist.some((item) => item.id === id);

export const { addList, addProduct, removeProduct, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
