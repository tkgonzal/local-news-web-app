import { ReactNode, createContext, useContext, useState, useEffect } from "react"

import axios from "axios"
import Cookies from "js-cookie"

import { User } from "../types/interfaces/User"

const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL

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

    // Effect to log user back in after page refresh if their token is still valid
    useEffect(() => {
        logBackIn()        
    }, [])

    // Logs user back in
    const logBackIn = async () => {
        try {
            const loginResponse = await axios.post(
                `${BASE_SERVER_URL}/api/auth/relogin`,
                {},
                {
                    headers: {
                        "Authorization": Cookies.get("access_token")
                    }
                }
            )

            if (loginResponse.status === 200) {
                const { user } = loginResponse.data
                setUser(user)
            } else {
                Cookies.set("access_token", "")
            }
        } catch (error: any) {
            console.log("Error Occurred Logging User Back In")
        }
    }

    // Effectively logs the user out by setting their user to null
    const logout = () => {
        setUser(null)
        Cookies.set("access_token", "");
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}