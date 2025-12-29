import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '@/constants/colors'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'

const ResultPage = ({ changePage, totalQuestions, score }: any) => {
    const router = useRouter()
    const userInfo = useSelector((state: any) => state.userInfoState.userInfo)

    return (
        <View style={[styles.main,]}>
            <View style={[styles.justify_items_center, { flexDirection: 'column', rowGap: 10, flex: 1 }]}>
                <View style={[styles.justify_items_center, { flexDirection: 'column', backgroundColor: '#17233fff', width: 178, height: 178, borderRadius: 100, borderWidth: 10, borderColor: 'rgba(56, 81, 139, 0.37)' }]}>
                    <Text style={[styles.text_Kufam_Reg, { color: colors.textPrimary, fontSize: 22, height: 29 }]}>Your Score</Text>
                    <Text style={[styles.text_Kufam_Reg, { color: colors.textPrimary, fontSize: 32, height: 40 }]}>{score}/{totalQuestions}</Text>
                </View>

                <View style={[styles.justify_items_center, { flexDirection: 'column', }]}>
                    <Text style={[styles.text_Kufam_Reg, { color: '#1c4581ff', fontSize: 24, height: 35 }]}>Congratulation</Text>
                    <Text style={[styles.text_Kufam_Reg, { color: '#1c4581ff', fontSize: 18, height: 29 }]}>Great job, {userInfo ? userInfo.username : 'Aamir'}! You Did It</Text>
                </View>
            </View>

            <View style={[{ minHeight: 100, rowGap: 15, paddingVertical: 30 }]}>
                {/* Share button */}
                <View style={[{ paddingHorizontal: 8 }]}>
                    <TouchableOpacity>
                        <View
                            style={[styles.justify_items_center, { backgroundColor: '#17233fff', width: '100%', height: 54, borderRadius: 6, marginTop: 4 }]}
                        >
                            <Text style={[styles.text_Kufam_Reg, { color: colors.textPrimary, fontSize: 20, marginBottom: 7 }]}>Share</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Back to home button */}
                <View style={[{ paddingHorizontal: 8 }]}>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/(tabs)')
                            changePage('quiz-page')
                        }}
                    >
                        <View
                            style={[styles.justify_items_center, { backgroundColor: '#17233fff', width: '100%', height: 54, borderRadius: 6, marginTop: 4 }]}
                        >
                            <Text style={[styles.text_Kufam_Reg, { color: colors.textPrimary, fontSize: 20, marginBottom: 7 }]}>Back to Home</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default ResultPage


const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        paddingTop: 30,
        backgroundColor: '#050816',
    },
    flex: { display: 'flex' },
    justify_center: { display: 'flex', flexDirection: 'row', justifyContent: 'center' },
    justify_between: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    items_center: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
    justify_items_center: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    text_primary: { color: colors.textPrimary },
    text_secondary: { color: colors.textSecondary },
    text_Kufam_Reg: { height: 28, fontFamily: 'Kufam_400Regular' }
})