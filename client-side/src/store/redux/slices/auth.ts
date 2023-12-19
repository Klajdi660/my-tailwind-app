import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: '',
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
});

export default slice.reducer;

export const {} = slice.actions;
