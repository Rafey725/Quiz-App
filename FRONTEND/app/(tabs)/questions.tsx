import React, { useEffect, useState } from 'react'
import QuizPage from '@/components/QuizPage'
import ResultPage from '@/components/ResultPage'
import { useDispatch, useSelector } from 'react-redux'


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
  const score = useSelector((state: any) => state.scoreState.score)
  const [totalQuestions, setTotalQuestions] = useState<number>(0)

  return (
    <>
      {
        renderedPage === 'quiz-page'
          ? <QuizPage changePage={setRenderedPage} setTotalQuestions={setTotalQuestions} />
          : <ResultPage changePage={setRenderedPage} totalQuestions={totalQuestions} score={score} />
      }
    </>
  )
}

export default Questions
