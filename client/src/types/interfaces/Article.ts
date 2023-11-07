import { Article as backendArticle } from "../../../../server/models/Article"

interface Article extends Omit<backendArticle,"_id"> {
    _id: string
}

export type { Article }