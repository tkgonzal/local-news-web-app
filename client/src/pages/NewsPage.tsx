import { Article } from "../types/interfaces/Article"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../components/ArticleCarousel"

import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import "./NewsPage.css"

const BASE_API_URL = import.meta.env.VITE_SERVER_URL


// Page component for the news page of the app which displays all the news subcategories
const NewsPage: React.FC = () => {
    const location = useLocation()
    const [newsArticles,setArticles] = useState<Article[][]>([])
    useEffect(() => {
        if(location.pathname === "/news"){
            fetchArticles()
        }
    }, [location]);

    const fetchArticles = async () => {
        try {
            const breakingResponse = await axios.get(
                `${BASE_API_URL}/api/articles?tag=Breaking%20News`
            )
            const localResponse = await axios.get(
                `${BASE_API_URL}/api/articles?tag=Local%20News`
            )
            const crimeResponse = await axios.get(
                `${BASE_API_URL}/api/articles?tag=Crime`
            )
            const governmentResponse = await axios.get(
                `${BASE_API_URL}/api/articles?tag=Government`
            )
            const educationResponse = await axios.get(
                `${BASE_API_URL}/api/articles?tag=Education`
            )
            setArticles([breakingResponse.data,localResponse.data,crimeResponse.data,governmentResponse.data,educationResponse.data])
        } catch (error) {
            console.log("An error occurred while retrieving Articles")
            console.log(error)
        }
    }

    //Breaking News
    const breakingArticles: Article[] = newsArticles.length? newsArticles[0] : []
    const mainArticleThumbnail: JSX.Element = 
        breakingArticles.length ? <ArticleThumbnail className="main-article" article={newsArticles[0][0]}/> : <></>

    const secondaryArticleThumbnails: JSX.Element[] = breakingArticles.slice(1,5).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    )
    const featuredArticleThumbnails: JSX.Element[] = breakingArticles.slice(5).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    )

    //Subcategory carousels
    const localArticles: JSX.Element[] = newsArticles.length? newsArticles[1].map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    ) : []
    const crimeArticles: JSX.Element[] = newsArticles.length? newsArticles[2].map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    ) : []
    const governmentArticles: JSX.Element[] = newsArticles.length? newsArticles[3].map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    ) : []
    const educationArticles: JSX.Element[] = newsArticles.length? newsArticles[4].map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    ) : []
    console.log(newsArticles)

    return (
        <main className="subpage">

            <h1 className="subpage--header">Recent News</h1>
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
            <h2 className="subpage--article-carousel-header">Local</h2>
            <div className="subpage--article-carousel-container">
                {
                    featuredArticleThumbnails.length &&
                    <ArticleCarousel articleThumbnails={localArticles}/>
                }  
            </div>
            <h2 className="subpage--article-carousel-header">Crime</h2>
            <div className="subpage--article-carousel-container">
                {
                    featuredArticleThumbnails.length &&
                    <ArticleCarousel articleThumbnails={crimeArticles}/>
                }
            </div>
            <h2 className="subpage--article-carousel-header">Government</h2>
            <div className="subpage--article-carousel-container">
                {
                    featuredArticleThumbnails.length &&
                    <ArticleCarousel articleThumbnails={governmentArticles}/>
                }
            </div>
            <h2 className="subpage--article-carousel-header">Education</h2>
            <div className="subpage--article-carousel-container">
                {
                    featuredArticleThumbnails.length &&
                    <ArticleCarousel articleThumbnails={educationArticles}/>
                }
            </div>

        </main>
    )
}

export default NewsPage