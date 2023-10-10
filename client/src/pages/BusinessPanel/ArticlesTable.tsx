import PanelHeader from "../../components/BusinessPanel/PanelHeader"
import PanelNav from "../../components/BusinessPanel/PanelNav"

import UserData from "../../test/UserData"

const ArticlesTable: React.FC = () => {
    return (
        <>
            <PanelHeader />
            <main className="business-panel--main">
                <PanelNav />
            </main>
        </>
    )
}

export default ArticlesTable