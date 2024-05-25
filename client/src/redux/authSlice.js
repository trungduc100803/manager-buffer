import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthSuccess: (state, actions) => {
            state.currentUser = actions.payload
            state.error = null
            state.loading = false
        },
        setAuthPending: (state, actions) => {
            state.currentUser = null
            state.error = null
            state.loading = true
        },
        setAuthFailure: (state, actions) => {
            state.currentUser = null
            state.error = actions.payload
            state.loading = false
        },
    }
})

export const { setAuthFailure, setAuthPending, setAuthSuccess } = authSlice.actions
export default authSlice.reducer