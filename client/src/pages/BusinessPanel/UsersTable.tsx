import { useState, useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import axios from "axios"
import Cookies from "js-cookie"

import usePanelTableState from "../../hooks/usePanelTableState"

import BusinessPanelPage from "./BusinessPanelPage"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import { User } from "../../types/interfaces/User"

// import UserTestData from "../../test/UserData"

// Page to display the users of a business as well as actions one may take on 
// them
const UsersTable: React.FC = () => {
    const { user, location, shouldRefresh, setShouldRefresh } = usePanelTableState()
    const [businessUsers, setBusinessUsers] = useState<User[]>([])
    const formNavigate: NavigateFunction = useNavigate()

    useEffect(() => {
        // Helper Function for getting users for a business
        const getUserForBusiness = async () => {
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
                setShouldRefresh(false)
            }
        }

        getUserForBusiness()

    }, [user, location, shouldRefresh])

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

                <PanelTable 
                    tableType="User" 
                    tableContents={businessUsers}
                    setShouldRefresh={setShouldRefresh}
                />
            </>
        </BusinessPanelPage>
    )
}

export default UsersTable