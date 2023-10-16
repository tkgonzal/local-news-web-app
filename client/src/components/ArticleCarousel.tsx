import "./ArticleCarousel.css"

interface Props {
    // Should specifically be an array of ArticleThumbnail components
    articleThumbnails: JSX.Element[]
}

// A component meant to display a set of article thumbnail
const ArticleCarousel: React.FC<Props> = ({articleThumbnails}) => {
    return (
        <section className="articles-carousel">
            <button>back</button>

            <div className="carousel-content">
                {articleThumbnails}
            </div>

            <button>next</button>
        </section>
    )
}

export default ArticleCarousel