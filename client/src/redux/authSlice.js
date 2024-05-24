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

    }
})


export default authSlice.reducer