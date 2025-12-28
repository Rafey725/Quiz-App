import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import colors from '@/constants/colors'


let homeFocused = require("@/assets/icons/focused/home.png")
let homeUnfocused = require("@/assets/icons/unfocused/home.png")
let menuFocused = require("@/assets/icons/focused/menu.png")
let menuUnfocused = require("@/assets/icons/unfocused/menu.png")
let favFocused = require("@/assets/icons/focused/fav.png")
let favUnfocused = require("@/assets/icons/unfocused/fav.png")
let profileFocused = require("@/assets/icons/focused/profile.png")
let profileUnfocused = require("@/assets/icons/unfocused/profile.png")



const Logo = ({ source }: { source: ImageSourcePropType }) => {
    return (
        <Image source={source} style={{ width: 25, height: 25 }} />
    )
}

const _layout = () => {
    let focused = '0F469A'
    let unfocused = 343333

    const icons = {
        home: {
            focused: homeFocused,
            unfocused: homeUnfocused
        },
        menu: {
            focused: menuFocused,
            unfocused: menuUnfocused
        },
        fav: {
            focused: favFocused,
            unfocused: favUnfocused
        },
        profile: {
            focused: profileFocused,
            unfocused: profileUnfocused
        }
    }

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.tabBarColor
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Logo source={icons.home.focused} />
                        } else {
                            return <Logo source={icons.home.unfocused} />
                        }
                    }
                }}

            />
            <Tabs.Screen
                name='questions'
                options={{
                    headerShown: false,
                    title: 'Questions',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Logo source={icons.menu.focused} />
                        } else {
                            return <Logo source={icons.menu.unfocused} />
                        }
                    }
                }}
            />
            <Tabs.Screen
                name='fav'
                options={{
                    headerShown: false,
                    title: 'Favs',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Logo source={icons.fav.focused} />
                        } else {
                            return <Logo source={icons.fav.unfocused} />
                        }
                    }
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Logo source={icons.profile.focused} />
                        } else {
                            return <Logo source={icons.profile.unfocused} />
                        }
                    }
                }}
            />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})