import { Route, Routes, useNavigate } from "react-router-dom"
import Header from "../components/header/header"
import RegisterPage from "../pages/signup/signup"
import ConfirmRegisterPage from "../pages/confirm-signup/confirm-signup"
import LoginPage from "../pages/login/login"
import style from "../styles/user-not-logged.module.scss"
import { ReactComponent as Ring } from "../assets/ring.svg"
import { useEffect } from "react"

const LoginRoutes = () => {

    const navigate = useNavigate()
    useEffect(() => {
        const userLogged = localStorage.getItem("id_token")
        if (userLogged) {
            navigate("/minha-conta")
        }
    })

    return (
        <>
            <Header />
            <main className="mainContainer">
                <Ring className={style.ring} />
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/cadastro' element={<RegisterPage />} />
                    <Route path='/confirmar-cadastro' element={<ConfirmRegisterPage />} />
                </Routes>
            </main>
        </>
    )
}

export default LoginRoutes