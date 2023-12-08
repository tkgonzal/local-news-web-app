import "./HeadlineColumn.css"

interface Props {
    // Should be an array of ArticleThumbnail components
    articleThumbnails: JSX.Element[]
}

// A side column to display the most recently used headlines for the 
// breaking news
const HeadlineColumn: React.FC<Props> = ({articleThumbnails}) => {
    return (
        <div className="headline-column">{articleThumbnails}</div>
    )
}

export default HeadlineColumn