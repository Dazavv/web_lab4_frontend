import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: ""
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.value = action.payload
        },
        resetLogin: state => {
            state.value = ""
        }
    }
})

export const { setLogin, resetLogin } = loginSlice.actions

export const getLogin = state => state.login.value

export const loginReducer = loginSlice.reducer
