import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    listCurrentTable: [],
    err: null,
    loading: false
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setPendingAddTable: (state) => {
            state.loading = true
            state.err = null
        },
        setSuccessAddTable: (state, actions) => {
            state.loading = false
            const prevTable = state.listCurrentTable
            const tables = actions.payload
            state.listCurrentTable = [...prevTable, tables]
            state.err = null
        },
        setFailureAddTable: (state, actions) => {
            state.loading = false
            state.err = actions.payload
        },
        setAllTable: (state, actions) => {
            state.loading = false
            const tables = actions.payload
            state.listCurrentTable = [...tables]
            state.err = null
        },
    }
})


export const {setAllTable, setFailureAddTable, setPendingAddTable, setSuccessAddTable} = tableSlice.actions
export default tableSlice.reducer