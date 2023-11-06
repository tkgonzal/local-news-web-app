import React, { useState, useEffect } from 'react';
import {Article} from '../../../server/models/Article'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import './ArticlePage.css'

const ArticlePage: React.FC = () => {
    const [articleObj, setArticleObj] = useState<Article>()
    const { articleUID } = useParams()
    
    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions:Intl.DateTimeFormatOptions = {hour12: true, hour: 'numeric', minute: '2-digit' };
        
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
      
        return `${formattedDate} ${formattedTime}`;
      }
    function titleCase(str: string) {
        let title = str.toLowerCase().split(' ');
        title = title.map((word)=>word.charAt(0).toLocaleUpperCase() + word.slice(1))
        return title.join(' ');
      }
    
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

    if (articleObj == undefined) {
        return (<>
            Loading...
        </>)
    }

    const mainImage = articleObj.images[0]
    const body = typeof articleObj.body == "string" ? <p>{articleObj.body}</p> : articleObj.body.map((text, index)=>(<p key={index}>{text}</p>))

    return (
    <main className='page-container'>
        <div className='article'>
            <h1 className="article--header">{titleCase(articleObj.heading)}</h1>
            <h5 className="article--author">BY {articleObj.authors.map((author)=>author.toUpperCase()).join(",")}</h5>
            <h5 className="article--date">{formatDate(articleObj.publishedDate)}</h5>
            <img src={mainImage.url} />
            <h5 className='image--caption'>{mainImage.caption}</h5>
            {body}
        </div>
        <div className='more-news'>
            <h4 className="article--date">More News</h4>
        </div>
    </main>
    )
}

export default ArticlePage