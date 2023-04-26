import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

interface UserContextType {
    isLoginLoading?: boolean;
    setIsLoginLoading?: Dispatch<SetStateAction<boolean>>;

    requestError?: string;
    setRequestError?: Dispatch<SetStateAction<string>>;
    loginRequestError?: string;
    setLoginRequestError?: Dispatch<SetStateAction<string>>;

    userFirstName?: string;
    setUserFirstName?: Dispatch<SetStateAction<string | undefined>>;
    userLastName?: string;
    setUserLastName?: Dispatch<SetStateAction<string | undefined>>;

    userLogout?: () => void
}

const defaultUserState = {}

const UserContext = createContext<UserContextType>(defaultUserState);

const UserProvider = ({ children }: { children: ReactNode }) => {

    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false)

    const [requestError, setRequestError] = useState<string>('')
    const [loginRequestError, setLoginRequestError] = useState<string>('')


    const [userFirstName, setUserFirstName] = useState<string>()
    const [userLastName, setUserLastName] = useState<string>()

    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <UserContext.Provider value={{

            isLoginLoading,
            setIsLoginLoading,

            requestError,
            setRequestError,
            loginRequestError,
            setLoginRequestError,

            userFirstName,
            userLastName,
            setUserFirstName,
            setUserLastName,

            userLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }