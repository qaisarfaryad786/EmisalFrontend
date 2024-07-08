import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    users: null, // Initialize as null or empty array []
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getUsers = createAsyncThunk('fetchUsers', async (_,thunkApi) => {
    try {
        return await userService.fetchUsers();
    } catch (error) {
        const status = error.response ? error.response.status : null;
        const message = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
            
        return thunkApi.rejectWithValue({ status, message });
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                state.status = action.payload.status;
                state.users = null;
            })
    }
})

export const { reset } = userSlice.actions;
export default userSlice.reducer;
