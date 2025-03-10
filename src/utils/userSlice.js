import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser:(state,action)=>{
            return action.payload;
        },
        removeUser:(state,action)=>{
            return null;
        },
        // add product id to wishlist array
        addToWishlist:(state,action)=>{
            if(state && !state.wishlist.includes(action.payload)){
                state.wishlist.push(action.payload);
            }
        },
        // remove product id from wishlist array
        removeFromWishlist:(state,action)=>{
            if(state){
                state.wishlist = state.wishlist.filter(
                    (id) => id !== action.payload
                );
            }
        }
    }
})

export const {addUser, removeUser , addToWishlist, removeFromWishlist} = userSlice.actions;
export default userSlice.reducer;