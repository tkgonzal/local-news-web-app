import { useNavigate, NavigateFunction } from "react-router-dom"

import { Article } from "../../types/interfaces/Article"
import formattedDate from "../../utils/formattedDate"

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
        articleNavigate(`/article/${article._id}`);
    }

    return (
        <div 
            onClick={navigateToArticle}
            className={`article-thumbnail ${className || ""}`}
        >
            <img
                className="article-thumbnail--img"
                src={article.images[0].url}
                alt={article.heading} 
            />
            <div className="article-thumbnail--metadata">
                <div className="article-thumbnail--headings-div">
                    <h2 className="article-thumbnail--heading">
                        {article.heading}
                    </h2>
                    <h3 className="article-thumbnail--subheading">
                        {article.subHeading}
                    </h3>
                </div>
                <p className="article-thumbnail--author">{article.authors}</p>
                <p className="article-thumbnail--date">{formattedDate(article)}</p>
                <p className="article-thumbnail--body">
                    {article.body.length && article.body[0]}
                </p>
            </div>
        </div>
    )
}

export default ArticleThumbnail