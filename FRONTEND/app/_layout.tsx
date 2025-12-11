import { StyleSheet, } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'

const _layout = () => {
    return (
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
    )
}

export default _layout

const styles = StyleSheet.create({})