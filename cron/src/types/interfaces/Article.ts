import { ArticleTag } from "../types/ArticleTag.js";

interface ArticleComment {
    message: string;
    userName: string;
    _id: string;
    publishedDate: string;
};

interface Article {
    _id?: string;
    tags: (ArticleTag)[];
    source: string;
    heading: string;
    authors: string[];
    // String must be in Date ISO format
    publishedDate: string;
    comments: ArticleComment[];
};

export type { Article };