import { Article } from "../types/interfaces/Article"

import testImage from "./assets/article-test-image.jpg"

const ArticleTestData : Article[] = [
    {
        id: "1",
        imgSrc: testImage,
        heading: "test article 1",
        subHeading: "this is the 1st test article",
        author: "author 1",
        date: "October 1, 2023",
        body: [
            "this is the body of article 1"
        ],
        impressions: 0,
        tags: ["Breaking News", "Local News"]
    },
    {
        id: "2",
        imgSrc: testImage,
        heading: "test article 2",
        subHeading: "this is the 2nd test article",
        author: "author 2",
        date: "October 2, 2023",
        body: [
            "asfdasdfasedf"
        ],
        impressions: 1,
        tags: ["Government", "Local News"]
    },
    {
        id: "3",
        imgSrc: testImage,
        heading: "test article 3",
        subHeading: "this is the 3rd test article",
        author: "author 3",
        date: "October 3, 2023",
        body: [
            "12341234123421"
        ],
        impressions: 3,
        tags: ["Sports"]
    },
    {
        id: "4",
        imgSrc: testImage,
        heading: "test article 4",
        subHeading: "this is the 4th test article",
        author: "author 4",
        date: "October 4, 2023",
        body: [
            "October 4, 2023"
        ],
        impressions: 4,
        tags: ["Crime"]
    }
]

export default ArticleTestData

