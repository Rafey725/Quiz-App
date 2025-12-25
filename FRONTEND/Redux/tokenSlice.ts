import { createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'





const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: 0
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setToken} = tokenSlice.actions
export default tokenSlice.reducer
