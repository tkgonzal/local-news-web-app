import { Article } from "../types/interfaces/Article"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"
import MainArticleThumbnail from "../components/ArticleThumbnails/MainArticleThumbnail"
import ArticleCarousel from "../components/ArticleCarousel"

import "./BreakingNews.css"

interface Props {
    articles: Article[]
}

// Page component for the home page of the app which displays breaking news
const BreakingNews: React.FC<Props> = ({ articles }) => {
    const mainArticleThumbnail: JSX.Element = 
        <MainArticleThumbnail 
            article={articles[0]}   
        />

    const articleThumbnails: JSX.Element[] = articles.slice(1).map(
        (article: Article) => 
            <ArticleThumbnail key={article.id} article={article} />
    )

    return (
        <main className="home">
            <div className="home--main-column">
                {mainArticleThumbnail}

                <div className="home--article-carousel-container">
                    <ArticleCarousel articleThumbnails={articleThumbnails}/>
                </div>
            </div>

            <div className="home--secondary-column">
                this is the side column
            </div>
        </main>
    )
}

export default BreakingNews