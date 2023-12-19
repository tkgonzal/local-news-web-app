import { ReactNode, createContext, useContext, useState } from "react"
import { Snackbar } from "../types/interfaces/Snackbar" 

interface UserContextType {
    snackbar: Snackbar | null
    setSnackbar: React.Dispatch<React.SetStateAction<Snackbar | null>>
}

const SnackbarContext = createContext<UserContextType | undefined>(undefined)

function useSnackbar() {
    const context = useContext(SnackbarContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}

interface SnackbarProviderProps {
    children: ReactNode
}

function SnackbarProvider({ children }: SnackbarProviderProps) {
    const [snackbar, setSnackbar] = useState<Snackbar | null>(null)

    return (
        <SnackbarContext.Provider value={{snackbar, setSnackbar}}>
            {children}
        </SnackbarContext.Provider>
    )
}

export { useSnackbar }
export { SnackbarProvider }