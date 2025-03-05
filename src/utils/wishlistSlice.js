import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:null,
    reducers:{
        addList: (state,action)=>{
            return action.payload;
        },
        removeList:(state,action)=>{
            return action.payload;
        }
    }
})

export const {addList, removeList} = wishlistSlice.actions;
export default wishlistSlice.reducer;