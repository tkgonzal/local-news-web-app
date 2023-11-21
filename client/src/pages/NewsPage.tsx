import { Article } from "../types/interfaces/Article"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../components/ArticleCarousel"

import axios from "axios"

import "./NewsPage.css"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const BASE_API_URL = import.meta.env.VITE_SERVER_URL

// interface Props {
//     articles: Article[]
// }

// Page component for the news page of the app which displays all the news subcategories
const NewsPage: React.FC = () => {
    const location = useLocation()
    const [newsArticles,setArticles] = useState<Article[]>([])
    useEffect(() => {
        if(location.pathname === "/news"){
            fetchArticles()
        }
    }, [location]);

    const fetchArticles = async () => {
        try {
            const headlineResponse = await axios.get(
                `${BASE_API_URL}/api/articles?tag=Breaking%20News`
            )

            setArticles(headlineResponse.data)
        } catch (error) {
            console.log("An error occurred while retrieving Articles")
            console.log(error)
        }
    }

    
    const mainArticleThumbnail: JSX.Element = 
        newsArticles.length ? <ArticleThumbnail className="main-article" article={newsArticles[0]}/> : <></>

    const articleThumbnails: JSX.Element[] = newsArticles.slice(1,5).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    )
    console.log(newsArticles)

    return (
        <main className="subpage">

            <h1 className="subpage--header">BREAKING</h1>
            <div className="subpage--articles">
                <div className="subpage--main-article">
                    {mainArticleThumbnail}
                </div>

                <div className="subpage--secondary-articles">
                    {articleThumbnails}
                </div>


            </div>
                
            <h2 className="subpage--article-carousel-header">Featured</h2>
            <div className="subpage--article-carousel-container">
                <ArticleCarousel articleThumbnails={articleThumbnails}/>
            </div>
            <h2 className="subpage--article-carousel-header">Local</h2>
            <div className="subpage--article-carousel-container">
                <ArticleCarousel articleThumbnails={articleThumbnails}/>
            </div>
            <h2 className="subpage--article-carousel-header">Crime</h2>
            <div className="subpage--article-carousel-container">
                <ArticleCarousel articleThumbnails={articleThumbnails}/>
            </div>
            <h2 className="subpage--article-carousel-header">Government</h2>
            <div className="subpage--article-carousel-container">
                <ArticleCarousel articleThumbnails={articleThumbnails}/>
            </div>
            <h2 className="subpage--article-carousel-header">Education</h2>
            <div className="subpage--article-carousel-container">
                <ArticleCarousel articleThumbnails={articleThumbnails}/>
            </div>

        </main>
    )
}

export default NewsPage