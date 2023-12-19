import { ObjectId } from "mongodb"

interface ArticleComment {
    _id: ObjectId,
    userName: string | "anonymous",
    ip?: string,
    message: string,
    publishedData: string
}

interface NewComment {
    userName: string | "anonymous",
    ip: string,
    message: string,
}

function isNewComment(comment: any): comment is NewComment {
    if (typeof comment.userName !== "string") return false;
    if (typeof comment.ip !== "string") return false;
    if (typeof comment.message !== "string") return false;
    return true
}


export { isNewComment }
export type { ArticleComment, NewComment }