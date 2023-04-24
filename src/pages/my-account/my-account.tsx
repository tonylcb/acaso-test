
import Button from '../../components/button/button'
// import { UserContext } from '../../contexts/UserContext'
import style from './my-account.module.scss'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ReactComponent as ImageBackground } from "../../assets/image-background.svg"
import { ReactComponent as StatusProfile } from "../../assets/status-profile.svg"
import ProfileImageUrl from "../../assets/profile-image.png"
import { UserContext } from '../../contexts/UserContext'

function MyAccountPage() {
    const navigate = useNavigate()

    const { changeUserStatus } = useContext(UserContext)
    changeUserStatus(false)
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
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
    )
}
export default MyAccountPage
