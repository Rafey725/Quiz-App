import { useMutation } from "@tanstack/react-query"
import API_URL from "@/config/api"

type LoginForm = {
  email: string
  pass: string
}

type SignupForm = {
  username: string
  email: string
  pass: string
  confirmPassword: string
}

type MutationBody = LoginForm | SignupForm

export const usePostQuery = (endpoint: string) => {
  return useMutation({
    mutationFn: async (body: MutationBody) => {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        throw new Error("Request failed")
      }

      return res
    }
  })
}
