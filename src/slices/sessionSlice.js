import { createSlice } from "@reduxjs/toolkit";



export const sessionSlice = createSlice({
    name : 'session',
    initialState : {
        userState : "Logged out",
        pseudo : "",
        token : ""

    },
    reducers : {
        logIn : (state,action) => {
            state.userState = "Logged in"
            state.pseudo = action.payload.pseudo
            state.token = action.payload.token
            
        },
        logOut : (state) => {
            state.userState = "Logged out"
            state.pseudo = ""
            state.token = ""
        }
    }
})

export const { logIn,logOut } = sessionSlice.actions

export default sessionSlice.reducer