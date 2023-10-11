import PanelHeader from "../../components/BusinessPanel/PanelHeader"
import PanelNav from "../../components/BusinessPanel/PanelNav"

import PanelTable from "../../components/BusinessPanel/PanelTable"

import ArticleTestData from "../../test/ArticleData"

import "./BusinessPanel.css"

const ArticlesTable: React.FC = () => {
    return (
        <>
            <PanelHeader />
            <main className="business-panel--main">
                <PanelNav />
                <div className="business-panel--page-content">
                    <div className="business-panel--page-header">
                        <h1>Articles</h1>

                        <button>
                            New Article
                        </button>
                    </div>

                    <PanelTable tableContents={ArticleTestData}/>
                </div>

            </main>
        </>
    )
}

export default ArticlesTable