import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAccountDelete: false,
  accoundDeleteDaysDifference: null,
};

const slice = createSlice({
  name: "cancelDeleteAccount",
  initialState,
  reducers: {
    setIsAccountDelete(state, action) {
      state.isAccountDelete = action.payload.isAccountDelete;
    },
    setAccountDeleteDaysDifference(state, action) {
      state.accoundDeleteDaysDifference =
        action.payload.accoundDeleteDaysDifference;
    },
  },
});

export default slice.reducer;
export const { setIsAccountDelete, setAccountDeleteDaysDifference } =
  slice.actions;
