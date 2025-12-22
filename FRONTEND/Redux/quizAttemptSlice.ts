import { createSlice } from '@reduxjs/toolkit'

const quizAttemptSlice = createSlice({
    name: 'quizAttempt',
    initialState: {
        attemptId: 0,
    },
    reducers: {
        newAttempt: (state) => {
            state.attemptId = Date.now()
        },
        resetAttempt: (state) => {
            state.attemptId = 0
        }
    }
})

export const { newAttempt, resetAttempt } = quizAttemptSlice.actions
export default quizAttemptSlice.reducer
