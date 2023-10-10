import { useNavigate, NavigateFunction } from "react-router-dom"

import { Article } from "../../types/interfaces/Article"

import "./ArticleThumbnail.css"

interface Props {
    className?: string
    article: Article
}

// Component to display on News Pages, which shows thumbnails of articles to 
// display in each's carousel. Mean to be used for three article carousels
const ArticleThumbnail: React.FC<Props> = ({ className, article }) => {
    const articleNavigate: NavigateFunction = useNavigate();

    const navigateToArticle = (): void => {
        articleNavigate(`/article/${article.id}`);
    }

    return (
        <div 
            onClick={navigateToArticle}
            className={`article-thumbnail ${className || ""}`}
        >
            <img
                className="article-thumbnail--img"
                src={article.imgSrc}
                alt={article.heading} 
            />
            <h2 className="article-thumbnail--heading">{article.heading}</h2>
            <h3 className="article-thumbnail--subheading">{article.subHeading}</h3>
        </div>
    )
}

export default ArticleThumbnail