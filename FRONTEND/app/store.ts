import categoryReducer from '@/Redux/categorySlice'
import questionNumReducer from '@/Redux/questionNumSlice'
import loadingReducer from '@/Redux/loadingSlice'
import quizAttemptReducer from '@/Redux/quizAttemptSlice'
import scoreReducer from '@/Redux/scoreSlice'
import authStateReducer from '@/Redux/authStateSlice'
import tokenReducer from '@/Redux/tokenSlice'
import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '@/Redux/userInfoSlice'

const store = configureStore({
    reducer: {
        categoryState: categoryReducer,
        questionNumState: questionNumReducer,
        loadingState: loadingReducer,
        quizAttemptState: quizAttemptReducer,
        scoreState: scoreReducer,
        authState: authStateReducer,
        tokenState: tokenReducer,
        userInfoState: userInfoReducer,
    }
})

export default store 
export type RootState = ReturnType<typeof store.getState>