import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface UserContextType {
    isUserLogged?: boolean;
    setIsUserLogged?: Dispatch<SetStateAction<boolean>>;
    // currentFirstName?: string;
    // setCurrentFirstName?: Dispatch<SetStateAction<string>>;
    // currentLastName?: string;
    // setCurrentLastName?: Dispatch<SetStateAction<string>>;
    // currentUserEmail?: string;
    // setCurrentUserEmail?: Dispatch<SetStateAction<string>>;
    isloading?: boolean;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    requestError?: string;
    setRequestError?: Dispatch<SetStateAction<string>>;
    successRequest?: boolean;
    setSuccessRequest?: Dispatch<SetStateAction<boolean>>;
    isResendloading?: boolean;
    setIsResendLoading?: Dispatch<SetStateAction<boolean>>;
    successResendRequest?: boolean;
    setSuccessResendRequest?: Dispatch<SetStateAction<boolean>>;

    fetchLogin?: (userData: userDataType) => void;
    signUpRequest?: (userData: userDataType) => void;
    confirmSignUpRequest?: (userData: userDataType) => void;
    resendCodeRequest?: () => void;
    userLogout?: () => void
}

interface userDataType {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    code?: string;
}

const defaultUserState = {}

const UserContext = createContext<UserContextType>(defaultUserState);

const UserProvider = ({ children }: { children: ReactNode }) => {

    const [isUserLogged, setIsUserLogged] = useState<boolean>(false)
    // const [currentFirstName, setCurrentFirstName] = useState<string>('')
    // const [currentLastName, setCurrentLastName] = useState<string>('')
    // const [currentUserEmail, setCurrentUserEmail] = useState<string>('')

    const [isloading, setIsLoading] = useState<boolean>(false)
    const [isResendloading, setIsResendLoading] = useState<boolean>(false)
    const [requestError, setRequestError] = useState<string>('')
    const [successRequest, setSuccessRequest] = useState<boolean>(false)
    const [successResendRequest, setSuccessResendRequest] = useState<boolean>(false)

    const navigate = useNavigate();

    const baseURL = 'https://api.staging.aca.so'

    const fetchLogin = async (userData: userDataType) => {
        setIsLoading(true)
        await axios.post(`${baseURL}/auth/login`,
            {
                email: userData.email,
                password: userData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log('response :>> ', response);
                setRequestError('')
                localStorage.setItem("is_user_logged", "true")
                localStorage.setItem("access_token", response.data.token.access_token)
                localStorage.setItem("id_token", response.data.token.id_token)
                localStorage.setItem("refresh_token", response.data.token.refresh_token)

                setIsLoading(false)

                navigate("/minha-conta")

                // navigate("/minha-conta")
            }).catch((error) => {
                console.log('error :>> ', error);
                if (error.response.status === 400) {
                    setRequestError('E-mail ou senha incorreto')
                } else {
                    setRequestError('Erro no servidor')
                }
                setIsLoading(false)


            }).finally(() => {
                setIsLoading(false)
            })
    }

    const signUpRequest = async (userData: userDataType) => {
        setIsLoading(true)
        localStorage.setItem("email", userData.email as string)

        await axios.post(`${baseURL}/auth/sign-up`,
            {
                email: userData.email,
                first_name: userData.firstName,
                last_name: userData.lastName,
                password: userData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                setRequestError('')
                navigate("/confirmar-cadastro")
                setIsLoading(false)
            }).catch((err) => {
                console.log('err :>> ', err);
                if (err.response.status === 400) {
                    setRequestError('E-mail já cadastrado!')
                } else {
                    setRequestError('Erro no servidor')
                }
                setIsLoading(false)
                setSuccessRequest(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const resendCodeRequest = async () => {
        setIsResendLoading(true)
        const userEmail = localStorage.getItem("email")
        await axios.post(`${baseURL}/auth/resend-confirmation-code`,
            {
                email: userEmail
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setSuccessRequest(true)

                console.log('responseEmail :>> ', response);
                setRequestError('')
                navigate('/confirmar-cadastro')
            }).catch((err) => {
                console.log('err :>> ', err);
                setRequestError('Erro no servidor')
                setIsResendLoading(false)

                setSuccessRequest(false)
            }).finally(() => {
                setIsResendLoading(false)

            })
    }

    const confirmSignUpRequest = async (userData: userDataType) => {
        const userEmail = localStorage.getItem("email")
        setIsLoading(true)

        await axios.post(`${baseURL}/auth/confirm-sign-up`,
            {
                email: userEmail,
                confirmation_code: userData.code
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setSuccessRequest(true)
                console.log('responseEmail :>> ', response);
                setRequestError('')

                setTimeout(() => {
                    navigate("/")
                }, 3000)
            }).catch((err) => {
                console.log('err :>> ', err);
                setRequestError('Erro no servidor')
                setIsLoading(false)
                setSuccessRequest(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const userLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <UserContext.Provider value={{
            isUserLogged,
            setIsUserLogged,
            // currentUserEmail,
            // setCurrentUserEmail,
            // currentFirstName,
            // setCurrentFirstName,
            // currentLastName,
            // setCurrentLastName,
            isloading,
            setIsLoading,
            requestError,
            setRequestError,
            successRequest,
            setSuccessRequest,
            isResendloading,
            setIsResendLoading,
            successResendRequest,
            setSuccessResendRequest,

            fetchLogin,
            signUpRequest,
            confirmSignUpRequest,
            resendCodeRequest,
            userLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }