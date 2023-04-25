import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface UserContextType {
    isloading?: boolean;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    requestError?: string;
    setRequestError?: Dispatch<SetStateAction<string>>;
    requestResendError?: string;
    setRequestResendError?: Dispatch<SetStateAction<string>>;
    successRequest?: boolean;
    setSuccessRequest?: Dispatch<SetStateAction<boolean>>;
    isResendloading?: boolean;
    setIsResendLoading?: Dispatch<SetStateAction<boolean>>;
    successResendRequest?: boolean;
    setSuccessResendRequest?: Dispatch<SetStateAction<boolean>>;

    userFirstName?: string;
    setUserFirstName?: Dispatch<SetStateAction<string>>;
    userLastName?: string;
    setUserLastName?: Dispatch<SetStateAction<string>>;

    loginFetch?: (userData: userDataType) => void;
    signUpFetch?: (userData: userDataType) => void;
    confirmSignUpFetch?: (userData: userDataType) => void;
    resendCodeFetch?: () => void;
    getUserData?: () => void;
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

    const [isloading, setIsLoading] = useState<boolean>(false)
    const [isResendloading, setIsResendLoading] = useState<boolean>(false)
    const [requestError, setRequestError] = useState<string>('')
    const [requestResendError, setRequestResendError] = useState<string>('')
    const [successRequest, setSuccessRequest] = useState<boolean>(false)
    const [successResendRequest, setSuccessResendRequest] = useState<boolean>(false)

    const [userFirstName, setUserFirstName] = useState<string>('')
    const [userLastName, setUserLastName] = useState<string>('')

    // const [userId, setUserId] = useState<string>('')

    const navigate = useNavigate();

    const baseURL = 'https://api.staging.aca.so'

    const loginFetch = async (userData: userDataType) => {
        setRequestError('')
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
                console.log('response loginFetch :>> ', response);

                setRequestError('')
                localStorage.setItem("user_id", response.data.user.id)
                localStorage.setItem("access_token", response.data.token.access_token)
                localStorage.setItem("id_token", response.data.token.id_token)
                localStorage.setItem("refresh_token", response.data.token.refresh_token)

                getUserData()
                setIsLoading(false)
                setRequestError('')

            }).catch((error) => {
                console.log('error :>> ', error);
                if (error.response.data.message === "Incorrect username or password") {
                    setRequestError('E-mail ou senha incorreto')
                } else if (error.response.data.message === "Email not registered") {
                    setRequestError('E-mail não registrado')
                } else {
                    setRequestError('Erro no servidor')
                }
                setIsLoading(false)


            }).finally(() => {
                setIsLoading(false)
            })
    }

    const signUpFetch = async (userData: userDataType) => {
        setIsLoading(true)
        setRequestError('')
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

    const resendCodeFetch = async () => {
        setRequestResendError('')
        setIsResendLoading(true)
        setSuccessResendRequest(false)
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
                setSuccessResendRequest(true)
                setTimeout(() => {
                    setSuccessResendRequest(false)
                }, 4000)

                console.log('response resendCodeFetch :>> ', response);
                setRequestResendError('')
                navigate('/confirmar-cadastro')
            }).catch((error) => {
                console.log('error :>> ', error);
                if (error.response.data.message === "Limit exceeded. Try again later") {
                    setRequestResendError('Limite excedido, tente mais tarde')
                }
                setRequestResendError('Erro no servidor')
                setIsResendLoading(false)
                setSuccessResendRequest(false)
            }).finally(() => {
                setIsResendLoading(false)

            })
    }

    const confirmSignUpFetch = async (userData: userDataType) => {
        setRequestError('')
        setSuccessRequest(false)
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
                localStorage.removeItem("email")
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

    const createUserFetch = async (storedIdToken: string | null) => {
        setRequestError('')
        setIsLoading(true)

        // const user = userData.user
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
                navigate("/minha-conta")
                localStorage.setItem("is_user_logged", "true")
                setRequestError('')
                setIsLoading(false)
            }).catch((error) => {
                console.log('error createUserFetch:>> ', error);
                setIsLoading(false)
                setSuccessRequest(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const getUserData = async () => {
        setIsLoading(true)
        const storedUserId = localStorage.getItem("user_id")
        const storedIdToken = localStorage.getItem("id_token")

        axios.get(`${baseURL}/user/${storedUserId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedIdToken}`
                }
            }
        ).then((response) => {
            console.log('response getUserData :>> ', response);
            navigate("/minha-conta")
            localStorage.setItem("is_user_logged", "true")

            setUserFirstName(response.data.first_name)
            setUserLastName(response.data.last_name)

            setIsLoading(false)
        }).catch((error) => {
            console.log('error getUserData :>> ', error);
            if (error.response.status === 404) {
                createUserFetch(storedIdToken)
            }
            setIsLoading(false)
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
            isloading,
            requestError,
            requestResendError,
            successRequest,
            isResendloading,
            successResendRequest,

            userFirstName,
            userLastName,

            loginFetch,
            signUpFetch,
            confirmSignUpFetch,
            resendCodeFetch,
            getUserData,
            userLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }