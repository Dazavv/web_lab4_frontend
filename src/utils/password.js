import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: ""
}

export const passwordSlice = createSlice({
    name: "password",
    initialState,
    reducers: {
        setPassword: (state, action) => {
            state.value = action.payload
        },
        resetPassword: state => {
            state.value = ""
        }
    }
})

export const { setPassword, resetPassword } = passwordSlice.actions

export const getPassword = state => state.password.value

export const passwordReducer = passwordSlice.reducer
