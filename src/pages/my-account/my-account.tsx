
import Button from '../../components/button/button'
import style from './my-account.module.scss'
import { ReactComponent as ImageBackground } from "../../assets/image-background.svg"
import { ReactComponent as StatusProfile } from "../../assets/status-profile.svg"
import ProfileImageUrl from "../../assets/profile-image.png"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import * as dayjs from 'dayjs'

function MyAccountPage() {
    const [activeTime, setActiveTime] = useState<string>('Bem vindo(a) =)')
    const date = new Date()
    const { userLogout } = useContext(UserContext)

    const handleLogout = () => {
        userLogout?.()
    }

    const navigate = useNavigate()

    const { getUserData, userFirstName, userLastName, userLastAccess } = useContext(UserContext)

    useEffect(() => {
        const userLogged = localStorage.getItem("is_user_logged")
        if (userLogged === null) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        getUserData?.()

        if (userLastAccess !== '') {
            const currentHour = date.getUTCHours()
            const userLastAccessHour = dayjs(userLastAccess).hour()
            const currentMinute = date.getUTCMinutes()
            const userLastAccessMinute = dayjs(userLastAccess).minute()

            if (currentHour === userLastAccessHour) {
                if (currentMinute - userLastAccessMinute === 1) {
                    setActiveTime(`Ativo há pelo menos ${currentMinute - userLastAccessMinute} minuto`)
                } else {
                    setActiveTime(`Ativo há pelo menos ${currentMinute - userLastAccessMinute} minutos`)
                }
            } else {
                if (userLastAccessMinute > currentMinute) {
                    setActiveTime(`Ativo há pelo menos ${currentHour - userLastAccessHour} horas e ${(60 - currentMinute) + userLastAccessMinute} minutos`)
                } else if (userLastAccessMinute === currentMinute) {
                    setActiveTime(`Ativo há pelo menos ${currentHour - userLastAccessHour} horas`)

                } else if (currentMinute - userLastAccessMinute === 1) {
                    setActiveTime(`Ativo há pelo menos ${currentHour - userLastAccessHour} horas e ${currentMinute - userLastAccessMinute} minuto`)
                }
                else {
                    setActiveTime(`Ativo há pelo menos ${currentHour - userLastAccessHour} horas e ${currentMinute - userLastAccessMinute} minutos`)
                }
            }
        }

        console.log('hourUTC :>> ', date.getUTCHours());
        console.log('minuteUTC :>> ', date.getUTCMinutes());
        console.log('user hour :>> ', dayjs(userLastAccess).hour());
        console.log('user minute :>> ', dayjs(userLastAccess).minute());
        console.log('userLastAccess :>> ', userLastAccess);
    }, [])


    return (
        <main className={style.mainContainerUserLogged}>

            <section className={style.mainContent}>
                <div className={style.userInfoContainer}>
                    <h1 className={style.userInfoName}><span className={style.userInfoFirstName}>{userFirstName} </span>{userLastName}</h1>
                    <p className={style.userInfoTime}>{activeTime}</p>

                    <Button onClick={handleLogout} text="Sair de aca.so" isWhiteBg={true} />
                </div>
                <div className={style.userImageContainer}>
                    <ImageBackground />
                    <div className={style.userImageProfileContainer}>
                        <img className={style.userImageProfileImage} src={ProfileImageUrl} alt="Imagem do usuário" />
                        <StatusProfile className={style.userImageProfileStatus} />
                    </div>
                </div>

            </section>
        </main>
    )
}
export default MyAccountPage
