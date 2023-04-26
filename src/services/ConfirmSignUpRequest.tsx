import { useState } from "react"
import { userDataType } from "../types/UserInterface"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const ConfirmSignUpRequest = () => {

    const [isConfirmSignUpLoading, setIsConfirmSignUpLoading] = useState<boolean>(false)
    const [successConfirmSignUpRequest, setConfirmSignUpRequest] = useState<boolean>(false)
    const [requestConfirmSignUpError, setRequestConfirmSignUpError] = useState<string>('')

    const navigate = useNavigate();

    const sendSignUpFConfirmetch = async (userData: userDataType) => {
        setIsConfirmSignUpLoading(true)
        setRequestConfirmSignUpError('')
        setConfirmSignUpRequest(false)
        const userEmail = localStorage.getItem("email")
        setIsConfirmSignUpLoading(true)

        await axios.post(`https://api.staging.aca.so/auth/confirm-sign-up`,
            {
                email: userEmail,
                confirmation_code: userData.code
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                setConfirmSignUpRequest(true)
                setRequestConfirmSignUpError('')
                localStorage.removeItem("email")
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }).catch((error) => {
                if (error.response.status === 400) {
                    setRequestConfirmSignUpError('Código incorreto')
                } else {
                    setRequestConfirmSignUpError('Erro no servidor')
                }
                setIsConfirmSignUpLoading(false)
                setConfirmSignUpRequest(false)
            }).finally(() => {
                setIsConfirmSignUpLoading(false)
            })
    }

    return { sendSignUpFConfirmetch, successConfirmSignUpRequest, requestConfirmSignUpError, isConfirmSignUpLoading }

}

export default ConfirmSignUpRequest