import { createSlice } from "@reduxjs/toolkit";
let hosts = ['http://127.0.0.1:4005', 'https://jellyfish-app-erikt.ondigitalocean.app']

const initiateAuthState = {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    isChatOpen: false,
    host: hosts[1]
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initiateAuthState,
    reducers: {
        token(state, action) {
            const token = action.payload
            state.token = token
        },
        userName(state, action) {
            const username = action.payload
            state.username = username
        },
        clearToken(state) {
            localStorage.clear()
            state.token = ''
            state.username = ''
        },
        toggleChat(state) {
            state.isChatOpen = !state.isChatOpen
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer