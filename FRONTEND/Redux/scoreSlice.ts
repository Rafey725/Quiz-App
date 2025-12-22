import { createSlice } from '@reduxjs/toolkit'

const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        score: 0,
    },
    reducers: {
        increamentScore: (state) => {
            state.score += 1
        },
        resetScore: (state) => {
            state.score = 0
        }
    }
})

export const { increamentScore, resetScore } = scoreSlice.actions
export default scoreSlice.reducer
