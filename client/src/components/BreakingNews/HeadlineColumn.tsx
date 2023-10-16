import "./HeadlineColumn.css"

interface Props {
    // Should be an array of ArticleThumbnail components
    articleThumbnails: JSX.Element[]
}

const HeadlineColumn: React.FC<Props> = ({articleThumbnails}) => {
    return (
        <div className="headline-column">
            {articleThumbnails}
        </div>
    )
}

export default HeadlineColumn