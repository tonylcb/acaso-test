import { useEffect } from 'react'
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface UserContextType {
    isUserLogged?: boolean;
    changeUserStatus: (userStatus: boolean) => void;
    currentFirstName?: string;
    setCurrentFirstName?: Dispatch<SetStateAction<string>>;
    currentLastName?: string;
    setCurrentLastName?: Dispatch<SetStateAction<string>>;
    currentUserEmail?: string;
    setCurrentUserEmail?: Dispatch<SetStateAction<string>>;
}

const defaultUserState = {
    changeUserStatus: () => false
}

const UserContext = createContext<UserContextType>(defaultUserState);

const UserProvider = ({ children }: { children: ReactNode }) => {

    const [isUserLogged, setIsUserLogged] = useState<boolean>()
    const [currentFirstName, setCurrentFirstName] = useState<string>('')
    const [currentLastName, setCurrentLastName] = useState<string>('')
    const [currentUserEmail, setCurrentUserEmail] = useState<string>('')


    const changeUserStatus = (userStatus: boolean) => {
        return setIsUserLogged(userStatus)
    }

    return (
        <UserContext.Provider value={{ isUserLogged, changeUserStatus, currentUserEmail, setCurrentUserEmail, currentFirstName, setCurrentFirstName, currentLastName, setCurrentLastName }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }