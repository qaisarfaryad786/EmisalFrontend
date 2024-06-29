import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

 const user = JSON.parse(localStorage.getItem('user'));

const initialState ={
    user:user ? user : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const adminLogin = createAsyncThunk('login', async(user,thunkApi)=>{
    try {

        return await authService.adminLogin(user);

    } catch (error) {
        const status = error.response ? error.response.status : null;
        const message = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkApi.rejectWithValue({ status, message });
    }
})


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message= ''
        }
    },
    extraReducers: (Builder)=>{
        Builder
        .addCase(adminLogin.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload

        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;