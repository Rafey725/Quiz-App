import { ScrollView, Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { textPrimary, textSecondary } from '@/constants/colors'
import { Shadow } from 'react-native-shadow-2'
import { API_URL } from "@/config/api"
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { increamentQuestionNum, setQuestionNumZero } from '@/Redux/questionNumSlice'
import { increamentScore, resetScore } from '@/Redux/scoreSlice'
import FullScreenLoader from './FullScreenLoader'
import { turnOnLoading } from '@/Redux/loadingSlice'
import { useQuery } from '@tanstack/react-query'

const QuizPage = ({ changePage, setTotalQuestions }: { changePage: any, setTotalQuestions: any }) => {
    let router = useRouter()
    let dispatch = useDispatch()
    let category = useSelector((state: any) => state.categoryState.category)
    let questionNum = useSelector((state: any) => state.questionNumState.questionNum)
    let attemptId = useSelector((state: any) => state.quizAttemptState.attemptId)

    const [options, setOptions] = useState<string[]>([])
    const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>()
    const [selectedOptionText, setSelectedOptionText] = useState<string>('')

    // Shuffling the options
    function shuffleOptions(arr: any) {
        let ranNum1 = Math.floor(Math.random() * 4)
        let select1 = arr[ranNum1]
        arr[ranNum1] = arr[3]
        arr[3] = select1

        let ranNum2 = Math.floor(Math.random() * 3)
        let select2 = arr[ranNum2]
        arr[ranNum2] = arr[2]
        arr[2] = select2

        let ranNum3 = Math.floor(Math.random() * 2)
        let select3 = arr[ranNum3]
        arr[ranNum3] = arr[1]
        arr[1] = select3

        // console.log(arr)
        setOptions(arr)
    }

    // Fetching the questions
    // useEffect(() => {
    //     const loadQuestions = async () => {
    //         try {
    //             // dispatch(turnOnLoading())
    //             let res = await fetch(`${API_URL}/questions/${category}`)
    //             let data = await res.json()
    //             setQuestions(data)
    //             setTimeout(() => {
    //                 // dispatch(turnOffLoading())
    //             }, 200);
    //             console.log('Fetched successfully');
    //             // console.log(data)
    //         } catch (err) {
    //             console.log("Error fetching questions:", err);
    //         }
    //     }
    //     loadQuestions()
    // }, [category])


    // Tanstack Query Method
    const { data: questions = [], isPending, isFetching, error } = useQuery({
        queryKey: ['questions', category, attemptId],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/questions/${category}`)
            const data = await res.json()
            setTotalQuestions(data.length)
            return data
        },
        enabled: !!category,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 60_000,
    })

    // Setting options
    useEffect(() => {
        if (questions.length === 0) return
        let allOptions = [questions[questionNum].correct_answer, ...questions[questionNum].incorrect_answers]
        // console.log(allOptions)
        shuffleOptions(allOptions)
    }, [questionNum, questions])

    // Selecting the clicked option
    function selectClickedOption(optionIdx: number, optionText: string) {
        setSelectedOptionIdx(optionIdx)
        setSelectedOptionText(optionText)
    }
    // console.log(selectedOptionIdx)
    // console.log(selectedOptionText)

    const checkClickedOption = () => {
        if (selectedOptionText === questions[questionNum].correct_answer) {
            dispatch(increamentScore())
        }
    }
    // console.log('Score:', score);

    const finishQuiz = () => {
        setSelectedOptionIdx(null)
        checkClickedOption()
        changePage('result-page')
    }

    const quitQuiz = () => {
        router.push("/(tabs)")
        dispatch(setQuestionNumZero())
        dispatch(resetScore())
        dispatch(turnOnLoading())
    }

    return (
        <>
            <FullScreenLoader visible={isPending} />
            <ScrollView style={[styles.main,]}>
                {/* Header */}
                <View style={[styles.items_center, {}]}>
                    <Pressable onPress={() => {
                        router.push('/(tabs)')
                    }}>
                        <Image source={require('@/assets/arrow.png')} style={{ position: 'absolute', top: -13, width: 30, height: 30 }} />
                    </Pressable>
                    <View style={[styles.justify_items_center, { flex: 1, flexDirection: 'column', height: 58 }]}>
                        <Text style={[styles.text_Kufam_Reg, { color: textPrimary, fontSize: 18 }]}>{category.toLocaleUpperCase()}</Text>
                        <Text style={[styles.text_Kufam_Reg, { color: textSecondary, fontSize: 12 }]}>{questions.length} Questions</Text>
                    </View>
                </View>

                {/* Question container */}
                <View style={[styles.justify_center, { marginVertical: 30 }]}>
                    <Shadow
                        distance={18}
                        startColor="rgba(255, 255, 255, 0.10)"   // subtle white glow
                        endColor="rgba(255, 255, 255, 0)"       // smooth fade
                        offset={[0, 4]}
                        paintInside={false}
                    >
                        <View style={[{ width: 328, minHeight: 360, paddingHorizontal: 18, paddingTop: 18, paddingBottom: 21, borderRadius: 10 }]}>
                            <View style={[{ flex: 1, }]}>
                                {/* Question number */}
                                <View style={[styles.justify_between, {}]}>
                                    <Text style={[styles.text_Kufam_Reg, { color: '#828892ff' }]}>Question: {questionNum + 1}/{questions.length}</Text>
                                    <Pressable onPress={quitQuiz}>
                                        <Text style={[styles.text_Kufam_Reg, { color: '#A02525' }]}>Quit</Text>
                                    </Pressable>
                                </View>

                                {/* Question */}
                                <Text style={[styles.text_Kufam_Reg, { color: textPrimary, height: 'auto', marginVertical: 8 }]}>{questions[questionNum] ? questions[questionNum].question : null}</Text>

                                {/* Options */}
                                <View style={[{ rowGap: 15 }]}>
                                    {options.map((option, idx) => {
                                        return (
                                            <Pressable
                                                key={idx}
                                                onPress={() => selectClickedOption(idx, option)}
                                            >
                                                <Shadow
                                                    distance={5}
                                                    startColor="rgba(255, 255, 255, 0.10)"   // subtle white glow
                                                    endColor="rgba(255, 255, 255, 0)"       // smooth fade
                                                    offset={[0, 4]}
                                                    paintInside={false}
                                                    style={[{ backgroundColor: selectedOptionIdx === idx ? '#17233fff' : 'transparent', width: '100%', borderRadius: 5, height: 46, marginTop: 4 }]}
                                                >
                                                    <View style={[styles.items_center, { borderRadius: 5, paddingHorizontal: 15 }]}>
                                                        <Text style={[{ color: '#b2b8c4ff', marginTop: 12 }]}>{option}</Text>
                                                    </View>
                                                </Shadow>
                                            </Pressable>
                                        )
                                    })}
                                </View>

                            </View>
                        </View>
                    </Shadow>
                </View>

                {questionNum < questions.length - 1
                    // Next button
                    ? < View style={[styles.items_center, { justifyContent: 'flex-end', paddingHorizontal: 18 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (questionNum < questions.length - 1) {
                                    dispatch(increamentQuestionNum())
                                }
                                setSelectedOptionIdx(null)
                                checkClickedOption()
                            }}
                        >
                            <Shadow
                                distance={5}
                                startColor="rgba(255, 255, 255, 0.10)"   // subtle white glow
                                endColor="rgba(255, 255, 255, 0)"       // smooth fade
                                offset={[0, 4]}
                                paintInside={false}
                                style={[styles.justify_items_center, { backgroundColor: '#17233fff', width: 98, height: 46, borderRadius: 6, marginTop: 4 }]}
                            >
                                <Text style={[styles.text_Kufam_Reg, { color: '#b2b8c4ff', fontSize: 20, marginBottom: 7 }]}>Next</Text>
                            </Shadow>
                        </TouchableOpacity>
                    </View>

                    // Finish button
                    : <View style={[{ paddingHorizontal: 8 }]}>
                        <TouchableOpacity
                            onPress={finishQuiz}
                        >
                            <Shadow
                                distance={5}
                                startColor="rgba(255, 255, 255, 0.10)"   // subtle white glow
                                endColor="rgba(255, 255, 255, 0)"       // smooth fade
                                offset={[0, 4]}
                                paintInside={false}
                                style={[styles.justify_items_center, { backgroundColor: '#17233fff', width: '100%', height: 46, borderRadius: 6, marginTop: 4 }]}
                            >
                                <Text style={[styles.text_Kufam_Reg, { color: '#b2b8c4ff', fontSize: 20, marginBottom: 7 }]}>Finish</Text>
                            </Shadow>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView >
        </>
    )
}

export default QuizPage


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
    text_primary: { color: textPrimary },
    text_secondary: { color: textSecondary },
    text_Kufam_Reg: { height: 28, fontFamily: 'Kufam_400Regular' }
})