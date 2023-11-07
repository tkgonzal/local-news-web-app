import React, { useState, useEffect } from 'react';
import { Article } from '../types/interfaces/Article'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import HeadlineBulletPoints from '../components/BreakingNews/HeadlineBulletPoints';
import HeadlineColumn from '../components/BreakingNews/HeadlineColumn';
import ArticleThumbnail from '../components/ArticleThumbnails/ArticleThumbnail';
import titleCase from '../utils/titleCase';
import formattedDate from '../utils/formattedDate'

import './ArticlePage.css'

const ArticlePage: React.FC = () => {
    const [articleObj, setArticleObj] = useState<Article>()
    const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([])
    const { articleUID } = useParams()

    useEffect(()=>{
        (async () => {
            try {
                const article : AxiosResponse<Article> = await axios.get<Article>(`${import.meta.env.VITE_SERVER_URL}/api/article/${articleUID}`)
                setArticleObj(article.data)
            } catch (err) {
                console.log(err)
            }
        })()
    },[articleUID])

    useEffect(()=>{
        if (articleObj == undefined) {return}
        (async () => {
            try {
                const response : AxiosResponse<Article[]> = await axios.get<Article[]>(`${import.meta.env.VITE_SERVER_URL}/api/articles`,{
                    params: {
                        tag: articleObj?.tags[0]
                    }
                })
                
                const articles = response.data.filter((article)=>{
                    return article._id != articleObj._id
                })
                setRecommendedArticles(articles)
            } catch (err) {
                console.log(err)
            }
        })()
    },[articleObj])

    if (articleObj == undefined) {
        return (<>
            Loading...
        </>)
    }

    const mainImage = articleObj.images[0]
    const body = typeof articleObj.body == "string" ? <p>{articleObj.body}</p> : articleObj.body.map((text, index)=>(<p key={index}>{text}</p>))

    const articleThumbnails = [<ArticleThumbnail key={articleObj._id?.toString()} className="main-article" article={articleObj}/>].concat(
        recommendedArticles.map((article)=><ArticleThumbnail key={article._id?.toString()} article={article}/>)
    )

    

    return (
    <main className='page-container'>
        <div className='article'>
            <h1 className="article--header">{titleCase(articleObj.heading)}</h1>
            <h5 className="article--author">BY {articleObj.authors.map((author)=>author.toUpperCase()).join(",")}</h5>
            <h5 className="article--date">{formattedDate(articleObj)}</h5>
            <img src={mainImage.url} />
            <h5 className='image--caption'>{mainImage.caption}</h5>
            {body}
        </div>
        <div className='more-news'>
            <h2 className="home--more-news">MORE NEWS: {articleObj?.tags[0].toUpperCase()} </h2>
            <HeadlineBulletPoints articleThumbnails={articleThumbnails}/>
            <HeadlineColumn articleThumbnails={articleThumbnails}/>
        </div>
    </main>
    )
}

export default ArticlePage