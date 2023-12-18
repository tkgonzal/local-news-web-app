import { ArticleComment } from "../types/interfaces/ArticleComment";

function cleanComments(comments: ArticleComment[]): ArticleComment[] {
    return comments.map((comment)=>({...comment, ip:undefined}))
}

export { cleanComments }