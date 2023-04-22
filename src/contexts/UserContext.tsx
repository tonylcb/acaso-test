import { createContext, useState, ReactNode } from 'react'

interface UserContextType {
    isUserLogged: boolean;
    toggleUserState?: () => void;
}

const defaultUserState = {
    isUserLogged: false
}

const UserContext = createContext<UserContextType>(defaultUserState);

const UserProvider = ({ children }: { children: ReactNode }) => {

    const [isUserLogged, setIsUserLogged] = useState(defaultUserState.isUserLogged)
    const toggleUserState = () => {
        setIsUserLogged(!isUserLogged)
        console.log('isUserLogged :>> ', isUserLogged);
    }

    return (
        <UserContext.Provider value={{ isUserLogged, toggleUserState }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }