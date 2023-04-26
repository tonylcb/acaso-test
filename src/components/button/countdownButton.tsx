import { useEffect, useRef, useState } from "react"
import Loading from "../loading/loading";
import style from './button.module.scss'
import generalStyle from '../../styles/user-not-logged.module.scss'
import ResendCodeRequest from "../../services/ResendCodeRequest";

const formatTime = (time: number) => {
    let minutes: number = Math.floor(time / 60)
    let seconds: number = Math.floor(time - minutes * 60)

    if (minutes <= 10) minutes = 0 + minutes;
    if (seconds <= 10) seconds = 0 + seconds;

    return minutes + ':' + seconds
}

const CountDownButton = () => {
    const [countdown, setCountdown] = useState<number>(5)
    const [endedCountdown, setEndedCountdown] = useState<boolean>(false)
    const timerId = useRef<number>()

    const { sendResendCodeFetch, requestResendCodeError, isResendCodeLoading, successResendCodeRequest } = ResendCodeRequest()


    const resendCode = () => {
        sendResendCodeFetch()
        setCountdown(5)
        setEndedCountdown(false)
    }

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [countdown])

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current)
            setEndedCountdown(true)
        }
    }, [countdown])

    return (
        <>
            {!endedCountdown ?
                <button disabled className={`${style.generalButton}`} >Aguarde {formatTime(countdown)} para reenviar</button>
                :
                <button
                    disabled={isResendCodeLoading && true}
                    className={`${!isResendCodeLoading ? style.generalButtonHover : style.generalDisabledButton} ${style.generalButton}`}
                    onClick={resendCode}
                >
                    {isResendCodeLoading ? <Loading /> : "Reenviar código"}
                </button>
            }
            {
                successResendCodeRequest &&
                <p className={generalStyle.requestResendSuccessTxt}>Código reenviado!</p>
            }
            {
                !successResendCodeRequest && requestResendCodeError !== '' &&
                <p className={generalStyle.requestErrorTxt}>{requestResendCodeError}</p>
            }
        </>
    )
}

export default CountDownButton