import { useUserContext } from "../../contexts/UserContext"

import PanelNav from "../../components/BusinessPanel/PanelNav"
import AccessDenied from "../AccessDenied"

import "./BusinessPanel.css"

interface Props {
    children: JSX.Element
}

// A template to be used for all the pages used for the BusinessPanel. Renders
// the children its given undet the page content div
const BusinessPanelPage: React.FC<Props> = ({ children }) => {
    const { user } = useUserContext()

    const userHasBusinessPanelPermissions: boolean | null = user && 
        (user.accType === "Business" || user.businessId !== "")

    return (
        <main className="business-panel">
            {userHasBusinessPanelPermissions && <PanelNav />}
            <div className="business-panel--page-content">
                {userHasBusinessPanelPermissions ? children : <AccessDenied />}
            </div>
        </main>
    )
}

export default BusinessPanelPage