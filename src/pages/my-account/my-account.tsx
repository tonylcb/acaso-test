
import Button from '../../components/button/button'
import { UserContext } from '../../contexts/UserContext'
import style from './my-account.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ReactComponent as ImageBackground } from "../../assets/image-background.svg"
import { ReactComponent as StatusProfile } from "../../assets/status-profile.svg"
import ProfileImageUrl from "../../assets/profile-image.png"

function MyAccountPage() {
    const { isUserLogged } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserLogged) {
            navigate("/")
        }
    }, [isUserLogged])

    return (
        <section className={style.mainContent}>
            <div className={style.userInfoContainer}>
                <h1 className={style.userInfoName}><span className={style.userInfoFirstName}>João </span>Carlos</h1>
                <p className={style.userInfoTime}>Ativo há pelo menos <span>42 minutos</span></p>
                <Link className={style.link} to="/">
                    <Button text="Sair de aca.so" isWhiteBg={true} />
                </Link>
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
