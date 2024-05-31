import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    allNotifyProduct: null,
    loading: false,
    err: null
}

const notifyProductSlice = createSlice({
    name: 'notifyProduct',
    initialState,
    reducers: {
        setAllNotifyProductPending: state => {
            state.loading = true
            state.err = null
        },
        setAllNotifyProductFailure: (state, actions) => {
            state.loading = false
            state.err = actions.payload
        },
        setAllNotifyProductSuccess: (state, actions) => {
            state.loading = false
            state.err = null
            state.allNotifyProduct = actions.payload
        }
    }
})


export default notifyProductSlice.reducer
export const { setAllNotifyProductFailure, setAllNotifyProductSuccess, setAllNotifyProductPending } = notifyProductSlice.actions