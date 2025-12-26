import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FullScreenLoader from '../components/FullScreenLoader'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { setAuthStateFalse } from '@/Redux/authStateSlice'

const RedirectingToLogin = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const t = setTimeout(() => {
            dispatch(setAuthStateFalse())
        }, 500);

        return clearTimeout(t)
    }, [])

    return (
        <FullScreenLoader visible={true} />
    )
}

export default RedirectingToLogin

const styles = StyleSheet.create({})