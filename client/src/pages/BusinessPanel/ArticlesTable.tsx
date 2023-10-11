import BusinessPanelPage from "./BusinessPanelPage"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import ArticleTestData from "../../test/ArticleData"

const ArticlesTable: React.FC = () => {
    return (
        <BusinessPanelPage>
            <>
                <div className="business-panel--page-header">
                    <h1>Articles</h1>
                    <button>New Article</button>
                </div>

                <PanelTable tableType="Article" tableContents={ArticleTestData}/>
            </>
        </BusinessPanelPage>
    )
}

export default ArticlesTable