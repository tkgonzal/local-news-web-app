import { NavigateFunction, useNavigate } from "react-router-dom"

import BusinessPanelPage from "./BusinessPanelPage"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import ArticleTestData from "../../test/ArticleData"

// Page used for dashboard, displaying a business's articles and options
// to edit/delete them or make new ones
const ArticlesTable: React.FC = () => {
    const formNavigate: NavigateFunction = useNavigate()

    // Event handlers
    // Event handler to navigate the user to a new article form
    const makeNewArticle = (): void => {
        formNavigate("/business/articles/form/new")
    }

    return (
        <BusinessPanelPage>
            <>
                <div className="business-panel--page-header">
                    <h1>ARTICLES</h1>
                    <button onClick={makeNewArticle}>+ New Article</button>
                </div>

                <PanelTable tableType="Article" tableContents={ArticleTestData}/>
            </>
        </BusinessPanelPage>
    )
}

export default ArticlesTable