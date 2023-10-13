import { Article } from "../types/interfaces/Article"

import testImage from "./assets/article-test-image.jpg"

const ArticleTestData : Article[] = [
    {
        id: "1",
        imgSrc: testImage,
        heading: "test article 1",
        subHeading: "this is the 1st test article",
        impressions: 0,
        tags: ["Breaking News", "Local News"]
    },
    {
        id: "2",
        imgSrc: testImage,
        heading: "test article 2",
        subHeading: "this is the 2nd test article",
        impressions: 1,
        tags: ["Government", "Local News"]
    },
    {
        id: "3",
        imgSrc: testImage,
        heading: "test article 3",
        subHeading: "this is the 3rd test article",
        impressions: 3,
        tags: ["High School Sports"]
    },
    {
        id: "4",
        imgSrc: testImage,
        heading: "test article 4",
        subHeading: "this is the 4th test article",
        impressions: 4,
        tags: ["Crime"]
    }
]

export default ArticleTestData

