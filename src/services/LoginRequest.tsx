import { useContext, useState } from "react"
import { userDataType } from "../types/UserInterface"
import { UserContext } from "../contexts/UserContext"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const LoginRequest = () => {

    const [requestError, setLoginRequestError] = useState<string>('')
    const { setIsLoginLoading } = useContext(UserContext)

    const navigate = useNavigate();

    const sendLoginFetch = async (userData: userDataType) => {
        setLoginRequestError('')
        setIsLoginLoading?.(true)

        await axios.post('https://api.staging.aca.so/auth/login',
            {
                email: userData.email,
                password: userData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log('response loginFetch :>> ', response);

                setLoginRequestError('')
                localStorage.setItem("user_id", response.data.user.id)
                localStorage.setItem("access_token", response.data.token.access_token)
                localStorage.setItem("id_token", response.data.token.id_token)
                localStorage.setItem("refresh_token", response.data.token.refresh_token)

                // setUserFirstName(response.data.user.first_name)
                // setUserLastName(response.data.user.last_name)

                navigate("/minha-conta")
                setIsLoginLoading?.(false)
                setLoginRequestError('')

            }).catch((error) => {
                console.log('error :>> ', error);
                if (error.response.data.message === "Incorrect username or password") {
                    setLoginRequestError('E-mail ou senha incorreto')
                } else if (error.response.data.message === "Email not registered") {
                    setLoginRequestError('E-mail não registrado')
                } else {
                    setLoginRequestError('Erro no servidor')
                }
                setIsLoginLoading?.(false)


            }).finally(() => {
                setIsLoginLoading?.(false)
            })
    }

    return { sendLoginFetch, requestError }

}

export default LoginRequest