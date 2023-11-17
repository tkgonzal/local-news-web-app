import { Article } from "../types/interfaces/Article"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../components/ArticleCarousel"

import "./NewsPage.css"
import { useEffect, useState } from "react"

const BASE_API_URL = import.meta.env.VITE_SERVER_URL

interface Props {
    articles: Article[]
}

// Page component for the news page of the app which displays all the news subcategories
const NewsPage: React.FC<Props> = ({ articles }) => {

    const [newsArticles,setArticles] = useState<Article[]>(articles)
    useEffect(() => {
        (async function(){
            const articleData = await fetchArticles()
            if (articleData) {
              setArticles(articleData)
            }
        }())
      }, []);
    const mainArticleThumbnail: JSX.Element = 
        <ArticleThumbnail className="main-article" article={newsArticles[0]}/>

    const articleThumbnails: JSX.Element[] = newsArticles.slice(1).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    )
    async function fetchArticles() {
        try {
            const res = await fetch(
                `${BASE_API_URL}/api/articles/?tag=Local%20News`,
                {
                    headers: {
                        'Content-Type': 'application/json'},
                    method : "GET",
                    mode : "cors",   
                }
            )
            const resData = await res.json()
            console.log(resData)
            return resData
    
        } catch (error) {
            console.log(error)
        }
        
    }

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