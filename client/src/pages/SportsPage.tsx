import { Article } from "../types/interfaces/Article"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../components/ArticleCarousel"

import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import "./SportsPage.css"

const BASE_API_URL = import.meta.env.VITE_SERVER_URL


// Page component for the sports page of the app which displays all the sports subcategories
const SportsPage: React.FC = () => {
    const location = useLocation()
    const [sportsArticles,setArticles] = useState<Article[]>([])
    useEffect(() => {
        if(location.pathname === "/sports"){
            fetchArticles()
        }
    }, [location]);

    const fetchArticles = async () => {
        try {
            const articleResponse = await axios.get(
                `${BASE_API_URL}/api/articles?tag=Sports`
            )
            setArticles(articleResponse.data)
        } catch (error) {
            console.log("An error occurred while retrieving Articles")
            console.log(error)
        }
    }

    const mainArticleThumbnail: JSX.Element = sportsArticles.length ?
        <ArticleThumbnail className="main-article" article={sportsArticles[0]}/> : <></>

    const secondaryArticleThumbnails: JSX.Element[] = sportsArticles.slice(1,5).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    )
    const featuredArticleThumbnails: JSX.Element[] = sportsArticles.slice(5).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    )

    return (
        <main className="subpage">

            <h1 className="subpage--header">Sports</h1>
            <div className="subpage--articles">
                <div className="subpage--main-article">
                    {mainArticleThumbnail}
                </div>

                <div className="subpage--secondary-articles">
                    {secondaryArticleThumbnails}
                </div>


            </div>
                
            <h2 className="subpage--article-carousel-header">Featured</h2>
            <div className="subpage--article-carousel-container">
                {
                    featuredArticleThumbnails.length &&
                    <ArticleCarousel articleThumbnails={featuredArticleThumbnails}/>
                }
            </div>

        </main>
    )
}

export default SportsPage