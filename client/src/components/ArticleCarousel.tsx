import useArticleCarouselState from "../hooks/useArticleCarouselState"

import RightArrow from "/assets/chevron-right-font-awesome.svg"
import LeftArrow from "/assets/chevron-left-font-awesome.svg"

import "./ArticleCarousel.css"

interface Props {
    // Should specifically be an array of ArticleThumbnail components
    articleThumbnails: JSX.Element[]
}

// A component meant to display a set of article thumbnail
const ArticleCarousel: React.FC<Props> = ({articleThumbnails}) => {
    const { articles } = useArticleCarouselState(articleThumbnails)

    return (
        <section className="articles-carousel">
            <button>
                <img src={LeftArrow} alt="Chevron Left from Font Awesome" />
            </button>

            <div className="carousel-content">
                {articles}
            </div>

            <button>
                <img src={RightArrow} alt="Chevron Right from Font Awesome" />
            </button>
        </section>
    )
}

export default ArticleCarousel