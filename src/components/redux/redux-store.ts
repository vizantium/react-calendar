import {applyMiddleware, configureStore, createAsyncThunk} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import authSlice from "./auth-slice";
import eventSlice from "./event-slice";

export const store = configureStore({
    reducer: {
        authSlice: authSlice,
        eventSlice: eventSlice
    }
})

export type StateType = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()