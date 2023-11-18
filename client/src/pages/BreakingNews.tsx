import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { Article } from "../types/interfaces/Article"

import axios from "axios"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../components/ArticleCarousel"
import HeadlineColumn from "../components/BreakingNews/HeadlineColumn"
import HeadlineBulletPoints from "../components/BreakingNews/HeadlineBulletPoints"

import "./BreakingNews.css"

// Constants
const BASE_SERVER_URL = import.meta.env.VITE_SERVER_URL
// The amount of articles to display in the HeadlineColumn and HeadlineBulletPoints
const ARTICLE_DISPLAY_COUNT = 3

// Page component for the home page of the app which displays breaking news
const BreakingNews: React.FC = () => {
    const [headlineArticles, setHeadlineArticles] = useState<Article[]>([])
    const [breakingArticles, setBreakingArticles] = useState<Article[]>([])
    const location = useLocation()

    // Side Effects
    // Pulls Headline and Breaking articles to render
    useEffect(() => {
        updateHeadlineArticles()
        updateBreakingArticles()
    }, [location])

    // Utility Functions
    // Pulls from the DB all articles with the Headline tag
    const updateHeadlineArticles = async () => {
        try {
            const headlineResponse = await axios.get(
                `${BASE_SERVER_URL}/api/articles?tag=Headline`
            )

            setHeadlineArticles(headlineResponse.data)
        } catch (error: any) {
            console.log("An error occurred while retrieving Headlines")
            console.log(error)
        }
    }

    // Pulls from the DB all articles that are considered BreakingNews
    const updateBreakingArticles = async () => {
        try {
            const breakingResponse = await axios.get(
                `${BASE_SERVER_URL}/api/articles?tag=Breaking%20News`
            )

            setBreakingArticles(breakingResponse.data)
        } catch (error: any) {
            console.log("An error occurred while retrieving Breaking News")
            console.log(error)
        }
    }

    const mainArticleThumbnail: JSX.Element = headlineArticles.length ? 
        <ArticleThumbnail 
            className="main-article" 
            article={headlineArticles[0]}
        /> : <></>

    const headlineThumbnails: JSX.Element[] = headlineArticles.slice(1).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id?.toString()} article={article} />
    )

    const breakingThumbnails: JSX.Element[] = breakingArticles.length ? 
        breakingArticles.map((article: Article) => 
            <ArticleThumbnail 
                key={article._id?.toString()} 
                article={article} 
            />) 
        : []

    return (
        <main className="home">
            <div className="home--main-column">
                <div className="home--breaking-container">
                    <h1>BREAKING NEWS</h1>
                </div>
                {mainArticleThumbnail}

                <h2 className="home--article-carousel-header">TOP STORIES</h2>
                <div className="home--article-carousel-container">
                    {
                        breakingThumbnails.length && 
                        <ArticleCarousel articleThumbnails={breakingThumbnails}/>
                    }
                </div>
            </div>

            <div className="home--secondary-column">
                <h2 className="home--latest-header">LATEST HEADLINES</h2>
                <HeadlineColumn 
                    articleThumbnails={
                        headlineThumbnails.slice(0, ARTICLE_DISPLAY_COUNT)
                    }
                />
                <h2 className="home--more-news">MORE NEWS</h2>
                <HeadlineBulletPoints 
                    articleThumbnails={headlineThumbnails.slice(
                        headlineThumbnails.length - ARTICLE_DISPLAY_COUNT, 
                        headlineThumbnails.length
                    )}
                />
            </div>
        </main>
    )
}

export default BreakingNews