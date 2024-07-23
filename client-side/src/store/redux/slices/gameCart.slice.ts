// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { GameParams } from "../../../types";

// import { ADD_TO_CART, REMOVE_FROM_CART } from "../action";
// interface CartState {
//   items: GameParams[];
// }

// const initialState = {
//   items: [],
// };

// const cartReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//       };
//     case REMOVE_FROM_CART:
//       return {
//         ...state,
//         items: state.items.filter((item: any) => item.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };

// export default cartReducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
    addToCart: (state, action: PayloadAction<GameParams>) => {
      const inCart = state.items.find((item) => item.id === action.payload.id);
      if (inCart) {
        toast.error("Game already in cart");
        return;
      }

      // state.items.push(action.payload);
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = slice.actions;

export default slice.reducer;
