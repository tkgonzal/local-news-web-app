import { useState, useRef, useEffect } from "react"

// Constants
const ARTICLES_TO_DISPLAY_COUNT: number = 3

// Given a set of ArticleThumbnail elements, returns the logic to render said
// articles for an ArticleCarousel
const useArticleCarouselState = (articleThumbnails: JSX.Element[]) => {
    const [articles] = useState<JSX.Element[]>(articleThumbnails)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    // Ref hooks for the forward and back button
    const backRef = useRef<HTMLButtonElement>(null)
    const frontRef = useRef<HTMLButtonElement>(null)

    // Side Effects
    // Effect to set the ArticleCarousel Nav buttons as disabled when 
    // the ArticlesDisplay is athe front or end of the articles
    useEffect(() => {
        if (currentIndex <= 0) {
            setDisabledForRef(backRef, true)
        } else {
            backRef.current?.disabled && setDisabledForRef(backRef, false)
        }

        if (currentIndex + ARTICLES_TO_DISPLAY_COUNT >= articles.length) {
            setDisabledForRef(frontRef, true)
        } else {
            frontRef.current?.disabled && setDisabledForRef(frontRef, false)
        }
    }, [currentIndex])

    // Event Handlers
    /**
     * Increments the currentIndex, changing which chunk of articles to display
     */
    const stepForward = () => {
        if (currentIndex + ARTICLES_TO_DISPLAY_COUNT < articles.length) {
            setCurrentIndex(prevIndex => prevIndex + ARTICLES_TO_DISPLAY_COUNT)
        }
    }

    /**
     * Decrements the currentIndex, changing which chunk of articles to display
     */
    const stepBack = () => {
        if (currentIndex - ARTICLES_TO_DISPLAY_COUNT > -1) {
            setCurrentIndex(prevIndex => prevIndex - ARTICLES_TO_DISPLAY_COUNT)
        }
    }

    // Utility Functions
    /**
     * @param ref {React.RefObject<HTMLButtonElement>} The ref for a button
     * @param setting {boolean} The value of the button's disabled property
     */
    const setDisabledForRef = (
        ref: React.RefObject<HTMLButtonElement>, 
        setting: boolean
    ) => {
        if (ref.current) {
            ref.current.disabled = setting
        }
    }

    // The articles to display on the carousel
    const articlesDisplay: JSX.Element[] = articles.slice(
        currentIndex, 
        currentIndex + ARTICLES_TO_DISPLAY_COUNT
    )


    return { articlesDisplay, backRef, frontRef, stepForward, stepBack }
}

export default useArticleCarouselState