import { Article } from "../types/interfaces/Article"
import { ArticleImage } from "../types/interfaces/ArticleImage"

import testImageUrl from "./assets/article-test-image.jpg"

const testImage: ArticleImage =  {
    url: testImageUrl,
    caption: "The album cover of Jeff Rosenstock's Worry, used as a test image"
}

const ArticleTestData : Article[] = [
    {
        _id: "1",
        source: "Test Data",
        tags: ["Breaking News", "Local News"],
        heading: "test article 1",
        subHeading: "this is the 1st test article",
        authors: ["author 1"],
        publishedDate: "2023-10-26T21:31:38.461Z",
        body: ["this is the body of article 1"],
        images: [testImage],
        engagements: 0,
    },
    {
        _id: "2",
        source: "Test Data",
        tags: ["Government", "Local News"],
        heading: "test article 2",
        subHeading: "this is the 2nd test article",
        authors: ["author 2"],
        publishedDate: "2023-10-26T21:31:38.461Z",
        body: ["asdfasdfasdffff"],
        images: [testImage],
        engagements: 0,
    },
    {
        _id: "3",
        source: "Test Data",
        tags: ["Sports"],
        heading: "test article 3",
        subHeading: "this is the 3rd test article",
        authors: ["author 3"],
        publishedDate: "2023-10-26T21:31:38.461Z",
        body: ["12331423123412"],
        images: [testImage],
        engagements: 0,
    },
    {
        _id: "4",
        source: "Test Data",
        tags: ["Crime"],
        heading: "test article 4",
        subHeading: "this is the 4th test article",
        authors: ["author 4"],
        publishedDate: "2023-10-26T21:31:38.461Z",
        body: ["October 4, 2023"],
        images: [testImage],
        engagements: 0,
    }
]

export default ArticleTestData

