import PanelHeader from "../../components/BusinessPanel/PanelHeader"
import PanelNav from "../../components/BusinessPanel/PanelNav"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import UserTestData from "../../test/UserData"

import "./BusinessPanel.css"

const UsersTable: React.FC = () => {
    return (
        <>
            <PanelHeader />
            <main className="business-panel--main">
                <PanelNav />
                <div className="business-panel--page-content">
                    <div className="business-panel--page-header">
                        <h1>Users</h1>

                        <button>
                            New User
                        </button>
                    </div>

                    <PanelTable tableType="User" tableContents={UserTestData}/>
                </div>
            </main>
        </>
    )
}

export default UsersTable