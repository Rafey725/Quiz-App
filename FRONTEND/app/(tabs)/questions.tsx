import { ScrollView, Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { tabBarColor, textPrimary, textSecondary } from '@/constants/colors'
import QuizPage from '@/components/QuizPage'
import ResultPage from '@/components/ResultPage'


const Questions = () => {
  type QuestionsType = {
    _id: string
    category: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }

  const [renderedPage, setRenderedPage] = useState<string>('quiz-page')
  const [questions, setQuestions] = useState<QuestionsType[]>([])
  const [score, setScore] = useState<number>(0)
  const [totalQuestions, setTotalQuestions] = useState<number>(0)


  return (
    <>
      {
        renderedPage === 'quiz-page'
          ? <QuizPage changePage={setRenderedPage} setTotalQuestions={setTotalQuestions} score={score} setScore={setScore} />
          : <ResultPage changePage={setRenderedPage} totalQuestions={totalQuestions} score={score} />
      }
    </>
  )
}

export default Questions
