import { useState, useEffect } from "react"
import { NavigateFunction, useNavigate, useLocation } from "react-router-dom"

import { useUserContext } from "../../contexts/UserContext"

import axios from "axios"
import Cookies from "js-cookie"

import BusinessPanelPage from "./BusinessPanelPage"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import { User } from "../../types/interfaces/User"

// import UserTestData from "../../test/UserData"

// Page to display the users of a business as well as actions one may take on 
// them
const UsersTable: React.FC = () => {
    const { user } = useUserContext()
    const [businessUsers, setBusinessUsers] = useState<User[]>([])
    const location = useLocation()
    const formNavigate: NavigateFunction = useNavigate()

    useEffect(() => {
        // Helper Function for getting users for a business
        const getUsersForBusinsess = async () => {
            if (user) {
                const businessId = user.accType === "Business" ? user._id : user?.businessId
        
                const businessUsersResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/business/users/${businessId}`,
                    {
                        "headers": {
                            "Authorization": `Bearer ${Cookies.get("access_token")}`
                        }
                    }
                )
    
                const { users } = businessUsersResponse.data
                setBusinessUsers(users)
            }
        }

        getUsersForBusinsess()

    }, [user, location])

    // Event Handlers
    // Event handler to navigate the user to the new user form
    const makeNewUser = (): void => {
        formNavigate("/business/users/form/new")
    }

    return (
        <BusinessPanelPage>
            <>
                <div className="business-panel--page-header">
                    <h1>USERS</h1>

                    <button onClick={makeNewUser}>+ New User</button>
                </div>

                <PanelTable tableType="User" tableContents={businessUsers}/>
            </>
        </BusinessPanelPage>
    )
}

export default UsersTable