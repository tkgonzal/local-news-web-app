import { NavigateFunction, useNavigate } from "react-router-dom"

import BusinessPanelPage from "./BusinessPanelPage"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import UserTestData from "../../test/UserData"

// Page to display the users of a business as well as actions one may take on 
// them
const UsersTable: React.FC = () => {
    const formNavigate: NavigateFunction = useNavigate()

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

                <PanelTable tableType="User" tableContents={UserTestData}/>
            </>
        </BusinessPanelPage>
    )
}

export default UsersTable