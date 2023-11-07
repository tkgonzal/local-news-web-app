import { Article as backendArticle } from "../../../../server/models/Article"
interface Article extends Omit<backendArticle,"_id"> {
    _id: string
}
function formattedDate(article: Article) {
    const dateString = article.publishedDate
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions:Intl.DateTimeFormatOptions = {hour12: true, hour: 'numeric', minute: '2-digit' };
    
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  
    return `${formattedDate} ${formattedTime}`;
  }



export type { Article }
export { formattedDate }