import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createUserService from "./createUserService";

const initialState = {
        newUser: null,
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:""
}

export const createUser = createAsyncThunk('creatingUser', async (userDetails, thunkAPI) => {
    try {
        return await createUserService.createUser(userDetails);
    } catch (error) {
        const status = error.response ? error.response.status : null;
        const message = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue({ status, message });
    }
});

export const addNewUserSlice =  createSlice({
    name:"addUser",
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
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.newUser = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                state.status = action.payload.status;
                state.newUser = null;
            })
    }
})

export const { reset } = addNewUserSlice.actions;
export default addNewUserSlice.reducer;