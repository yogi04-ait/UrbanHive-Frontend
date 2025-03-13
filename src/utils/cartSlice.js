import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const { id, name, size, quantity, image, availableQuantity } = action.payload;
            const item = state.find((product) => product.productId === id && product.size === size);

            if (!item) {
                const product = { productId: id, name: name, image: image, size: size, quantity: quantity, availableQuantity: availableQuantity };
                state.push(product);
            } else {
                item.quantity = quantity,
                    item.availableQuantity = availableQuantity
            }


        },
        removeItem: (state, action) => {
            const { id, size } = action.payload;
            const index = state.findIndex((product) => product.productId === id && product.size === size);

            if (index !== -1) {
                // Directly mutating the state to remove the item
                state.splice(index, 1);
            }
        },

        resetCart: (state, action) => {
            return []
        },

        updateQuantity: (state, action) => {
            const { id, size, isadd = false } = action.payload;
            const item = state.find((product) => product.productId === id && product.size === size);

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