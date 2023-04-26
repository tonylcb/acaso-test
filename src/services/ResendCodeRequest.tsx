import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const ResendCodeRequest = () => {

    const [isResendCodeLoading, setIsResendCodeLoading] = useState<boolean>(false)
    const [successResendCodeRequest, setSuccessResendCodeRequest] = useState<boolean>(false)
    const [requestResendCodeError, setRequestResendCodeError] = useState<string>('')

    const navigate = useNavigate();

    const sendResendCodeFetch = async () => {
        setRequestResendCodeError('')
        setIsResendCodeLoading(true)
        setSuccessResendCodeRequest(false)

        const userEmail = localStorage.getItem("email")
        await axios.post(`https://api.staging.aca.so/auth/resend-confirmation-code`,
            {
                email: userEmail
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setSuccessResendCodeRequest(true)
                setTimeout(() => {
                    setSuccessResendCodeRequest(false)
                }, 4000)

                console.log('response resendCodeFetch :>> ', response);
                setRequestResendCodeError('')
                navigate('/confirmar-cadastro')
            }).catch((error) => {
                console.log('error :>> ', error);
                if (error.response.data.message === "Limit exceeded. Try again later") {
                    setRequestResendCodeError('Limite excedido, tente mais tarde')
                } else {
                    setRequestResendCodeError('Erro no servidor')
                }
                setIsResendCodeLoading(false)
                setSuccessResendCodeRequest(false)
            }).finally(() => {
                setIsResendCodeLoading(false)
            })
    }
    return { sendResendCodeFetch, requestResendCodeError, isResendCodeLoading, successResendCodeRequest }

}

export default ResendCodeRequest