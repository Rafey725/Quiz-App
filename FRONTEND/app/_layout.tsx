import { View, } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'
import { Provider, useSelector } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FullScreenLoader from '@/components/FullScreenLoader';


const queryClient = new QueryClient()

const RootNavigator = () => {
    const authState = useSelector((state: any) => state.authState.authState)
    const loading = useSelector<boolean>((state: any) => state.loadingState.loading) as boolean

    return (
        <View style={{ flex: 1, backgroundColor:'#050816' }}>
            <FullScreenLoader visible={loading} />
            <Stack screenOptions={{ headerShown: false, animation:'none',presentation:'transparentModal' }}>
                {authState === true
                    ? <Stack.Screen
                        name="(tabs)"
                        options={{
                        }}
                    />
                    : <Stack.Screen
                        name="(auth)"
                        options={{
                        }}
                    />

                }
            </Stack>
        </View>
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