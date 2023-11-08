import { useState, useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import usePanelTableState from "../../hooks/usePanelTableState"

import BusinessPanelPage from "./BusinessPanelPage"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import { Article } from "../../types/interfaces/Article"

// import ArticleTestData from "../../test/ArticleData"

// Page used for dashboard, displaying a business's articles and options
// to edit/delete them or make new ones
const ArticlesTable: React.FC = () => {
    const { user, location, shouldRefresh, setShouldRefresh } = usePanelTableState()
    const [businessArticles, setBusinessArticles] = useState<Article[]>([])
    const formNavigate: NavigateFunction = useNavigate()

    // Side Effects
    // Effect to retrieve the articles for a business whenever the ArticlesTable
    // must refresh or is loaded
    useEffect(() => {
        // Helper function for getting articles associated with a business
        const getArticlesForBusiness = async () => {
            if (user) {
                const businessId = user.businessId || user._id

                // const businessArticlesResponse
            }
        }
    }, [user, location, shouldRefresh])

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

                <PanelTable tableType="Article" tableContents={businessArticles}/>
            </>
        </BusinessPanelPage>
    )
}

export default ArticlesTable