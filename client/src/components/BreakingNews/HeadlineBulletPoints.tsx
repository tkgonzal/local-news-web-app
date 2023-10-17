import "./HeadlineBulletPoints.css"

interface Props {
    articleThumbnails: JSX.Element[]
}

// A component to display other important breaking articles
// that might not be as important as the other headlines
const HeadlineBulletPoints: React.FC<Props> = ({articleThumbnails}) => {
    return (
        <div className="headline-bullet-points">{articleThumbnails}</div>
    )
}

export default HeadlineBulletPoints