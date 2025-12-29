import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '@/constants/colors'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import API_URL from '@/config/api'
import { useMutation } from '@tanstack/react-query'
import { usePostQuery } from '@/hooks/usePostQuery'

const SignUpPage = ({ changePage }: { changePage: (page: string) => void }) => {
    const [hidden, setHidden] = useState<boolean>(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    type SignupForm = {
        username: string,
        email: string,
        pass: string,
        confirmPassword: string
    }

    const inputFields = [
        {
            name: 'username' as const,
            placeholder: 'Enter full name',
            type: 'default' as const,
            text_type: 'name' as const,
        },
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
        },
        {
            name: 'confirmPassword' as const,
            placeholder: 'Confrim password',
            type: 'default' as const,
            text_type: 'password' as const,
        }
    ]

    const { control, handleSubmit } = useForm<SignupForm>({
        defaultValues: {
            username: '',
            email: '',
            pass: '',
            confirmPassword: ''
        }
    })

    const signupMutation = usePostQuery('auth/signup')

    const onSubmit = async (data: SignupForm) => {
        setLoading(true)
        try {
            // Pass validation
            if (!(data.pass === data.confirmPassword)) {
                setError('Password is incorrect')
                return
            } else { setError('') }
            // Fetching
            if (!signupMutation?.mutateAsync) return
            let res = await signupMutation.mutateAsync(data)
            let result = await res.json()
            console.log(result.message);
            // Error checking
            if (result.message.endsWith('exists')) {
                return setError('Email already exists')
            } else if (result.message === 'Invalid info') {
                return setError('Invalid info')
            }
            changePage('login')
        } catch (err) {
            console.log('Network Error: ', err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <View style={[styles.main]}>
                <View style={[styles.justify_items_center, { width: '100%', flexDirection: 'column', backgroundColor: '#0E1328', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 20 }]}>
                    <Text style={[styles.text_Kufam_Reg, { color: '#FFFF', fontSize: 36, fontWeight: 'bold' }]}>Sign up</Text>

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
                                            secureTextEntry={(f.name === "pass" || f.name === 'confirmPassword') ? hidden : false}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            placeholderTextColor={colors.textSecondary}
                                            style={styles.input}
                                        />
                                    )}
                                />
                                {(f.name === 'pass' || f.name === 'confirmPassword') &&
                                    <TouchableOpacity onPress={() => setHidden(prev => !prev)}>
                                        <Text style={{ color: 'white' }}>{hidden ? "Show" : "Hide"}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        ))}

                        {error && <View style={styles.errorWrapper}>
                            <Text style={styles.errorText}>
                                {error}
                            </Text>
                        </View>}


                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[styles.submitBtn]}>
                            <Text style={[styles.text_secondary, { fontSize: 20, fontWeight: 'semibold' }]}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[{ display: 'flex', flexDirection: 'row', marginTop: 20 }]}>
                        <Text style={[{ color: colors.textSecondary }]}>Already have an accont? </Text>
                        <Pressable onPress={() => changePage('login')}>
                            <Text style={[{ color: '#4F6BFF' }]}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )
}

export default SignUpPage


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