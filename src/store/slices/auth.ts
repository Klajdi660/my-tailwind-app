import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        }
    }
});

export default slice.reducer;

export const { setSignupData } = slice.actions;
