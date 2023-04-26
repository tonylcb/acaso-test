import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { UserContext } from "../contexts/UserContext"

interface userDataTypes {
    first_name?: string;
    last_name?: string;
    last_access_at?: string;
}

const GetUserData = (loadOnStart = false) => {

    const { createUserFetch, setIsCreateUserLoading, setUserFirstName, setUserLastName } = useContext(UserContext)


    const [userData, setUserData] = useState<userDataTypes>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>('')


    const baseURL = 'https://api.staging.aca.so'

    useEffect(() => {
        if (loadOnStart) sendRequest();
        else setIsLoading(false)
    }, [])

    const request = () => {
        sendRequest();
    }

    const sendRequest = () => {
        setIsLoading(true)
        setIsCreateUserLoading?.(true)

        const storedUserId = localStorage.getItem("user_id")
        const storedIdToken = localStorage.getItem("id_token")
        const isUserLoggedToken = localStorage.getItem("is_user_logged")

        axios.get(`${baseURL}/user/${storedUserId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedIdToken}`
                }
            }
        ).then((response) => {
            console.log('response GetUserData :>> ', response);
            setIsLoading(false)
            setIsCreateUserLoading?.(false)

            setUserFirstName?.(response.data.first_name)
            setUserLastName?.(response.data.last_name)
            if (!isUserLoggedToken) {
                localStorage.setItem("last_access_at", response.data.last_access_at)
                localStorage.setItem("is_user_logged", "true")


                setUserData(response.data)
            } else {
                setUserData(response.data)
            }
        }).catch((error) => {
            console.log('error getUserData :>> ', error);
            if (error.response.status === 404) {
                createUserFetch?.(storedIdToken)
            } else if (error.response.status === 403) {
                refreshTokenRequest()
            } else {
                setErrorMsg("Erro ao acessar os dados do usuário")
                setIsLoading(false)
                setIsCreateUserLoading?.(false)
            }
        }).finally(() => [
            setIsLoading(false)
        ])
    }

    const refreshTokenRequest = () => {
        setIsLoading(true)

        const storedIdToken = localStorage.getItem("id_token")
        const storedRefreshToken = localStorage.getItem("refresh_token")

        axios.post(`${baseURL}/auth/refresh-token`,
            {
                refresh_token: storedRefreshToken
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedIdToken}`
                }
            }
        ).then((response) => {
            console.log('response refreshTokenRequest :>> ', response);
            setIsLoading(false)

            localStorage.setItem('id_token', response.data.id_token)
            localStorage.setItem('access_token', response.data.access_token)
            sendRequest()
        }).catch((error) => {
            console.log('error refreshTokenRequest :>> ', error);
            setErrorMsg("Erro ao acessar os dados do usuário")
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return { userData, request, isLoading, errorMsg }
}

export default GetUserData