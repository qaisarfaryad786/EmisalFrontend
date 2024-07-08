import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAuthService from "./userAuthService";



const initialState = {
    userInfo:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const userLogin = createAsyncThunk('userLogin', async(userLoginCredentials,thunkApi) => {
    try {

        return await userAuthService.userLogin(userLoginCredentials);

    } catch (error) {
        const status = error.response ? error.response.status : null;
        const message = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkApi.rejectWithValue({ status, message });
    }
})


export const userAuthSlice = createSlice({
    name:"userAuth",
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
        .addCase(userLogin.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            
            state.isLoading = false
            state.isSuccess = true
            state.userInfo = action.payload
            

        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.userInfo = null
        })
    }
})

export const {reset} = userAuthSlice.actions;
export default userAuthSlice.reducer;