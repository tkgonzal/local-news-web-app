import { Article } from "../types/interfaces/Article"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../components/ArticleCarousel"
import HeadlineColumn from "../components/BreakingNews/HeadlineColumn"

import "./BreakingNews.css"

interface Props {
    articles: Article[]
}

// Page component for the home page of the app which displays breaking news
const BreakingNews: React.FC<Props> = ({ articles }) => {
    const mainArticleThumbnail: JSX.Element = 
        <ArticleThumbnail className="main-article" article={articles[0]}/>

    const articleThumbnails: JSX.Element[] = articles.slice(1).map(
        (article: Article) => 
            <ArticleThumbnail key={article.id} article={article} />
    )

    return (
        <main className="home">
            <div className="home--main-column">
                <h1>BREAKING NEWS</h1>
                {mainArticleThumbnail}

                <div className="home--article-carousel-container">
                    <h2>TOP STORIES</h2>
                    <ArticleCarousel articleThumbnails={articleThumbnails}/>
                </div>
            </div>

            <div className="home--secondary-column">
                <h2>LATEST HEADLINES</h2>
                <HeadlineColumn articleThumbnails={articleThumbnails}/>
                <h2>MORE NEWS</h2>
            </div>
        </main>
    )
}

export default BreakingNews