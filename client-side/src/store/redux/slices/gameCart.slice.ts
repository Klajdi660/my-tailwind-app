import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameParams } from "../../../types";

interface CartState {
  items: GameParams[];
}

const initialState: CartState = {
  items: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("state.items :>> ", state.items);
      state.items.push(action.payload);
    },
  },
});

export const { addToCart } = slice.actions;
export default slice.reducer;
