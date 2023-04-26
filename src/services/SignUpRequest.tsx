import { useState } from "react"
import { userDataType } from "../types/UserInterface"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const SignUpRequest = () => {

    const [isSignUpLoading, setIsSignUpLoading] = useState<boolean>(false)
    const [requestSignUpError, setRequestSignUpError] = useState<string>('')

    const navigate = useNavigate();

    const sendSignUpFetch = async (userData: userDataType) => {
        setIsSignUpLoading(true)
        setRequestSignUpError('')

        localStorage.setItem("email", userData.email as string)

        await axios.post(`https://api.staging.aca.so/auth/sign-up`,
            {
                email: userData.email,
                first_name: userData.firstName,
                last_name: userData.lastName,
                password: userData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                setRequestSignUpError('')
                navigate("/confirmar-cadastro")
                setIsSignUpLoading(false)
            }).catch((error) => {
                if (error.response.status === 400) {
                    setRequestSignUpError('E-mail já cadastrado!')
                } else {
                    setRequestSignUpError('Erro no servidor')
                }
                setIsSignUpLoading(false)
            }).finally(() => {
                setIsSignUpLoading(false)
            })
    }

    return { sendSignUpFetch, requestSignUpError, isSignUpLoading }

}

export default SignUpRequest