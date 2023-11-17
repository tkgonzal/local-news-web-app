import { ReactNode, createContext, useContext, useState } from "react"
import { User } from "../types/interfaces/User"

interface UserContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUserContext() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}

interface UserProviderProps {
    children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    // console.log('context user: ', user)

    // Effectively logs the user out by setting their user to null
    const logout = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}