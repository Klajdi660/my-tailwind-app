import { toast } from "react-toastify";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameParams, CartState } from "../../../types";

const initialState: CartState = {
  items: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<GameParams>) => {
      const inCart = state.items.find((item) => item.id === action.payload.id);
      if (inCart) {
        toast.error("Game already in cart", { pauseOnHover: false });
        return;
      }

      toast.success("Game added to cart", { pauseOnHover: false });
      // state.items.push(action.payload);
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeSelectedGames: (state, action: PayloadAction<number[]>) => {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.id)
      );
    },
  },
});

export const { addToCart, removeFromCart, removeSelectedGames } = slice.actions;

export default slice.reducer;
