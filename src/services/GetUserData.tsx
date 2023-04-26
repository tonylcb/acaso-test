import { useContext, useState } from "react"
import axios from 'axios'
import { UserContext } from "../contexts/UserContext"

const GetUserData = () => {
    const { setUserFirstName, setUserLastName, setIsLoginLoading } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>('')

    const baseURL = 'https://api.staging.aca.so'

    // useEffect(() => {
    //     if (loadOnStart) sendRequest();
    // }, [])

    const request = () => {
        sendRequest();
    }

    const sendRequest = () => {
        setIsLoading(true)
        setIsLoginLoading?.(true)

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
            setUserFirstName?.(response.data.first_name)
            setUserLastName?.(response.data.last_name)
            if (!isUserLoggedToken) {
                localStorage.setItem("last_access_at", response.data.last_access_at)
                localStorage.setItem("is_user_logged", "true")
            }
            setIsLoading(false)
            setIsLoginLoading?.(false)

        }).catch((error) => {
            if (error.response.status === 404) {
                sendCreateUserFetch(storedIdToken)
                setIsLoginLoading?.(false)
            } else if (error.response.status === 403) {
                refreshTokenRequest()
            } else {
                setErrorMsg("Erro ao acessar os dados do usuário")
                setIsLoading(false)
                setIsLoginLoading?.(false)
            }
        }).finally(() => [
            setIsLoginLoading?.(false)
        ])
    }

    const sendCreateUserFetch = async (storedIdToken: string | null) => {
        setIsLoading(true)
        await axios.post('https://api.staging.aca.so/user/',
            {

            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedIdToken}`
                }
            }).then(() => {
                request()
            }).catch((error) => {
                if (error.response.status !== 500) {
                    setErrorMsg("Erro ao criar um usuário, faça login novamente!")
                }
                setIsLoading(false)
            }).finally(() => {
                setIsLoading(false)
            })
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
            localStorage.setItem('id_token', response.data.id_token)
            localStorage.setItem('access_token', response.data.access_token)
            sendRequest()
        }).catch(() => {
            setErrorMsg("Erro ao acessar os dados do usuário")
            setIsLoading(false)
        })
    }

    return { request, isLoading, errorMsg }
}

export default GetUserData