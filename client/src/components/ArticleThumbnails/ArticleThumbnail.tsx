import { Article } from "../../types/interfaces/Article"

interface Props {
    article: Article
}

const ArticleThumbnail: React.FC<Props> = ({ article }) => {
    return (
        <div className="article-thumbnail">
            <img
                src={article.imgSrc}
                alt={article.heading} 
            />
            <h2>{article.heading}</h2>
            <h3>{article.subHeading}</h3>
        </div>
    )
}

export default ArticleThumbnail