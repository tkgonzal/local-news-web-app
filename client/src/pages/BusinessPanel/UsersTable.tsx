import BusinessPanelPage from "./BusinessPanelPage"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import UserTestData from "../../test/UserData"

import "./BusinessPanel.css"

// Page to display the users of a business as well as actions one may take on 
// them
const UsersTable: React.FC = () => {
    return (
        <BusinessPanelPage>
            <>
                <div className="business-panel--page-header">
                    <h1>Users</h1>

                    <button>New User</button>
                </div>

                <PanelTable tableType="User" tableContents={UserTestData}/>
            </>
        </BusinessPanelPage>
    )
}

export default UsersTable