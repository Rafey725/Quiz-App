import { ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { tabBarColor, textPrimary, textSecondary } from '@/constants/colors'
import { Shadow } from 'react-native-shadow-2'
import { API_URL } from "@/config/api"

const QuestionPage = () => {
  let options = [
    {
      id: 1,
      option: 'The World Wide Web Consortium',
      correct: true
    },
    {
      id: 2,
      option: 'Microsoft',
      correct: false
    },
    {
      id: 3,
      option: 'Mozilla',
      correct: false
    },
    {
      id: 4,
      option: 'Google',
      correct: false
    },
  ]

  type QuestionsType = {
    _id: string
    category: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }

  const [questions, setQuestions] = useState<QuestionsType[]>([])

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        let res = await fetch(`${API_URL}/questions`)
        let data = await res.json()
        setQuestions(data)
      } catch (err) {
        console.log("Error fetching questions:", err);
      }
    }

    loadQuestions()
  }, [])


  return (
    <>
      <ScrollView style={[styles.main,]}>
        {/* Header */}
        <View style={[styles.items_center, {}]}>
          <Image source={require('@/assets/arrow.png')} style={{ position: 'absolute', width: 30, height: 30 }} />
          <View style={[styles.justify_items_center, { flex: 1, flexDirection: 'column', height: 58 }]}>
            <Text style={[styles.text_Kufam_Reg, { color: textPrimary, fontSize: 18 }]}>HTML</Text>
            <Text style={[styles.text_Kufam_Reg, { color: textSecondary, fontSize: 12 }]}>30 Questions</Text>
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
            <View style={[{ width: 328, height: 350, backgroundColor: '', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 11, borderRadius: 10 }]}>
              <View style={[{ flex: 1, }]}>
                {/* Question number */}
                <View style={[styles.justify_between, {}]}>
                  <Text style={[styles.text_Kufam_Reg, { color: '#828892ff' }]}>Question: 3/30</Text>
                  <Text style={[styles.text_Kufam_Reg, { color: '#A02525' }]}>Quit</Text>
                </View>

                {/* Question */}
                <Text style={[styles.text_Kufam_Reg, { color: textPrimary, height: 'auto', marginVertical: 8 }]}>Who is making the Web standards?</Text>

                {/* Options */}
                <View style={[{ rowGap: 15 }]}>
                  {options.map((option) => {
                    return (
                      <Shadow
                        key={option.id}
                        distance={5}
                        startColor="rgba(255, 255, 255, 0.10)"   // subtle white glow
                        endColor="rgba(255, 255, 255, 0)"       // smooth fade
                        offset={[0, 4]}
                        paintInside={false}
                        style={[{ backgroundColor: option.correct ? tabBarColor : '', width: '100%', height: 46, marginTop: 4 }]}
                      >
                        <View style={[styles.items_center, { borderRadius: 5, paddingHorizontal: 15 }]}>
                          <Text style={[{ color: '#b2b8c4ff', marginTop: 12 }]}>{option.option}</Text>
                        </View>
                      </Shadow>
                    )
                  })}
                </View>
              </View>
            </View>
          </Shadow>
        </View>

        {/* Trying the api */}
        <View style={[styles.justify_center, { marginBottom: 70 }]}>
          <Shadow
            distance={18}
            startColor="rgba(255, 255, 255, 0.10)"   // subtle white glow
            endColor="rgba(255, 255, 255, 0)"       // smooth fade
            offset={[0, 4]}
            paintInside={false}
          >
            <View style={[{ width: 328, height: 350, backgroundColor: '', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 11, borderRadius: 10 }]}>
              {questions.map((q, idx) => {
                return (
                  <Text key={q._id} style={[{ color: "white" }]}>{q.question}</Text>
                )
              })}
            </View>
          </Shadow>
        </View>
      </ScrollView>
    </>
  )
}

export default QuestionPage

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