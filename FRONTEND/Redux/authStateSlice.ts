import { createSlice } from '@reduxjs/toolkit'

const authStateSlice = createSlice({
    name: 'authState',
    initialState: {
        authState: false,
    },
    reducers: {
    }
})

export const { } = authStateSlice.actions
export default authStateSlice.reducer
