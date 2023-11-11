import { useState } from "react"
import { useLocation } from "react-router-dom"

import { useUserContext } from "../contexts/UserContext"

// Custom hook for managing when to retrieve either users or tables for a 
// Business Panel Table
const usePanelTableState = () => {
    const { user } = useUserContext()
    const location = useLocation()
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)

    return {
        user,
        location,
        shouldRefresh,
        setShouldRefresh
    }
}

export default usePanelTableState