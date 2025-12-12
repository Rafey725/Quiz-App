import { StyleSheet, } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

const _layout = () => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="questionpage"
                        options={{
                            title: 'Questions',
                            headerShown: false
                        }}
                    />
                </Stack>
            </QueryClientProvider>
        </Provider>
    )
}

export default _layout

const styles = StyleSheet.create({})