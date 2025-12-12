import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        turnOffLoading: (state) => {
            state.loading = false
        },
        turnOnLoading: (state) => {
            state.loading = true
        }
    }
})

export const { turnOffLoading, turnOnLoading } = loadingSlice.actions
export default loadingSlice.reducer