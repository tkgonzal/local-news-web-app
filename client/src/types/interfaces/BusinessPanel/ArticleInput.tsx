// react-hook-form input interface for ArticleForm

interface ArticleInput {
    heading: string
    subHeading: string
    author: string
    allowComments: boolean
    allowAnonymousComments: boolean
    content: string
}

export type { ArticleInput }