// Stores the text to send out for each Article Subscription Tag
interface NewsletterTagText {
    "Breaking News": string;
    "Local News": string;
    "Crime": string;
    "Sports": string;
    "Government": string;
    "Education": string;
    [key: string]: any;
}

export type { NewsletterTagText }