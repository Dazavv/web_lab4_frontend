import { configureStore } from "@reduxjs/toolkit"
import { loginReducer } from "./login"
import { passwordReducer } from "./password"

export const AuthorizationStore = configureStore({
    reducer: {
        login: loginReducer,
        password: passwordReducer
    }
})
