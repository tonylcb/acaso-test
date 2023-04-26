
import Button from '../../components/button/button'
import style from './my-account.module.scss'
import { ReactComponent as ImageBackground } from "../../assets/image-background.svg"
import { ReactComponent as StatusProfile } from "../../assets/status-profile.svg"
import ProfileImageUrl from "../../assets/profile-image.png"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import getUserData from '../../services/GetUserData'

function MyAccountPage() {
    dayjs.extend(relativeTime)
    dayjs.extend(utc)

    const { userLogout, isCreateUserLoading, requestError, userFirstName, userLastName } = useContext(UserContext)
    const { userData, request, isLoading, errorMsg } = getUserData(false)


    console.log('userData :>> ', userData);
    const handleLogout = () => {
        userLogout?.()
    }

    const navigate = useNavigate()

    useEffect(() => {
        const userLogged = localStorage.getItem("id_token")

        if (userLogged === null) {
            navigate("/")
        } else {
            request()
        }
    }, [])

    const handleUserActiveTime = () => {
        const lastAccess = localStorage.getItem("last_access_at") as string

        const formattedUserLastAccess = dayjs.utc((lastAccess));
        const currentTime = dayjs().utc()

        let hourDiff: number | string = dayjs(currentTime).diff(dayjs(formattedUserLastAccess), "hour")
        let minuteDiff: number | string = dayjs(currentTime).diff(dayjs(formattedUserLastAccess), "minute")

        if (minuteDiff === 1) {
            minuteDiff = '1 minuto';
        } else if ((minuteDiff > 1)) {
            minuteDiff = `${minuteDiff} minutos`;
        } else if (minuteDiff === 0) {
            minuteDiff = ('')
        }

        if (hourDiff === 1) {
            hourDiff = '1 hora'
        } else if (hourDiff > 1) {
            hourDiff = `${hourDiff} horas`
        } else if (hourDiff === 0) {
            hourDiff = ''
        }
        if (lastAccess) {
            return (
                <>
                    {hourDiff !== '' || minuteDiff !== '' && 'Ativo há pelo menos '}
                    {hourDiff === '' && minuteDiff === '' && 'Acabou de entrar'}
                    <span>
                        {hourDiff}
                        {hourDiff !== '' && minuteDiff !== '' && 'e'}
                        {minuteDiff}
                    </span>
                </>
            )
        }
    }

    return (
        <main className={style.mainContainerUserLogged}>
            <section className={style.mainContent}>
                <div className={style.userInfoContainer}>
                    {
                        isLoading || isCreateUserLoading &&
                        <p className={style.userInfoTime}>
                            Carregando dados...
                        </p>
                    }
                    {
                        errorMsg !== '' &&
                        <p className={style.userInfoTime}>
                            {errorMsg}
                        </p>
                    }
                    {
                        requestError !== '' &&
                        <p className={style.userInfoTime}>
                            {requestError}
                        </p>
                    }
                    {
                        errorMsg === '' && !isLoading && !isCreateUserLoading &&
                        <>
                            <h1 className={style.userInfoName}><span className={style.userInfoFirstName}>{userFirstName
                            }</span>{userLastName}</h1>
                            <p className={style.userInfoTime}>
                                {handleUserActiveTime()}
                            </p>
                        </>
                    }
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
