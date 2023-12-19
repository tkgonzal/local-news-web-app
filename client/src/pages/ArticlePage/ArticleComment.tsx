import { ArticleComment } from "../../types/interfaces/ArticleComment";
import './ArticleComment.css'
import moment from "moment";

export default function Comment(props:{comment: ArticleComment}) {
    return (<div className="comment">
        <span className="username">{props.comment.userName}</span>
        <span className="upload-date"> {moment(props.comment.publishedDate).fromNow()}</span>
        {props.comment.message.split(`\n`).map((line, index)=><span key={props.comment._id + index} className="message">{line}</span>)}
    </div>)
}