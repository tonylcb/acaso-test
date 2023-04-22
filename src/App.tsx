import Header from "./components/header/header"
import LoginPage from "./pages/login/login"
import RegisterPage from "./pages/register/register"
import { ReactComponent as Ring } from "./assets/ring.svg"
import style from "./styles/user-not-logged.module.scss"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UserProvider, UserContext } from "./contexts/UserContext"
import { useContext } from 'react'

import "@fontsource/raleway/600.css"
import "@fontsource/raleway/500.css"
import "@fontsource/raleway/700.css"
import ConfirmEmailPage from "./pages/confirm-email/confirm-email"
import MyAccountPage from "./pages/my-account/my-account"


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginPage />
    )
  },
  {
    path: "cadastro",
    element: (
      <RegisterPage />
    )
  },
  {
    path: "confirmar-email",
    element: (
      <ConfirmEmailPage />
    )
  },
  {
    path: "minha-conta",
    element: (
      <MyAccountPage />
    )
  }
])

function App() {
  const { isUserLogged } = useContext(UserContext)

  return (
    <UserProvider>
      {!isUserLogged &&
        <Header />
      }
      <main className={`mainContainer ${isUserLogged && 'mainContainerUserLogged'}`}>
        {!isUserLogged &&
          <Ring className={style.ring} />
        }
        <RouterProvider router={router} />
      </main>
    </UserProvider>
  )
}

export default App
