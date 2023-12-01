import { Article } from "../types/interfaces/Article"
import testImage from "./assets/article-test-image.jpg"

const ArticleTestData : Article[] = [
    {
        _id: "1",
        heading: "test article 1",
        images: [{
            url: testImage,
            caption: "test caption"
        }],
        subHeading: "this is the 1st test article",
        source: "monews",
        authors: ["author 1"],
        publishedDate: "October 1, 2023",
        businessId: "1",
        body: [
            "this is the body of article 1"
        ],
        engagements: 0,
        tags: ["Breaking News", "Local News"]
    },
    {
        _id: "2",
        heading: "test article 2",
        images: [{
            url: testImage,
            caption: "test caption"
        }],
        subHeading: "this is the 2nd test article",
        source: "monews",
        authors: ["author 2"],
        publishedDate: "October 1, 2023",
        businessId: "1",
        body: [
            "this is the body of article 2"
        ],
        engagements: 0,
        tags: ["Government", "Local News"]
    },
    {
        _id: "3",
        heading: "test article 3",
        images: [{
            url: testImage,
            caption: "test caption"
        }],
        subHeading: "this is the 3rd test article",
        source: "monews",
        authors: ["author 3"],
        publishedDate: "October 1, 2023",
        businessId: "1",
        body: [
            "this is the body of article 3"
        ],
        engagements: 0,
        tags: ["Sports"]
    },
    {
        _id: "4",
        heading: "test article 4",
        images: [{
            url: testImage,
            caption: "test caption"
        }],
        subHeading: "this is the 4th test article",
        source: "monews",
        authors: ["author 4"],
        publishedDate: "October 1, 2023",
        businessId: "1",
        body: [
            "this is the body of article 4"
        ],
        engagements: 0,
        tags: ["Crime"]
    },
]

export default ArticleTestData

