import "./HeadlineBulletPoints.css"

interface Props {
    articleThumbnails: JSX.Element[]
}

// A component to display other important breaking articles
// that might not be as important as the other headlines
const HeadlineBulletPoints: React.FC<Props> = ({articleThumbnails}) => {
    const articleBullets: JSX.Element[] = articleThumbnails.map(
        article=> <li key={article.key}>{article}</li>
    )

    return (
        <div className="headline-bullet-points">
            <ul>{articleBullets}</ul>
        </div>
    )
}

export default HeadlineBulletPoints