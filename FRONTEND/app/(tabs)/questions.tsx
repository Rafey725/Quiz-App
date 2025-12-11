import { ScrollView, Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { tabBarColor, textPrimary, textSecondary } from '@/constants/colors'
import QuizPage from '@/components/QuizPage'
import ResultPage from '@/components/ResultPage'


const QuestionPage = () => {
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


  return (
    <>
      {
        renderedPage === 'quiz-page'
          ? <QuizPage changePage={setRenderedPage} questions={questions} setQuestions={setQuestions} score={score} setScore={setScore} />
          : <ResultPage changePage={setRenderedPage} questions={questions} score={score} />
      }
    </>
  )
}

export default QuestionPage
