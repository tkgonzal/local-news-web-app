import { Article } from "../types/interfaces/Article"

import ArticleThumbnail from "../components/ArticleThumbnails/ArticleThumbnail"

interface Props {
    articles: Article[]
}

const BreakingNews : React.FC<Props> = ({ articles }) => {
    const articleThumbnails: JSX.Element[] = articles.map(
        (article: Article) => <ArticleThumbnail article={article}/>
    );

    return (
        <main>
            {articleThumbnails}
        </main>
    )
}

export default BreakingNews