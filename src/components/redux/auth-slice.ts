import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {getFromLocalStorage} from "../utils/getFromLocalStorage";
import {Navigate, useNavigate} from "react-router-dom";

type getUsersType = {
    username: string,
    password: string
}

export const getUsers = createAsyncThunk('authSlice/getUsers', async ({username, password}: getUsersType) => {
    const {data} = await axios.get('./users.json')
    const response = {
        data,
        username,
        password
    }
    return response
})

export type userType = {
    username: string,
    password: string
}

type stateType = {
    isAuth: boolean | null,
    username: string | null,
    password: string,
    isLoading: boolean,
    error: string
}

const {username, isAuth} = getFromLocalStorage()

const initialState: stateType = {
    isAuth,
    username,
    password: null as unknown as string,
    isLoading: false,
    error: ''
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
            state.isLoading = false
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setUser(state, action: PayloadAction<string>) {
            state.username = action.payload
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        },
        logOut(state) {
            state.isAuth = false
            state.username = null as unknown as string
            state.password = null as unknown as string
            localStorage.removeItem('auth')
            localStorage.removeItem('username')

        }
    },
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            const userFind = action.payload.data.filter((user: any) => user.username === action.payload.username && user.password === action.payload.password)
            if (userFind.length >= 1) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('username', userFind[0].username)
                state.username = userFind[0].username
                state.isAuth = true

            } else {
                state.error = 'Неправильный логин или пароль'
            }
            state.isLoading = false
            console.log(userFind)
        })
    }
})

export const {logOut} = authSlice.actions

export default authSlice.reducer