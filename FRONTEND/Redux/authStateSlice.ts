import { createSlice } from '@reduxjs/toolkit'
import { router } from 'expo-router'

const authStateSlice = createSlice({
    name: 'authState',
    initialState: {
        authState: true,
    },
    reducers: {
        setAuthStateTrue: (state) => {
            state.authState = true
            router.replace('/(tabs)')
        },
        setAuthStateFalse: (state) => {
            state.authState = false
            router.replace('/(auth)')
        }
    }
})

export const { setAuthStateTrue, setAuthStateFalse } = authStateSlice.actions
export default authStateSlice.reducer
