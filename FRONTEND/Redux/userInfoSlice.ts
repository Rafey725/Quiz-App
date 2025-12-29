import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {
        username: 'Aamir',
        id: '1'
    }
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const { setUserInfo } = userInfoSlice.actions
export default userInfoSlice.reducer