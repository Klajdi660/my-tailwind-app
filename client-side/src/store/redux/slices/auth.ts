import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: '',
    loading: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, value) {
            state.loading = value.payload;
        }
    },
});

export default slice.reducer;

export const { setLoading } = slice.actions;
