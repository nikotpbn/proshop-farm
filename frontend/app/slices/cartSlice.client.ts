import type { CartItem } from "~/models/CartItem";

import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "~/src/utils/cartUtils";

const cartStorage = localStorage.getItem("cart");
let initialState = { cartItems: [] };



if (cartStorage) {
  initialState = JSON.parse(cartStorage);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x: CartItem) => {
        x._id === item.id;
      });

      if (existItem) {
        state.cartItems = state.cartItems.map((x: CartItem) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
