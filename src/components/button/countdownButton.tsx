import { useContext, useEffect, useRef, useState } from "react"
import Loading from "../loading/loading";
import style from './button.module.scss'
import { UserContext } from "../../contexts/UserContext";

const formatTime = (time: number) => {
    let minutes: number = Math.floor(time / 60)
    let seconds: number = Math.floor(time - minutes * 60)

    if (minutes <= 10) minutes = 0 + minutes;
    if (seconds <= 10) seconds = 0 + seconds;

    return minutes + ':' + seconds
}

const CountDownButton = ({ isLoading = false, ...props }) => {
    const [countdown, setCountdown] = useState<number>(120)
    const [endedCountdown, setEndedCountdown] = useState<boolean>(false)
    const timerId = useRef<number>()

    const { resendCodeFetch } = useContext(UserContext)

    const resendCode = () => {
        resendCodeFetch?.()
        setCountdown(120)
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
                    disabled={isLoading && true}
                    className={`${!isLoading ? style.generalButtonHover : style.generalDisabledButton} ${style.generalButton}`}
                    {...props}
                    onClick={resendCode}
                >
                    {isLoading ? <Loading /> : "Reenviar código"}
                </button>
            }
        </>
    )
}

export default CountDownButton