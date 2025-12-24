import { StyleSheet, } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'
import { Provider, useSelector } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

const RootNavigator = () => {
    const authState = useSelector((state: any) => state.authState.authState)

    return (
        <Stack>
            {authState === true
                ? <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false
                    }}
                />
                : <Stack.Screen
                    name="(auth)"
                    options={{
                        headerShown: false
                    }}
                />

            }
        </Stack>
    )
}

const _layout = () => {

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <RootNavigator />
            </QueryClientProvider>
        </Provider>
    )
}

export default _layout