import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AuthSlice";
import loginReducer from "./Slice/LoginSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        login: loginReducer,
    }
})