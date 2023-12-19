import React from 'react';
import { ArticleImage } from '../../types/interfaces/ArticleImage'
import { useParams } from 'react-router-dom';
import HeadlineBulletPoints from '../../components/BreakingNews/HeadlineBulletPoints';
import HeadlineColumn from '../../components/BreakingNews/HeadlineColumn';
import ArticleThumbnail from '../../components/ArticleThumbnails/ArticleThumbnail';
import formattedDate from '../../utils/formattedDate'

import defaultArticleImage from '../../assets/defaultArticleImage';
import ArticleCommentList from './ArticleCommentList';
import NewCommentField from './NewCommentField';

import './index.css'
import { useArticle } from '../../hooks/useArticle';
import { useUserContext } from '../../contexts/UserContext';

const RECOMMENDED_ARTICLES_COUNT: number = 8

const ArticlePage: React.FC = () => {
    const { articleUID } = useParams()
    const {articleObj, recommendedArticles, postComment} = useArticle(articleUID, RECOMMENDED_ARTICLES_COUNT)
    const {user} =  useUserContext()

    const defaultMainArticleImage: ArticleImage = {
        ...defaultArticleImage,
        caption: articleObj?.heading || "The MoNews logo"
    }

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

    let comment_disabled = false
    if (articleObj.allowComments === false) {
        comment_disabled = true
    }
    else if (articleObj.allowAnonymousComments === false && user === null) {
        comment_disabled = true
    }
    else if (articleObj.ipCanComment == false && user === null) {
        comment_disabled = true
    }

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
            {articleObj.allowComments==false?<></>:<>
                <NewCommentField postComment={postComment} disabled={comment_disabled}/>
                <ArticleCommentList comments={articleObj.comments} />
            </>}
        </div>
        <div className='more-news'>
            <h2 className="home--more-news">MORE NEWS: {articleObj?.tags[0].toUpperCase()} </h2>
            <HeadlineBulletPoints articleThumbnails={articleThumbnails.slice(0, RECOMMENDED_ARTICLES_COUNT)}/>
            <HeadlineColumn articleThumbnails={articleThumbnails.slice(articleThumbnails.length - RECOMMENDED_ARTICLES_COUNT, articleThumbnails.length)}/>
        </div>
    </main>
    )
}

export default ArticlePage