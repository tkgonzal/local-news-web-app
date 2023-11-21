import { useEffect } from "react"
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
    const { 
        articlesDisplay,
        backRef,
        frontRef,
        stepForward,
        stepBack,
        updateArticles
    } = useArticleCarouselState(articleThumbnails)

    useEffect(() => {
        updateArticles(articleThumbnails)
    }, [articleThumbnails])

    return (
        <section className="articles-carousel">
            <button ref={backRef} onClick={stepBack}>
                <img src={LeftArrow} alt="Back Button" />
            </button>

            <div className="carousel-content">
                {articlesDisplay}
            </div>

            <button ref={frontRef} onClick={stepForward}>
                <img src={RightArrow} alt="Forward Button" />
            </button>
        </section>
    )
}

export default ArticleCarousel