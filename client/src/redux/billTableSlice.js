import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    allBillTable: null,
    billTableFiltered: null,
    loading: false,
    err: null,
    loadBillTableFilter: false,
    errBillTablefilter: null
}

const billTableSlice = createSlice({
    name: 'billTable',
    initialState,
    reducers: {
        setAllBillTablePending: state => {
            state.loading = true
            state.err = null
        },
        setAllBillTableSuccess: (state, actions) => {
            state.loading = false
            state.err = null
            state.allBillTable = actions.payload
        },
        setAllBillTableFailure: (state, actions) => {
            state.loading = false
            state.err = actions.payload
            state.allBillTable = null
        },
        setBillTableFilterPending: state => {
            state.loadBillTableFilter = true
            state.errBillTablefilter = null
        },
        setBillTableFilterSuccess: (state, actions) => {
            state.loadBillTableFilter = false
            state.errBillTablefilter = null
            state.billTableFiltered = actions.payload
        },
        setBillTableFilterFailure: (state, actions) => {
            state.loadBillTableFilter = false
            state.errBillTablefilter = actions.payload
            state.billTableFiltered = null
        }
    }
})


export default billTableSlice.reducer
export const { setAllBillTableFailure, setAllBillTablePending, setAllBillTableSuccess, setBillTableFilterFailure, setBillTableFilterPending, setBillTableFilterSuccess} = billTableSlice.actions