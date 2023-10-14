import PanelNav from "../../components/BusinessPanel/PanelNav"

import "./BusinessPanel.css"

interface Props {
    children: JSX.Element
}

// A template to be used for all the pages used for the BusinessPanel. Renders
// the children its given undet the page content div
const BusinessPanelPage: React.FC<Props> = ({ children }) => {
    return (
        <main className="business-panel--main">
            <PanelNav />
            <div className="business-panel--page-content">
                {children}
            </div>
        </main>
    )
}

export default BusinessPanelPage