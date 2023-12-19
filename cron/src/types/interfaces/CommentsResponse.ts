import { Article } from "./Article.js";

interface CommentsResponse {
    message: string;
    articleComments: Article[];
}

export type { CommentsResponse };