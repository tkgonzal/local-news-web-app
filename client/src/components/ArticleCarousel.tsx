import "./ArticleCarousel.css"

interface Props {
    articleThumbnails: JSX.Element[]
}

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