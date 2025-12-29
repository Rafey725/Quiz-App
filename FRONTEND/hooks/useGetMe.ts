import API_URL from "@/config/api";
import { setToken } from "@/Redux/tokenSlice";
import { setUserInfo } from "@/Redux/userInfoSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from "jwt-decode";

type UserGetMeParams = {
    endpoint: string,
    token: string | number,
}

export const useGetMe = ({
    endpoint,
    token,
}: UserGetMeParams) => {
    const dispatch = useDispatch()

    return useQuery({
        queryKey: ['userInfoData', token],
        queryFn: async () => {
            try {
                const res = await fetch(`${API_URL}/${endpoint}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await res.json()
                dispatch(setUserInfo(data))
                return data
            } catch (err) {
                console.log('Getting user info error: ', err);
                dispatch(setToken(null))
                dispatch(setUserInfo(null))
            }
        },
        enabled: true
    })
}