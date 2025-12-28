import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '@/constants/colors'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import API_URL from '@/config/api'
import * as SecureStore from 'expo-secure-store'
import { setAuthStateTrue } from '@/Redux/authStateSlice'
import { useDispatch } from 'react-redux'
import FullScreenLoader from './FullScreenLoader'
import { turnOffLoading } from '@/Redux/loadingSlice'
import { usePostQuery } from '@/hooks/usePostQuery'

const LoginPage = ({ changePage }: { changePage: (page: string) => void }) => {
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState<boolean>(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    type LoginForm = {
        email: string,
        pass: string
    }

    const inputFields = [
        {
            name: 'email' as const,
            placeholder: 'Enter email address',
            type: 'email-address' as const,
            text_type: 'emailAddress' as const,
        },
        {
            name: 'pass' as const,
            placeholder: 'Enter password',
            type: 'default' as const,
            text_type: 'password' as const,
        }
    ]

    useEffect(() => {
        setTimeout(() => {
            dispatch(turnOffLoading())
        }, 500);
    }, [])

    const { control, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            pass: ''
        }
    })

    const loginMutation = usePostQuery('auth/login')

    const onSubmit = async (data: LoginForm) => {
        setLoading(true)
        try {
            setError('')
            if (!loginMutation?.mutateAsync) return
            const res = await loginMutation.mutateAsync(data)
            let result = await res.json()
            if (!res.ok) {
                return setError(result.message)
            }
            console.log(result.message);
            await SecureStore.setItemAsync('token', result.token)
            const saved = await SecureStore.getItemAsync('token')
            console.log('SAVED TOKEN: ', saved);
            dispatch(setAuthStateTrue())
        } catch (err) {
            console.log("Network error: ", err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <FullScreenLoader visible={loading} />
            <View style={[styles.main]}>
                <View style={[styles.justify_items_center, { width: '100%', flexDirection: 'column', backgroundColor: '#0E1328', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 20 }]}>
                    <Text style={[styles.text_Kufam_Reg, { color: '#FFFF', fontSize: 36, fontWeight: 'bold' }]}>Login</Text>

                    <View style={{ width: '100%', marginTop: 20 }}>
                        {inputFields.map((f) => (
                            <View key={f.name} style={styles.inputWrap}>
                                <Controller
                                    control={control}
                                    name={f.name}
                                    render={({ field }) => (
                                        <TextInput
                                            value={field.value}
                                            onChangeText={field.onChange}
                                            placeholder={f.placeholder}
                                            keyboardType={f.type}
                                            textContentType={f.text_type}
                                            secureTextEntry={f.name === "pass" ? hidden : false}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            placeholderTextColor={colors.textSecondary}
                                            style={styles.input}
                                        />
                                    )}
                                />
                                {f.name === 'pass' &&
                                    <Pressable onPress={() => setHidden(prev => !prev)}>
                                        <Text style={{ color: 'white' }}>{hidden ? "Show" : "Hide"}</Text>
                                    </Pressable>
                                }
                            </View>
                        ))}

                        {error && <View style={styles.errorWrapper}>
                            <Text style={styles.errorText}>
                                {error}
                            </Text>
                        </View>}

                        <Pressable onPress={handleSubmit(onSubmit)} style={[styles.submitBtn]}>
                            <Text style={[styles.text_secondary, { fontSize: 20, fontWeight: 'semibold' }]}>
                                Login
                            </Text>
                        </Pressable>
                    </View>

                    <View style={[{ display: 'flex', flexDirection: 'row', marginTop: 20 }]}>
                        <Text style={[{ color: colors.textSecondary }]}>Not have an accont? </Text>
                        <Pressable onPress={() => changePage('signup')}>
                            <Text style={[{ color: '#4F6BFF' }]}>Create new account</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )
}

export default LoginPage


const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        paddingTop: 80,
        backgroundColor: '#050816',
        display: 'flex',
        alignItems: 'center',
    },
    flex: { display: 'flex' },
    justify_center: { display: 'flex', flexDirection: 'row', justifyContent: 'center' },
    justify_between: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    items_center: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
    justify_items_center: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    text_primary: { color: colors.textPrimary },
    text_secondary: { color: colors.textSecondary },
    text_Kufam_Reg: {
        height: 50, fontFamily: 'Kufam_400Regular'
    },
    inputWrap: {
        marginTop: 20,
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: '#1F2A44',
        borderRadius: 5,
        paddingHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center", // important
    },
    input: {
        color: colors.textPrimary,
        fontSize: 18,
        height: "100%",
        flex: 1,
        paddingVertical: 0,
    },
    submitBtn: {
        marginTop: 30,
        width: '70%',
        marginHorizontal: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 5,
        backgroundColor: '#4F6BFF'
    },
    errorWrapper: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#3b0d0d', // deep muted red
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#7a1c1c',
        marginTop: 8,
    },
    errorText: {
        color: '#ffe3e3ff',
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
    }
})