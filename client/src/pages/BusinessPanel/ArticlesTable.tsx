import { useState, useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import axios from "axios"
import Cookies from "js-cookie"

import usePanelTableState from "../../hooks/usePanelTableState"

import BusinessPanelPage from "./BusinessPanelPage"
import PanelTable from "../../components/BusinessPanel/PanelTable"

import { Article } from "../../types/interfaces/Article"

// import ArticleTestData from "../../test/ArticleData"

// Constants
const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL

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

                const businessArticlesResponse = await axios.get(
                    `${BASE_SERVER_URL}/api/business/articles/${businessId}`,
                    {
                        "headers": {
                            "Authorization": `Bearer ${Cookies.get("access_token")}`
                        }
                    }
                )

                const { articles } = businessArticlesResponse.data
                setBusinessArticles(articles)
                setShouldRefresh(false)
            }
        }

        getArticlesForBusiness()
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

                <PanelTable 
                    tableType="Article" 
                    tableContents={businessArticles}
                    setShouldRefresh={setShouldRefresh}
                />
            </>
        </BusinessPanelPage>
    )
}

export default ArticlesTable