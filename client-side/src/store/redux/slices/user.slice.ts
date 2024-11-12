import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types";

interface SaveAuthUserData {
  id: string;
  username: string;
  email: string;
  saveAuthUserToken: string;
  photo: any;
}

interface UserLastLoginData {
  id: string;
  lastLogin: string;
}
interface UserState {
  user: User;
  saveAuthUserData: SaveAuthUserData[];
  currency: string;
  remember: boolean;
  userLastLogin: UserLastLoginData[];
}

const initialState: UserState = {
  user: localStorage.user ? JSON.parse(localStorage.user) : null,
  saveAuthUserData: [],
  currency: "L",
  remember: false,
  userLastLogin: [],
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
      const { id, ...updatedFields } = action.payload;

      const existingUser = state.saveAuthUserData.find(
        (user) => user.id === id
      );

      if (!existingUser) {
        state.saveAuthUserData.push(action.payload);
      } else {
        Object.assign(existingUser, updatedFields);
      }
    },
    clearSavedAuthUser(state, action) {
      const userIdToRemove = action.payload;
      state.saveAuthUserData = state.saveAuthUserData.filter(
        (user) => user.id !== userIdToRemove
      );
    },
    setUserLastLogin(state, action) {
      const { id, lastLogin } = action.payload;

      const existingLogin = state.userLastLogin.find(
        (login) => login.id === id
      );

      if (existingLogin) {
        existingLogin.lastLogin = lastLogin;
      } else {
        state.userLastLogin.push({ id, lastLogin });
      }
    },
    clearUserLastLogin(state, action) {
      const userId = action.payload;
      state.userLastLogin = state.userLastLogin.filter(
        (user) => user.id === userId
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
  setUserLastLogin,
  clearUserLastLogin,
} = slice.actions;
