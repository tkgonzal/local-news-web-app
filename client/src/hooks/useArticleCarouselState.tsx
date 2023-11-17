import { useState } from "react"

// Constants
const ARTICLES_TO_DISPLAY: Number = 3

// Given a set of ArticleThumbnail elements, returns the logic to render said
// articles for an ArticleCarousel
const useArticleCarouselState = (articleThumbnails: JSX.Element[]) => {
    const [articles, setArticles] = useState<JSX.Element[]>(articleThumbnails)
    const [currentIndex, setCurrentIndex] = useState<Number>(0)


    return {
        articles, 
        currentIndex
    }
}

export default useArticleCarouselState