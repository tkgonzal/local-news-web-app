import { Article as backendArticle } from "../../../../server/models/Article"

interface Article extends Omit<backendArticle,"_id"|"businessId"> {
    _id: string,
    businessId: string | undefined
}

export type { Article }