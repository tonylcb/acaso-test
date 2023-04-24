import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "@fontsource/raleway/300.css"
import "@fontsource/raleway/300-italic.css"
import "@fontsource/raleway/500.css"
import "@fontsource/raleway/600.css"
import "@fontsource/raleway/700.css"
import "@fontsource/raleway/700-italic.css"
import MyAccountPage from "./pages/my-account/my-account"
import { UserProvider } from "./contexts/UserContext"
import LoginRoutes from "./routes/login-routes"



function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/minha-conta' element={<MyAccountPage />} /> :
          <Route path='/*' element={<LoginRoutes />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
