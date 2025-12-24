import { createSlice } from '@reduxjs/toolkit'
import { router } from 'expo-router'

const authStateSlice = createSlice({
    name: 'authState',
    initialState: {
        authState: false,
    },
    reducers: {
        setAuthStateTrue: (state) => {
            state.authState = true
            router.replace('/(tabs)')
        }
    }
})

export const { setAuthStateTrue } = authStateSlice.actions
export default authStateSlice.reducer
