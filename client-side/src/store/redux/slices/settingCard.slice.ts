import { toast } from "react-toastify";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Card {
  id: number;
  cardNumber: string;
  cardName: string;
  cardValidThru: string;
  cardCvvNumber: string;
}

interface CardState {
  cardItems: Card[];
}

const initialState: CardState = {
  cardItems: [],
};

const slice = createSlice({
  name: "settingCard",
  initialState,
  reducers: {
    addNewCard: (state, action: PayloadAction<Card>) => {
      const existingCard = state.cardItems.find(
        (item) => item.cardNumber === action.payload.cardNumber
      );
      if (existingCard) {
        toast.error("Card already exists.");
        return;
      }

      state.cardItems = [
        ...state.cardItems,
        { ...action.payload, id: state.cardItems.length },
      ];
      toast.success("Card added successfully.");
    },
    removeSelectedCard: (state, action: PayloadAction<number>) => {
      state.cardItems = state.cardItems.filter(
        (item) => item.id !== action.payload
      );
      toast.success("Card removed successfully.");
    },
  },
});

export const { addNewCard, removeSelectedCard } = slice.actions;

export default slice.reducer;
