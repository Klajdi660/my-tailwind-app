import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types";

interface SaveAuthUserData {
  id: string;
  username: string;
  email: string;
  saveAuthUserToken: string;
  photo: any;
}

interface UserState {
  user: User;
  saveAuthUserData: SaveAuthUserData[];
  currency: string;
  remember: boolean;
}

const initialState: UserState = {
  user: localStorage.user ? JSON.parse(localStorage.user) : null,
  saveAuthUserData: [],
  currency: "L",
  remember: false,
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state.user = user;

      state.remember = user
        ? state.saveAuthUserData.some(({ id }) => id === user.id)
        : false;
    },
    setSavedAuthUser(state, action) {
      const exists = state.saveAuthUserData.some(
        (user) => user.id === action.payload.id
      );

      if (!exists) {
        state.saveAuthUserData.push(action.payload);
      }
    },
    clearSavedAuthUser(state, action) {
      const userIdToRemove = action.payload;
      state.saveAuthUserData = state.saveAuthUserData.filter(
        (user) => user.id !== userIdToRemove
      );
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setRemember(state, action) {
      state.remember = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  setUser,
  setCurrency,
  setRemember,
  setSavedAuthUser,
  clearSavedAuthUser,
} = slice.actions;
