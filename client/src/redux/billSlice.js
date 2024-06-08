import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    allBill: null,
    billFiltered: null,
    loading: false,
    err: null,
    loadBillFilter: false,
    errBillfilter: null
}

const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        setAllBillPending: state => {
            state.loading = true
            state.err = null
        },
        setAllBillSuccess: (state, actions) => {
            state.loading = false
            state.err = null
            state.allBill = actions.payload
        },
        setAllBillFailure: (state, actions) => {
            state.loading = false
            state.err = actions.payload
            state.allBill = null
        },
        setBillFilterPending: state => {
            state.loadBillFilter = true
            state.errBillfilter = null
        },
        setBillFilterSuccess: (state, actions) => {
            state.loadBillFilter = false
            state.errBillfilter = null
            state.billFiltered = actions.payload
        },
        setBillFilterFailure: (state, actions) => {
            state.loadBillFilter = false
            state.errBillfilter = actions.payload
            state.billFiltered = null
        }
    }
})


export default billSlice.reducer
export const { setBillFilterFailure, setBillFilterPending, setBillFilterSuccess, setAllBillFailure, setAllBillPending, setAllBillSuccess } = billSlice.actions