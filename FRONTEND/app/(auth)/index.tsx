'use client'

import React, { useState } from 'react'
import LoginPage from '@/components/LoginPage'
import SignUpPage from '@/components/SignUpPage'

const Index = () => {
    const [pageToBeShown, setPageToBeShown] = useState('login')

    return (
        <>
            {
                pageToBeShown === 'login'
                    ? <LoginPage changePage={setPageToBeShown} />
                    : <SignUpPage changePage={setPageToBeShown} />
            }
        </>
    )
}

export default Index
