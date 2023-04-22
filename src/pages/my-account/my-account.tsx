
import Button from '../../components/button/button'
import { UserContext } from '../../contexts/UserContext'
import style from './my-account.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

function MyAccountPage() {
    const { isUserLogged } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserLogged) {
            navigate("/")
        }
    }, [isUserLogged])

    return (
        <div className={style.mainContent}>
            <Link className={style.link} to="/">
                <Button text="Sair de aca.so" isWhiteBg={true} />
            </Link>
        </div>
    )
}
export default MyAccountPage
