import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import GetUserData from '../services/GetUserData';

interface UserContextType {
    isLoading?: boolean;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    isCreateUserLoading?: boolean;
    setIsCreateUserLoading?: Dispatch<SetStateAction<boolean>>;
    isLoginLoading?: boolean;
    setIsLoginLoading?: Dispatch<SetStateAction<boolean>>;

    requestError?: string;
    setRequestError?: Dispatch<SetStateAction<string>>;
    loginRequestError?: string;
    setLoginRequestError?: Dispatch<SetStateAction<string>>;
    requestResendError?: string;
    setRequestResendError?: Dispatch<SetStateAction<string>>;
    requestSignUpError?: string;
    setRequestSignUpError?: Dispatch<SetStateAction<string>>;
    requestConfirmRegisterError?: string;
    setRequestConfirmRegisterError?: Dispatch<SetStateAction<string>>;

    successRequest?: boolean;
    setSuccessRequest?: Dispatch<SetStateAction<boolean>>;
    isResendloading?: boolean;
    setIsResendLoading?: Dispatch<SetStateAction<boolean>>;
    successResendRequest?: boolean;
    setSuccessResendRequest?: Dispatch<SetStateAction<boolean>>;

    userFirstName?: string;
    setUserFirstName?: Dispatch<SetStateAction<string | undefined>>;
    userLastName?: string;
    setUserLastName?: Dispatch<SetStateAction<string | undefined>>;
    userLastAccess?: string;
    setUserLastAccess?: Dispatch<SetStateAction<string>>;


    // loginFetch?: (userData: userDataType) => void;
    signUpFetch?: (userData: userDataType) => void;
    confirmSignUpFetch?: (userData: userDataType) => void;
    resendCodeFetch?: () => void;
    createUserFetch?: (storedIdToken: string | null) => void;
    GetUserData?: () => void;
    userLogout?: () => void
}

interface userDataType {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    code?: string;

    user?: {
        first_name: string;
        last_name: string;
    };
    token?: {
        id_token: string;
    };
}

const defaultUserState = {}

const UserContext = createContext<UserContextType>(defaultUserState);

const UserProvider = ({ children }: { children: ReactNode }) => {

    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false)
    const [isCreateUserLoading, setIsCreateUserLoading] = useState<boolean>(false)

    const [requestError, setRequestError] = useState<string>('')
    const [loginRequestError, setLoginRequestError] = useState<string>('')
    const [requestConfirmRegisterError, setRequestConfirmRegisterError] = useState<string>('')
    const [requestResendError, setRequestResendError] = useState<string>('')


    const [userFirstName, setUserFirstName] = useState<string>()
    const [userLastName, setUserLastName] = useState<string>()

    const { request } = GetUserData(false)

    const navigate = useNavigate();

    const createUserFetch = async (storedIdToken: string | null) => {
        setRequestError('')
        setIsCreateUserLoading(true)
        await axios.post(`${baseURL}/user/`,
            {

            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedIdToken}`
                }
            }).then((response) => {
                console.log('response createUserFetch :>> ', response);
                setRequestError('')
                request()
            }).catch((error) => {
                console.log('error createUserFetch:>> ', error);
                setIsCreateUserLoading(false)
                setRequestError('Erro ao criar o usuário')
                setSuccessRequest(false)
            }).finally(() => {
                setIsCreateUserLoading(false)
            })
    }

    const userLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <UserContext.Provider value={{
            isCreateUserLoading,
            setIsCreateUserLoading,
            isLoginLoading,
            setIsLoginLoading,

            requestError,
            setRequestError,
            loginRequestError,
            setLoginRequestError,
            requestResendError,
            setRequestResendError,
            requestConfirmRegisterError,
            setRequestConfirmRegisterError,

            userFirstName,
            userLastName,
            setUserFirstName,
            setUserLastName,
            // userLastAccess,

            // loginFetch,
            createUserFetch,
            // GtUserData,
            userLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }