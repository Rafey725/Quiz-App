import categoryReducer from '@/Redux/categorySlice/categorySlice.ts'
import questionNumReducer from '@/Redux/questionNumSlice/questionNumSlice'
import loadingReducer from '@/Redux/loadingSlice/loadingSlice'
import quizAttemptReducer from '@/Redux/quizAttemptSlice/quizAttemptSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        categoryState: categoryReducer,
        questionNumState: questionNumReducer,
        loadingState: loadingReducer,
        quizAttemptState: quizAttemptReducer
    }
})

export default store 