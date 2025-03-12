import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const { id, size, quantity } = action.payload;
            const item = state.find((product) => product.id === id && item.size === size);

            if (!item) {
                const product = { productId: id, size: size, quantity: quantity };
                state.push(product);
            } else {
                item.quantity = quantity;
            }


        },
        removeItem: (state, action) => {
            const { id, size } = action.payload
            state = state.filter((item) => !(item.id === id && item.size === size));

        },

        resetCart: (state, action) => {
            return []
        },

        updateQuantity: (state, action) => {
            const { id,size, isadd } = action.payload;
            const item = state.find((item) => item.id === id && item.size === size);

            if (item) {
                if (isadd) {
                    item.quantity += 1;
                } else {
                    if (item.quantity > 0) {
                        item.quantity -= 1;
                    }
                }
            }

        }

    }
})

export const { addToCart, removeItem, resetCart, updateQuantity } = cart.actions;
export default cart.reducer;