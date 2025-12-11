import categoryReducer from '@/Redux/categorySlice/categorySlice.ts'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        categoryState: categoryReducer
    }
})

console.log(categoryReducer);
