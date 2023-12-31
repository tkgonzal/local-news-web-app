import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import useLoadingNewsPage from "../../hooks/useLoadingNewsPage"

import { Article } from "../../types/interfaces/Article"

import ArticleThumbnail from "../../components/ArticleThumbnails/ArticleThumbnail"
import ArticleCarousel from "../../components/ArticleCarousel"

import "./SportsPage.css"

const BASE_API_URL = import.meta.env.VITE_SERVER_URL


// Page component for the sports page of the app which displays all the sports subcategories
const SportsPage: React.FC = () => {
    const location = useLocation()
    const [sportsArticles,setArticles] = useState<Article[]>([])
    const [headerName, setHeaderName] = useState<string>("")
    const { loading, setLoading, LoadingElement } = useLoadingNewsPage()

    useEffect(() => {
        if(location.pathname === "/sports"){
            fetchArticles("Sports")
            setHeaderName("Sports")
        }else if(location.pathname === "/sports/soccer"){
            fetchArticles("Soccer")
            setHeaderName("Soccer")
        }else if(location.pathname === "/sports/basketball"){
            fetchArticles("Basketball")
            setHeaderName("Basketball")
        }else if(location.pathname === "/sports/tennis"){
            fetchArticles("Tennis")
            setHeaderName("Tennis")
        }else if(location.pathname === "/sports/football"){
            fetchArticles("Football")
            setHeaderName("Football")
        }else if(location.pathname === "/sports/golf"){
            fetchArticles("Golf")
            setHeaderName("Golf")
        }else if(location.pathname === "/sports/fishing"){
            fetchArticles("Fishing")
            setHeaderName("Fishing")
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

            <h1 className="subpage--header">{`${headerName.toUpperCase()}`}</h1>
            <div className="sports-nav">
                <ul className="sports-nav--categories">
                    <li className="sports-nav--link">
                        <Link to="/sports/soccer">SOCCER</Link>
                    </li>
                    <li className="sports-nav--link">
                        <Link to="/sports/basketball">BASKETBALL</Link>
                    </li>
                    <li className="sports-nav--link">
                        <Link to="/sports/tennis">TENNIS</Link>
                    </li>
                    <li className="sports-nav--link">
                        <Link to="/sports/football">FOOTBALL</Link>
                    </li>
                    <li className="sports-nav--link">
                        <Link to="/sports/golf">GOLF</Link>
                    </li>
                    <li className="sports-nav--link">
                        <Link to="/sports/fishing">FISHING</Link>
                    </li>
                </ul>
            </div>

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
                        
                    <h2 className="subpage--article-carousel-header">Featured</h2>
                    <div className="subpage--article-carousel-container">
                        {
                            <ArticleCarousel articleThumbnails={featuredArticleThumbnails}/>
                        }
                    </div>
                </>
            }

        </main>
    )
}

export default SportsPage