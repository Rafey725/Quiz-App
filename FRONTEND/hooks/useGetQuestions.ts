import { useQuery } from "@tanstack/react-query"
import API_URL from "@/config/api"

type QuizQuestion = {
  id: string | number
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  difficulty: string
}

type UseGetQuestionsParams = {
  endpoint: string
  category?: string
  token?: string | number
  attemptId?: string | number
  setTotalQuestions?: (l: number) => void
}

export const useGetQuestions = ({
  endpoint,
  category,
  token,
  attemptId,
  setTotalQuestions
}: UseGetQuestionsParams) => {

  return useQuery<QuizQuestion[]>({
    queryKey: ["questions", category, attemptId],
    queryFn: async () => {
            try {
                const res = await fetch(`${API_URL}/${endpoint}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })

                if (!res.ok) throw new Error('Failed to load questions')
                const data = await res.json()
                setTotalQuestions?.(data.length)
                return data
            } catch (err) {
                console.log('Something is wrong: ', err);
                throw err
            }
        },
    enabled: !!category && !!token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60_000
  })
}
