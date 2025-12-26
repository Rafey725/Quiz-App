import { textPrimary, textSecondary } from "@/constants/colors"
import React, { useState } from "react"
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native"

type LoginFormPreviewProps = {
    onOpenLogin: () => void
    onOpenSignup?: () => void
    // optional preview-only error text
    errorText?: string
}

export const LoginFormPreview = () => {
    const [hidden, setHidden] = useState(true)

    const onOpenLogin = () => {

    }

    return (
        <View
            style={[
                styles.justify_items_center,
                {
                    width: "100%",
                    flexDirection: "column",
                    backgroundColor: "#0E1328",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                },
            ]}
        >
            <Text style={[styles.text_Kufam_Reg, { color: "#FFF", fontSize: 36, fontWeight: "bold" }]}>
                Login
            </Text>

            <View style={{ width: "100%", marginTop: 20 }}>
                {/* Email (preview only) */}
                <View style={styles.inputWrap}>
                    <TextInput
                        editable={false}
                        pointerEvents="none"
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor={textSecondary}
                        style={styles.input}
                    />
                </View>

                {/* Password (preview only) */}
                <View style={styles.inputWrap}>
                    <TextInput
                        editable={false}
                        pointerEvents="none"
                        placeholder="Password"
                        secureTextEntry={hidden}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor={textSecondary}
                        style={styles.input}
                    />

                    <Pressable onPress={() => setHidden((p) => !p)} hitSlop={10}>
                        <Text style={{ color: "white" }}>{hidden ? "Show" : "Hide"}</Text>
                    </Pressable>
                </View>

                {/* Optional: show a demo error style */}
                {/* {errorText ? (
                    <View style={styles.errorWrapper}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                ) : null} */}

                {/* This is the only real action: open real login page */}
                <Pressable onPress={onOpenLogin} style={styles.submitBtn}>
                    <Text style={[styles.text_secondary, { fontSize: 20, fontWeight: "600" }]}>
                        Login
                    </Text>
                </Pressable>
            </View>

            <View style={[{ display: "flex", flexDirection: "row", marginTop: 20 }]}>
                <Text style={[{ color: textSecondary }]}>Not have an accont? </Text>

                {/* <Pressable
                    onPress={onOpenSignup ?? onOpenLogin}
                    hitSlop={10}
                >
                    <Text style={[{ color: "#4F6BFF" }]}>Create new account</Text>
                </Pressable> */}
            </View>
        </View>
    )
}

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