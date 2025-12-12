import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questionNum: 0
}


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setQuestionNumZero: (state) => {
            state.questionNum = 0
        },
        increamentQuestionNum: (state) => {
            state.questionNum += 1
        }
    }
})

export const { setQuestionNumZero, increamentQuestionNum } = categorySlice.actions
export default categorySlice.reducer