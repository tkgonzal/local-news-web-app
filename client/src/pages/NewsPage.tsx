import { Article } from "../types/interfaces/Article"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../components/ArticleCarousel"

import "./NewsPage.css"

interface Props {
    articles: Article[]
}

// Page component for the news page of the app which displays all the news subcategories
const NewsPage: React.FC<Props> = ({ articles }) => {
    const mainArticleThumbnail: JSX.Element = 
        <ArticleThumbnail className="main-article" article={articles[0]}/>

    const articleThumbnails: JSX.Element[] = articles.slice(1).map(
        (article: Article) => 
            <ArticleThumbnail key={article.id} article={article} />
    )

    return (
        <main className="subpage">

            <h1 className="subpage--header">Filler</h1>
            <div className="subpage--articles">
                <div className="subpage--main-article">
                    {mainArticleThumbnail}
                </div>

                <div className="subpage--secondary-articles">
                    {articleThumbnails}
                </div>


            </div>
                
            <h2 className="home--article-carousel-header">Featured</h2>
            <div className="home--article-carousel-container">
                <ArticleCarousel articleThumbnails={articleThumbnails}/>
            </div>

        </main>
    )
}

export default NewsPage