import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const MAX_QUANTITY = 20;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.productID === product.productID
      );
      if (existingItem) {
        if (existingItem.quantity + product.quantity <= MAX_QUANTITY) {
          existingItem.quantity += product.quantity;
          state.totalAmount += product.productPrice * product.quantity;
        } else {
          // If adding would exceed MAX_QUANTITY, set to MAX_QUANTITY
          const newQuantity = MAX_QUANTITY - existingItem.quantity;
          existingItem.quantity = MAX_QUANTITY;
          state.totalAmount += product.productPrice * newQuantity;
        }
      } else {
        // Ensure quantity doesn't exceed MAX_QUANTITY
        const quantity = Math.min(product.quantity, MAX_QUANTITY);
        state.items.push({ ...product, quantity });
        state.totalAmount += product.productPrice * quantity;
      }
    },
    updateQuantity(state, action) {
      const { productID, quantity } = action.payload;
      const itemToUpdate = state.items.find(
        (item) => item.productID === productID
      );
      if (itemToUpdate) {
        const difference = quantity - itemToUpdate.quantity;
        if (quantity <= MAX_QUANTITY) {
          itemToUpdate.quantity = quantity;
          state.totalAmount += difference * itemToUpdate.productPrice;
        } else {
          itemToUpdate.quantity = MAX_QUANTITY;
          state.totalAmount +=
            (MAX_QUANTITY - itemToUpdate.quantity) * itemToUpdate.productPrice;
        }
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.productID === productId
      );
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.productPrice * itemToRemove.quantity;
        state.items = state.items.filter(
          (item) => item.productID !== productId
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
