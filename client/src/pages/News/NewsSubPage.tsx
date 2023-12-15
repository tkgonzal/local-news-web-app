import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import useLoadingNewsPage from "../../hooks/useLoadingNewsPage"

import { Article } from "../../types/interfaces/Article"

import ArticleThumbnail from "../../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../../components/ArticleCarousel"

import "./NewsPage.css"


const BASE_API_URL = import.meta.env.VITE_SERVER_URL

// Page component for the news page of the app when displaying a single subcategory
const NewsSubPage: React.FC = () => {
    const location = useLocation()
    const [newsArticles,setArticles] = useState<Article[]>([])
    const [headerName, setHeaderName] = useState<string>("")
    const { loading, setLoading, LoadingElement } = useLoadingNewsPage()
    useEffect(() => {
        //Pulls the relevant articles for the subcategory page
        if(location.pathname === "/news/local"){
            fetchArticles("Local%20News")
            setHeaderName("Local News")
        }else if(location.pathname === "/news/crime"){
            fetchArticles("Crime")
            setHeaderName("Crime")
        }else if(location.pathname === "/news/government"){
            fetchArticles("Government")
            setHeaderName("Government")
        }else if(location.pathname === "/news/education"){
            fetchArticles("Education")
            setHeaderName("Education")
        }
    }, [location]);

    const fetchArticles = async (category: string) => {
        try {
            setLoading(true)
            const articleResponse = await axios.get(
                `${BASE_API_URL}/api/articles?tag=${category}`
            )

            setArticles(articleResponse.data)
            setLoading(false)
        } catch (error) {
            console.log("An error occurred while retrieving Articles")
            console.log(error)
        }
    }
    const mainArticleThumbnail: JSX.Element = newsArticles.length ?
        <ArticleThumbnail className="main-article" article={newsArticles[0]}/> : <></>

    const secondaryArticleThumbnails: JSX.Element[] = newsArticles.slice(1,5).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    )
    const featuredArticleThumbnails: JSX.Element[] = newsArticles.slice(5).map(
        (article: Article) => 
            <ArticleThumbnail key={article._id} article={article} />
    )

    return (
        <main className="subpage">

            <h1 className="subpage--header">{`${headerName.toUpperCase()}`}</h1>
            {
                loading ? 
                LoadingElement : 
                <>
                    <div className="subpage--articles">
                        <div className="subpage--main-article">
                            {mainArticleThumbnail}
                        </div>

                        <div className="subpage--secondary-articles">
                            {secondaryArticleThumbnails}
                        </div>


                    </div>
                        
                    <h2 className="subpage--article-carousel-header">FEATURED</h2>
                    <div className="subpage--article-carousel-container">
                        {
                            <ArticleCarousel 
                                articleThumbnails={featuredArticleThumbnails}
                            />
                        }
                    </div>
                </>
            }


        </main>
    )
}

export default NewsSubPage