import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import userAuthReducer from "./auth/userAuthService";
import addNewUserReducer from "./user/createUserSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        userAuth: userAuthReducer,
        addUser:addNewUserReducer
    },
})