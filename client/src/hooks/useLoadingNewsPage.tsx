import { useState } from "react"

// For determining whether or not to load certain pieces of content on a 
// news page
const useLoadingNewsPage = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const LoadingElement = <h2 className="loading-text">Loading...</h2>

    return {
        loading,
        setLoading,
        LoadingElement
    }
}

export default useLoadingNewsPage