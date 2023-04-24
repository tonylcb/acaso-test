import Header from "./components/header/header"
import LoginPage from "./pages/login/login"
import RegisterPage from "./pages/register/register"
import { ReactComponent as Ring } from "./assets/ring.svg"
import style from "./styles/user-not-logged.module.scss"
import { UserContext } from "./contexts/UserContext"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from 'react'

import "@fontsource/raleway/300.css"
import "@fontsource/raleway/300-italic.css"
import "@fontsource/raleway/500.css"
import "@fontsource/raleway/600.css"
import "@fontsource/raleway/700.css"
import "@fontsource/raleway/700-italic.css"
import ConfirmRegisterPage from "./pages/confirm-email/confirm-register"
import MyAccountPage from "./pages/my-account/my-account"
import { useState, useEffect } from "react"

function App() {
  const { isUserLogged, changeUserStatus } = useContext(UserContext)
  console.log('isUserLogged :>> ', isUserLogged);

  useEffect(() => {
    const checkStorage = localStorage.getItem("is_user_logged")
    if (checkStorage === "true") {
      changeUserStatus(true)
    } else {
      changeUserStatus(false)
    }
  }, [])

  return (
    <BrowserRouter>
      {
        !isUserLogged &&
        <Header />
      }
      <main className={`mainContainer ${isUserLogged && 'mainContainerUserLogged'}`}>
        {
          !isUserLogged &&
          <Ring className={style.ring} />
        }
        <Routes>
          {/* {
            isUserLogged ?
              <Route path='/minha-conta' element={<MyAccountPage />} /> :
              <Route path='*' element={<Navigate to='/' replace />} />
          } */}
          <>
            <Route path='/minha-conta' element={<MyAccountPage />} /> :
            <Route path='/' element={<LoginPage />} />
            <Route path='/cadastro' element={<RegisterPage />} />
            <Route path='/confirmar-cadastro' element={<ConfirmRegisterPage />} />
          </>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
