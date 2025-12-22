import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { tabBarColor, textPrimary, textSecondary } from '@/constants/colors'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

const LoginPage = ({ changePage }: { changePage: (page: string) => void }) => {
    const [hidden, setHidden] = useState<boolean>(true)

    type LoginForm = {
        email: string,
        password: string
    }

    const inputFields = [
        {
            name: 'email' as const,
            placeholder: 'Enter email address',
            type: 'email-address' as const,
            text_type: 'emailAddress' as const,
        },
        {
            name: 'password' as const,
            placeholder: 'Enter password',
            type: 'default' as const,
            text_type: 'password' as const,
        }
    ]

    const { control, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (data: LoginForm) => {
        console.log(data.email);
        console.log(data.password);
    }

    return (
        <View style={[styles.main,]}>
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
                                        secureTextEntry={f.name === "password" ? hidden : false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholderTextColor={textSecondary}
                                        style={styles.input}
                                    />
                                )}
                            />
                            {f.name === 'password' &&
                                <Pressable onPress={() => setHidden(prev => !prev)}>
                                    <Text style={{ color: 'white' }}>{hidden ? "Show" : "Hide"}</Text>
                                </Pressable>
                            }
                        </View>
                    ))}

                    <Pressable onPress={handleSubmit(onSubmit)} style={[styles.submitBtn]}>
                        <Text style={[styles.text_secondary, { fontSize: 20, fontWeight: 'semibold' }]}>
                            Login
                        </Text>
                    </Pressable>
                </View>

                <View style={[{ display: 'flex', flexDirection: 'row', marginTop: 20 }]}>
                    <Text style={[{ color: textSecondary }]}>Not have an accont? </Text>
                    <Pressable onPress={() => changePage('signup')}>
                        <Text style={[{ color: '#4F6BFF' }]}>Create new account</Text>
                    </Pressable>
                </View>
            </View>
        </View >
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
    text_primary: { color: textPrimary },
    text_secondary: { color: textSecondary },
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
        color: textPrimary,
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
    }
})