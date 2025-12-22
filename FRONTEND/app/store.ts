import categoryReducer from '@/Redux/categorySlice'
import questionNumReducer from '@/Redux/questionNumSlice'
import loadingReducer from '@/Redux/loadingSlice'
import quizAttemptReducer from '@/Redux/quizAttemptSlice'
import scoreReducer from '@/Redux/scoreSlice'
import authStateReducer from '@/Redux/authStateSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        categoryState: categoryReducer,
        questionNumState: questionNumReducer,
        loadingState: loadingReducer,
        quizAttemptState: quizAttemptReducer,
        scoreState: scoreReducer,
        authState: authStateReducer
    }
})

export default store 