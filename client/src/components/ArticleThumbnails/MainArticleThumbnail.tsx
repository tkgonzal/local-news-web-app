import { Article } from "../../types/interfaces/Article"

import ArticleThumbnail from "./ArticleThumbnail"

interface Props {
    article: Article
}

// A component meant to only be used for the BreakingNews page component.
// Displays an article as the headline article for the app
const MainArticleThumbnail: React.FC<Props> = ({ article }) => {
    return <ArticleThumbnail className="main-article" article={article} />
}

export default MainArticleThumbnail