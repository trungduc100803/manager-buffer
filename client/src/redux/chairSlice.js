import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    listCurrentChair: [],
    err: null,
    loading: false
}

const chairSlice = createSlice({
    name: 'chair',
    initialState,
    reducers: {
        setPendingAddChair: (state) => {
            state.loading = true
            state.err = null
        },
        setSuccessAddChair: (state, actions) => {
            state.loading = false
            const prevChair = state.listCurrentChair
            const chairs = actions.payload
            state.listCurrentChair = [...prevChair, chairs]
            state.err = null
        },
        setFailureAddChair: (state, actions) => {
            state.loading = false
            state.err = actions.payload
        },
        setAllChair: (state, actions) => {
            state.loading = false
            const chairs = actions.payload
            state.listCurrentChair = [...chairs]
            state.err = null
        },
    }
})


export const { setFailureAddChair, setPendingAddChair, setSuccessAddChair, setAllChair } = chairSlice.actions
export default chairSlice.reducer