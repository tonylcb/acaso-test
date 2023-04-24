
import Button from '../../components/button/button'
import style from './my-account.module.scss'
import { ReactComponent as ImageBackground } from "../../assets/image-background.svg"
import { ReactComponent as StatusProfile } from "../../assets/status-profile.svg"
import ProfileImageUrl from "../../assets/profile-image.png"
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function MyAccountPage() {

    const { userLogout } = useContext(UserContext)

    const handleLogout = () => {
        userLogout?.()
    }

    const navigate = useNavigate()
    useEffect(() => {
        const idToken = localStorage.getItem("id_token")
        if (idToken === null) {
            navigate("/")
        }
    }, [])
    // if (!isUserLogged) return <Navigate to="/" />

    return (
        <main className={style.mainContainerUserLogged}>

            <section className={style.mainContent}>
                <div className={style.userInfoContainer}>
                    <h1 className={style.userInfoName}><span className={style.userInfoFirstName}>João </span>Carlos</h1>
                    <p className={style.userInfoTime}>Ativo há pelo menos <span>42 minutos</span></p>

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
