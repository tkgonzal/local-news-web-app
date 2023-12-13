import React, { useState, useEffect } from 'react';
import { Article } from '../types/interfaces/Article'
import { ArticleImage } from '../types/interfaces/ArticleImage'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import HeadlineBulletPoints from '../components/BreakingNews/HeadlineBulletPoints';
import HeadlineColumn from '../components/BreakingNews/HeadlineColumn';
import ArticleThumbnail from '../components/ArticleThumbnails/ArticleThumbnail';
import formattedDate from '../utils/formattedDate'

import defaultArticleImage from '../assets/defaultArticleImage';

import './ArticlePage.css'

const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL
const ENGAGEMENTS_AUTH_KEY: string = import.meta.env.VITE_ENGAGEMENTS_AUTH
const RECOMMENDED_ARTICLES_COUNT: number = 8

const ArticlePage: React.FC = () => {
    const [articleObj, setArticleObj] = useState<Article>()
    const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([])
    const { articleUID } = useParams()

    const defaultMainArticleImage: ArticleImage = {
        ...defaultArticleImage,
        caption: articleObj?.heading || "The MoNews logo"
    }

    useEffect(()=>{
        (async () => {
            try {
                axios.put(
                    `${BASE_SERVER_URL}/api/article/engagements/${articleUID}`,
                    { },
                    { 
                        headers: { 
                            Authorization: `Bearer ${ENGAGEMENTS_AUTH_KEY}` 
                        } 
                    }
                )
                const article : AxiosResponse<Article> = await axios.get<Article>(`${BASE_SERVER_URL}/api/article/${articleUID}`)
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
                const response : AxiosResponse<Article[]> = await axios.get<Article[]>(`${BASE_SERVER_URL}/api/articles`,{
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

    const mainImage = articleObj.images.length ? articleObj.images[0] : defaultMainArticleImage
    const body = typeof articleObj.body == "string" ? 
        <div 
            className="article--p" 
            dangerouslySetInnerHTML={{__html: articleObj.body}}>
        </div> : 
        articleObj.body.map((text, index)=>(<p className="article--p" key={index}>{text}</p>))

    const articleThumbnails = [<ArticleThumbnail key={articleObj._id?.toString() + "main-article"} className="main-article" article={articleObj}/>].concat(
        recommendedArticles.map((article)=><ArticleThumbnail key={article._id?.toString()} article={article}/>)
    )

    

    return (
    <main className='article-container'>
        <div className='article'>
            <h1 className="article--header">{articleObj.heading}</h1>
            {
                articleObj.subHeading && 
                <h2 className="article--subheader">{articleObj.subHeading}</h2>
            }
            <h5 className="article--author">BY {articleObj.authors.map((author)=>author.toUpperCase()).join(",")}</h5>
            <h5 className="article--date">{formattedDate(articleObj)}</h5>
            <img className="article--img" src={mainImage.url} />
            <h5 className='image--caption'>{mainImage.caption}</h5>
            {body}
        </div>
        <div className='more-news'>
            <h2 className="home--more-news">MORE NEWS: {articleObj?.tags[0].toUpperCase()} </h2>
            <HeadlineBulletPoints articleThumbnails={articleThumbnails.slice(0, RECOMMENDED_ARTICLES_COUNT)}/>
            <HeadlineColumn articleThumbnails={articleThumbnails.slice(0, RECOMMENDED_ARTICLES_COUNT)}/>
        </div>
    </main>
    )
}

export default ArticlePage